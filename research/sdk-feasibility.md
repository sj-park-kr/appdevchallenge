# SDK 실현성 조사 (2026-10-23)

출처: Pleos Connect 개발자 가이드 https://document.pleos.ai/docs/pleos-only/ (SDK·에뮬레이터 릴리스 2026-10-19 기준)

## 1. 가장 중요한 제약

### SDK 사용 가능 상태 — ✅ 콘솔에서 확인 완료 (2026-10-23)
| 상태 | SDK |
|---|---|
| ✅ 사용 가능 | **Vehicle State**(조회, API 98개), **NaviHelper**(16개) |
| ⏳ 준비 중 (신청 불가) | **FusedLocation, TextToSpeech, SpeechToText, Vehicle Control**(제어) |

- 전체 API 목록: [pleos-sdk-api.md](pleos-sdk-api.md)
- 👉 **확정: 앱 핵심 기능은 Vehicle State + NaviHelper만으로 만든다.** 음성(STT/TTS)과 제어는 "SDK가 열리면 추가"하는 로드맵으로만 기획서에 적음.
- 위치는 FusedLocation 대신 **NaviHelper `getCurrentLocationInfo`**로 얻을 수 있음.
- ⚠️ Vehicle State에 **기어·속도 API가 없음** → AAOS 표준 `CarPropertyManager`(`GEAR_SELECTION`, `PARKING_BRAKE_ON`, `PERF_VEHICLE_SPEED`)로 읽어야 함. 에뮬레이터에서 실제로 읽히는지 첫 개발 스파이크에서 확인.
  - ✅ Pleos 25 개발자 세션 확인: "Connect SDK는 AAOS와 같은 기능은 제공하지 않으니 AAOS SDK를 쓰라" (https://youtu.be/RWFIEbB3lYA?t=1170)

### 주행 규제 (driving-restriction-policy)
- Distraction Optimization(DO)을 선언하지 않은 앱은 **주행 중 사용 불가, 주차 중에만 사용 가능**.
- 한국은 "그외 지역" 표에 해당하는 것으로 보임: 주행 중 키보드·다이얼패드·검색·미디어 설정은 허용, **차량 설정(도어·시트)·동영상·QR 로그인·대용량 텍스트는 제한**.
- 가이드 문구: "게임, 인터넷 서핑, 피트니스 등 운전자의 주의를 분산시킬 수 있는 활동을 유도하지 않습니다."
- 주행 중 기능이 제한적으로 허용되는 카테고리: Music/Audio, Maps/Navigation, **Mobility Services(주행과 밀접한 차량 관리, 위치 기반 즉시 정보, 충전소·주유소·주차장)**.

### 앱 카테고리
Maps/Navigation, Mobility Services, Lifestyle, Entertainment, **Business**, Music/Audio, **Kids**, Social/Communication

### 화면 모델
- 왼쪽 Driving view는 고정이고, 앱 영역은 최대 2개 window(portrait 1칸 / landscape 2칸). **두 형태 모두 설계 필요**.
- 앱이 백그라운드로 자주 전환되므로 상태 복원 필수.

## 2. Gleo AI 연동 (Gleo Interface) — 현대차가 밀고 있는 방향
- function calling 방식: 앱이 **App Schema(JSON)**에 함수를 최대 3개 등록 → Gleo가 음성을 해석해 Intent로 앱을 호출 → 앱이 Broadcast로 결과를 반환.
- 예: "오늘 3시 미팅 리마인더 추가해줘" → `ADD_REMINDER(title, dateTime)`
- LLM SDK는 종료됐고, Gleo 연동은 이 인터페이스로 일원화됨.
- ⚠️ 에뮬레이터에서 Gleo 호출을 테스트할 수 있는지는 문서에 없음 → 설명회 질문 대상. 안 되면 Intent를 adb로 직접 쏘아 시연(`adb shell am start -a ADD_REMINDER ...`)하는 방법으로 대체 가능.
- 기획서에 **"Gleo Interface 연동 설계(App Schema 포함)"**를 넣으면 기술 활용성과 현대차 방향 정렬 두 가지를 모두 어필할 수 있음.

## 3. Vehicle SDK에서 실제로 얻을 수 있는 데이터
| 도메인 | 조회(get/register) | 제어(set) |
|---|---|---|
| Odometer | 누적 주행거리, 트립 거리·시간(현재·누적·주유 후) | 주행가능거리 설정 |
| EvBattery / Fuel | SOC, 전비·연비(순간·누적·충전 후), 충전 스위치, 연료 % | 충전 한도·전류·포트·스위치 |
| DrivingMode / Brake | 주행 모드, 크루즈 상태·목표속도, 브레이크 페달 | — |
| Safety | **엔진오일·브레이크액·미션오일 수준, 워셔액 부족, 경고등(telltales), 안전벨트 미착용, 에어백** | — |
| Tire | 저압 경고(boolean만, 실제 압력값 없음) | — |
| Seat | **탑승 여부(occupancy), 벨트 체결**, 위치, 열선·통풍 | 위치 이동, 메모리, 열선·통풍 |
| HVAC | 온도, 풍량, AC, 공기청정 등 | 전부 |
| Light | 실내등, 독서등, 앰비언트 색·밝기, 외부등 | 앰비언트·실내등 등 |
| Door / Window | 열림·잠금, 창문 위치, 스마트글래스 | 잠금, 창문, 블라인드 |
| TurnSignal / Wiper / Steering | 방향지시등, 와이퍼, 조향각 | 와이퍼, 핸들 열선 |
| CarInfo | VIN, 제조사, 연식 | — |
| Toll | ETCS 안내 음량만 (**통행 이벤트·요금 없음**) | 음량 |

- 차량 속도: VehicleSpeedListener가 삭제됨 → AAOS `CarPropertyManager`로 `PERF_VEHICLE_SPEED`를 읽음.
- **NaviHelper**: 목적지·경유지 설정, 경로 요청, 주행 상태 이벤트, 목적지 정보(남은 거리·시간, **예상 통행료** `toll-fare`), 주의 지점, Trip 정보.
- 권한은 `pleos.car.permission.CAR_*`(조회)와 `CONTROL_CAR_*`(제어)로 나뉨.

## 4. 에뮬레이터로 시연 가능한 범위 (Virtual Console, 2026-10-19 신규)
기어(P/R/N/D), 브레이크, **주행거리**, 조향각, 크루즈, ETCS 시나리오, 도어·트렁크, 실내·외부 조명, 방향지시등, 창문, **좌석 탑승**, 와이퍼, **경고등(TPMS·벨트 등)**, **배터리 SOC·에너지·충전 상태**, 공조 전체, 시트 열선·통풍
→ PT 시연 때 Virtual Console로 상황을 연출할 수 있음 (예: 기어 P→D, SOC 하락, 경고등 점등).

## 5. 후보별 실현성 판정
| 후보 | 필요한 핵심 데이터 | 판정 | 비고 |
|---|---|---|---|
| A. 업무 운행일지 자동화 | Odometer 트립, 기어(AAOS), NaviHelper 현재 위치·목적지·즐겨찾기·통행료, 시트 위치, 전비·연비 | ✅ **콘솔 확인 결과 핵심 API 전부 "사용 가능"** | 목적 입력은 주차 중 원탭 프리셋(즐겨찾기 = 거래처) + Gleo 음성(부가). 카테고리 Business |
| B. 차량 관리 리포트 | Odometer, Safety(오일·브레이크액·경고등), Tire 저압, 전비 | ✅ 가능 | 데이터가 얕음(타이어 압력값·패드 마모 없음). Mobility Services → 주행 중 일부 허용 |
| C. EV 충전 라운지 | EvBattery SOC·충전, Seat·HVAC·Light **제어** | ⚠️ 제어 SDK 상태에 따라 갈림 | 주차 중 앱이라 규제는 문제없음 |
| D. 동승자 게임 | Seat 탑승, 방향지시등, 와이퍼 | ⚠️ 정책 리스크 | 게임 유도 금지 문구 + DO 미선언 시 주행 중 실행 불가. Kids 카테고리로 뒷좌석 한정이 아니면 불리 |

## 6. 설명회(10/28) 질문 목록
1. STT·TTS·FusedLocation·Vehicle Control이 "준비 중"인데(콘솔 확인), 공모전 기간 안에 열리는지
2. 에뮬레이터에서 Gleo Interface(App Schema) 호출을 테스트할 수 있는지
3. 공모전 앱에 DO(Distraction Optimization) 선언을 허용하는지, 주행 중 기능을 심사에서 어떻게 보는지
4. "단계별 가산점"의 구체적인 단계 (영상만 / GitHub / APK 동작)
