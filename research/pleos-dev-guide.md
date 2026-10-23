# Pleos 개발 문서 정리 — 우리 앱(법인 차량 자동 운행기록부) 기준 (2026-10-23)

> 공모전 [개발 환경 페이지](https://appdevchallenge.auto-hmg.io/guide/development)가 가리키는 Pleos 공식 문서(document.pleos.ai)의 가이드 96쪽을 받아 정리했습니다.
> - 원문(HTML에서 본문만 추출, 이미지 속 수치는 빠짐): `research/raw/pleos-docs/`
> - 영역별 상세 요약(Haiku 서브 에이전트): `research/raw/pleos-docs/_summaries/` A 시작·에뮬레이터 / B 기획 / C 개발·연동·등록 / D 심사·배포 / E 디자인
> - 이 문서의 ✅ 표시는 메인이 원문과 직접 대조한 항목입니다.
> - 빠진 것: SDK API 레퍼런스(약 1,900쪽, 필요할 때 개별 확인), Connect Mobile(폰 앱) 문서

## 1. 결론: 우리 설계에 바뀌어야 할 것
| # | 발견 | 영향 | 근거 |
|---|---|---|---|
| 1 | **에뮬레이터에는 시동·속도·위치·내비 목적지·연료 % 시뮬레이션 카드가 없음.** 기어(P/R/N/D)·누적 주행거리(Odometer)·좌석 탑승·배터리 SOC는 있음 | 운행 시작·종료를 **기어 P↔D + 누적거리 변화**로 판단하도록 설계. 주유 감지 시연은 전기차 **배터리 SOC 상승(충전)**으로. 목적지는 에뮬레이터 내비 동작 확인 필요 | ✅ `pleos-only/app-test-guide/virtual-console-guide.md` |
| 2 | 시동 OFF 뒤 시스템은 **Suspend(저전력)** 로 들어감 | 운행 종료 처리를 시동 OFF 순간에 끝내야 함(나중에 처리 불가 가정). 다음 시동 때 "미확인 운행" 재확인 설계와 맞음 | ✅ `.../audio-focus-development-guide/suspend-mode-audio-focus.md` |
| 3 | 주행 중 화면 제한(DO)을 선언하지 않은 앱은 **주차(Parking) 때만 사용 가능, 주행 중 사용 불가** | 입력을 P단에서만 받는 설계와 맞음. 단, 주행 중 "기록 중" 표시는 앱 화면이 아니라 **알림/상태 표시**로 해야 할 수 있음 | ✅ `vehicle-app-planning-guide/driving-restiction-policy.md` |
| 4 | 주행 상태는 `CarUxRestrictionsManager`로 받는 게 공식 방법 | UI 제한은 이걸로, 운행 판단은 기어·거리로 분리 | ✅ `vehicle-app-developer-guide/driving-restriction-development-guide.md` |
| 5 | **Vehicle State·NaviHelper는 신청 없이 바로 사용 가능**. TTS·STT·FusedLocation·Vehicle Control은 "준비 중"이라 신청 불가 | 기존 판단과 같음 | ✅ `create-my-project.md` |
| 6 | **Gleo(차량 AI) 연동**: 앱이 `assets/schema.json`에 기능을 등록하면 Gleo가 음성 요청을 앱 Intent로 넘기고, 앱은 결과를 broadcast로 돌려줌(7초 제한). 스키마는 **승인 후 활성화** | "오늘 운행 몇 km?", "지난 운행 용무 업무로 저장" 같은 음성 기능 가능 → STT SDK 없이 음성 경험. 에뮬레이터에서 Gleo가 동작하는지·승인 절차는 확인 필요 | ✅ `app-integration-guide/guide/deliver-schema.md` |
| 7 | 보안: **URL 경로·쿼리에 인증 토큰 등 민감정보를 넣지 말 것**, 저장 데이터 앱 수준 암호화, TLS 1.2 이상 | QR 내보내기를 "토큰이 들어간 다운로드 링크"로 만들면 위반 소지 → 방식 재설계(예: 폰에서 짧은 코드 입력, 또는 링크엔 식별자만 두고 별도 인증) | ✅ `app-registration-guide/app-security-guide.md` |
| 8 | 심사: "사용자가 개인정보 제공을 취소하면 … **저장된 사용자의 데이터를 삭제해야** 합니다" | "기록 삭제 불가"와 충돌 → **앱 안에서 고치거나 지우기는 불가, 동의 철회·직원 삭제 시에는 해당 개인정보 삭제**(삭제 사실만 기록)로 정의를 바꿔야 함 | ✅ `distribute/app-review-guide/review-user-privacy-security.md` |
| 9 | 성능: RAM 400MB 이하, 주행 중 CPU 사용률 기준 있음, 프로세스가 다시 만들어져도 상태 복원 | 백그라운드 기록 서비스는 가볍게, 상태는 DB에 즉시 저장 | ✅ `vehicle-app-planning-guide/performance-resource-mgmt.md` — CPU 주행 중 5% 미만(내비 아닌 앱), 정차 중 25% 이하 |
| 10 | 제출 시 개인정보처리방침 URL 필수, 위치정보 이용약관은 조건부 | 공모전엔 불필요하나 실제 출시엔 필요. 기획서 "개인정보" 항목에 반영 | ✅ `distribute/app-submission-guide.md` |

## 2. 개발 환경·에뮬레이터 (요약 A)
- Android API 28 이상(minSdk 28 필수), Gradle 8.0+, Java/Kotlin, **Pleos Connect Emulator 2.1.0** (Android Studio SDK Manager에 업데이트 사이트 추가 → API 34 Pleos 시스템 이미지) ✅
- Virtual Console: `adb forward tcp:8088 tcp:8088` 후 브라우저 `http://127.0.0.1:8088/`에서 차량 상태 조작 ✅
- SDK 버전 주의(요약 기준): Vehicle SDK 2.3.2에서 속도 리스너 삭제, NaviHelper 3.0.5에서 좌표 순서·DestinationInfo 필드명 변경 → 개발 시 최신 레퍼런스 확인
- 상세: `_summaries/A_setup_emulator.md`

## 3. 기획·주행 규제 (요약 B)
- 주행 규제는 속도·기어·브레이크 신호와 지역 규정으로 적용, 시동(IGN1) OFF면 해제
- 지역별로 키보드·검색·설정 화면 허용이 다름(주행 중 키보드는 북미 금지 등) → 우리 앱은 주행 중 입력이 없어 영향 적음
- 개인정보: 최소 수집, 로그 마스킹. 네트워크 끊김 대비(재시도·오프라인 표시)
- 상세: `_summaries/B_planning.md` (표가 평탄화돼 열 대응은 원문 재확인 권장)

## 4. 개발·연동·등록 (요약 C)
- 회전 다이얼(CCP) 미지원이면 manifest에 `com.hmg.rotary.ROTARY_SUPPORTED=false`, 터치로 모든 조작 완결
- 오디오: 알림음 낼 때 오디오 포커스 요청, Suspend 시 포커스 반납
- Gleo 연동 규칙: 함수 이름 대문자_언더스코어, description 영어·예시 금지, 응답 status success/asking/fail + mode voice/beep/silent
- 보안: Keystore·AES-GCM, exported 최소화, 배포 서명, 디버그 OFF, 버전 올리지 않으면 반려
- 상세: `_summaries/C_dev_integration.md`

## 5. 심사·배포 (요약 D)
- 심사 5영역: 등록 정보, 콘텐츠 안전, 운전자 주의 분산, 기능·성능·안정성, 개인정보·보안
- 우리 앱 위험: 위 1절 7·8번, 위치정보 동의, 외부 서버 전송 시 동의
- 상세: `_summaries/D_review.md`

## 6. 디자인 (요약 E)
- 주행 중 1~2초 안에 파악, 애니메이션·자동 스크롤 금지
- 글자: 주요 정보 5mm 이상, 최소 12sp, 대비 4.5:1 이상 (요약 기준)
- 응답 0.25초 넘으면 처리 중 표시, 누름 효과 95% 축소 ✅ (`foundations/interaction.md`)
- 가로·세로 레이아웃 모두 필요, 창 분할(2앱 1:1) 고려
- 해상도·색상 값·최소 터치 영역은 원문 이미지에만 있어 **추출 안 됨** → 원문 페이지 직접 확인 필요
- 상세: `_summaries/E_design.md`

## 7. 아직 확인할 것
- 에뮬레이터에서: 기어 변경이 AAOS `GEAR_SELECTION`으로 들어오는지, `getCurrentDistanceDriven`이 Odometer 카드 값과 같은지, NaviHelper 목적지·즐겨찾기가 에뮬레이터에서 나오는지, Gleo가 있는지
- 원문 이미지 속 수치(해상도, 색, 터치 영역)
- 공모전 제출 앱도 Pleos 심사 기준을 따르는지 (공모전은 APK만 제출 → 심사 기준은 "참고"로 보되 PT에서 지적될 수 있음)
