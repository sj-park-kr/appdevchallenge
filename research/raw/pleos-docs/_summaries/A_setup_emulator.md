# Pleos Connect 에뮬레이터 셋업·테스트 정리

> 근거 파일 경로는 모두 `C:\Users\PC001\develop\appdevchallenge\research\raw\pleos-docs\` 기준 상대 경로로 표기. 수집일 2026-10-23.
> 문서에 없는 내용은 "문서에 없음"으로 표시.

## 1. 개발 환경 요구사항

(connect/guide/getting-started/application-development/setup-connect-sdk-emulator.md)

| | 구분 | 버전
|---|---|---
| | Minimum Android SDK | Android API 28 이상
| | Gradle 버전 | 8.0 이상
| | 개발 언어 | Java, Kotlin
| | Pleos Connect Emulator | 버전 2.1.0
| | Pleos Connect Virtual Console | Pleos Connect Virtual Console를 지원하는 Pleos Connect Emulator 최소 버전: 2.1.0

- 주의(원문): minSDK 버전은 Android API 28 이상이어야 합니다. 차량 사이버 보안 요건(사이닝 키 로테이션·리니지 지원)에 따른 요구사항입니다.
- Android Studio 최신 버전, Android Emulator 시스템 요구사항 충족 필요 (같은 파일)
- AVD 권장 사양: RAM 4 GB 설정, Startup의 Boot option은 Cold (same file, Setting up the emulator)
- 그래픽 카드 필수. 권장: NVIDIA RTX 4060/5060 Laptop 8GB 이상, AMD Radeon RX 7700S/RX 7600M XT 8GB급 이상 외장 GPU. 최소: NVIDIA GeForce RTX 3060 Laptop GPU 6GB 이상, AMD Radeon RX 6600M 8GB 또는 RX 6700S 8GB 이상 (connect/guide/getting-started/application-development/configure-pleos-connect-emulator.md)
- 샘플 앱 기준 환경(참고): JDK 17, Gradle wrapper 8.10.2, AGP 8.8.2, Kotlin 2.0.0, compileSdk/targetSdk 35, Sample App minSdk 23, AVD `Pleos_Connect_v2.1` (Android 14) (pleos-only/tutorial/vehicle-sdk-sample-app.md)
- 제품 앱은 minSdk 28 이상을 별도로 적용해야 함 (pleos-only/tutorial/vehicle-sdk-sample-app.md)

## 2. 에뮬레이터 설치·실행 단계

(connect/guide/getting-started/application-development/setup-connect-sdk-emulator.md, configure-pleos-connect-emulator.md)

**Emulator 설치 (Android Studio)**

1. 이전 버전 Pleos Connect Emulator가 있으면 먼저 삭제.
2. Android Studio 최신 버전 설치 (https://developer.android.com/studio?hl=ko).
3. Menu > Tools > SDK Manager 선택 > **SDK Update Sites** 탭 클릭.
4. 목록 좌측 상단 **+** 버튼 클릭 후 입력:
   - Name: `Pleos Connect System Image`
   - URL for Mac: `https://nexus-playground.pleos.ai/repository/raw-releases/connect-avd/2.x/crp-arm64-sys-img.xml`
   - URL for Windows/Linux: `https://nexus-playground.pleos.ai/repository/raw-releases/connect-avd/2.x/crp-sys-img.xml`
5. **OK** 클릭.
6. **SDK Platforms** 탭 클릭 → Android API Level 34의 Pleos Connect system Image 체크.
7. 하단 **Show Package Details** 체크 → **OK** 클릭 → 설치 진행.
8. 설치 완료 후 **Finish** → Android Studio 재시작.

**AVD 생성**

9. Menu > Tools > Device Manager 선택 (구버전: AVD Manager). **Create device** 클릭 (구버전: Create Virtual Device).
10. 왼쪽 Form Factor에서 `Automotive` 선택 → `Pleos Connect v2.1.0` 선택 → **Next**.
11. Configure virtual device 창에서 **Advanced Settings** 탭 선택 (구버전: Show Advanced Settings).
12. Startup > Default boot를 `Cold`로 설정 (구버전: Emulated Performance의 Graphics를 `Hardware`, Boot option을 `Cold boot`).
13. Emulated Performance의 RAM Size를 `4 GB`로 설정.
14. Device 탭으로 복귀 → Select system image > API에서 `API 34` 선택 → 하단 표의 `Pleos Connect v2.1.0 APIs` 선택 → **Finish**.

**실행**

15. Device Manager에서 생성한 AVD 실행.
16. 주의: `quick boot`로 설정하면 VHAL을 이용할 수 없음. 반드시 Cold boot.

**Virtual Console 접속**

17. 터미널: `adb forward tcp:8088 tcp:8088`
18. PC 브라우저: `http://127.0.0.1:8088/`
- 접속 불가 시 확인 순서: 에뮬레이터 실행 여부 → Virtual Console 지원 이미지 여부 → `adb devices` → `adb forward` 재실행 → PC 8088 포트 점유 여부 → 브라우저 재접속 (configure-pleos-connect-emulator.md / use-vehicle-emulator.md)

**기타 설정**

- 언어: 기본 한글. 차량 설정 > 일반 설정 > 언어/Language > `English` (configure-pleos-connect-emulator.md)
- 마이크(STT 테스트용): 에뮬레이터 패널 Extended Controls > Microphone 메뉴에서 오디오 입력 수신 설정 (같은 파일)
- AVD Bluetooth 동글 연동: 이 버전 미지원 (같은 파일)
- 폼 팩터 테스트(선택): host-display-bridge 실행 `go run . --avd "Pleos Connect v2.0"` (Go 1.22 이상, 포트 8095·8096), FormFactorConsole 앱에서 Display preset/Orientation 선택 후 가상 디스플레이 생성. 가상 디스플레이를 제거하면 해당 앱이 강제 종료됨 (pleos-only/app-test-guide/form-factor-test-guide.md)

## 3. 차량 데이터 시뮬레이션 방법

(pleos-only/app-test-guide/virtual-console-guide.md 기준. 조작 경로: Virtual Console > Emulation Controls > Domain 선택 > 카드 값 변경)

**Motion**

- Gear Selection: 기어 P, R, N, D 중 설정
- Odometer: 누적 주행 거리 0~1,000,000 km, 1 km 단위
- Brake Pedal: 0~100%
- Steering Angle: -540~540도
- Steering Wheel Heat: Off/Low/Medium/High

**Energy (전기차 항목)**

- Remaining Range (0~1,000,000 m, 1,000 m 단위), Battery Energy (0~200 kWh), Battery SOC (0~100%), Battery Capacity, Charge Current Limit, Charge Percent Limit, Charge Switch, Charge Port

**Convenience (일부)**

- Seat Occupancy: 운전석·동승석·뒷좌석 좌우를 Empty/Occupied로 설정 (탑승 여부만, 시트 위치 아님)
- Door Position, Door Lock, Trunk/Frunk, Cabin Lights, Reading Lights, Window Position, Window Lock, Glove Box 등

**Safety**

- Telltales: 주차 브레이크, 안전벨트, ABS, TPMS 등 경고등을 Off/On/Blink로 설정

**Vehicle / ADAS / Climate**

- Vehicle: Notification 1(알림 표시/숨김)
- ADAS: Cruise Control State, Cruise Target Speed
- Climate: 공조·온도·풍량·시트 열선/통풍 등

**adb로 바꾸는 것**

- 주행 규제 ON/OFF만 가능 (`adb shell cmd hmg_car_service --service drivingstate driving_regulation on|off`) (pleos-only/vehicle-app-developer-guide/adb-command-reference-guide.md)

**문서에 없음 (시뮬레이션 카드 목록에 없음)**

- 시동(IGNITION) 상태, 차량 속도, 트립 주행거리·시간, 연료량·연료 %, 시트 위치(슬라이드/리클라이닝), VIN, GPS 위치, 내비 목적지·즐겨찾기 (Virtual Console 카드 목록 및 가이드 전체에 해당 항목 없음)

## 4. 프로젝트 생성·SDK 의존성·권한 선언

**프로젝트 생성** (pleos-only/create-my-project.md)

1. Pleos Playground 회원가입 (우측 상단 로그인 > Pleos 계정 만들기).
2. 로그인 후 상단 GNB에서 Workspace > My Project > 프로젝트 생성.
3. 입력: 프로젝트 이름(나중 변경 가능), 개발사명, 카테고리, 애플리케이션 설명 → 생성.
4. 프로젝트 정보 확인: 키 정보 > 프로젝트 ID(Key)는 앱 심사 요청 시 필요. SDK > 클라이언트 ID/시크릿은 TextToSpeech, SpeechToText 등 서버 연결 SDK용. CRN은 Emulator 2.1.0 이후 불필요.
5. SDK 사용 신청: 프로젝트 정보 좌측 사이드바 > SDK > 하위 메뉴에서 SDK 선택 후 상태 확인. 상태 값은 3절 SDK 표 참고.

**Maven 저장소 등록** (connect/guide/getting-started/... 아님, pleos-only/getting-started.md 원문)

```kotlin
dependencyResolutionManagement {

    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)

    repositories {

        google()

        mavenCentral()

        maven {

            url = uri("https://nexus-playground.pleos.ai/repository/maven-releases/")

        }

    }

}
```

**SDK 의존성 추가** (pleos-only/getting-started.md)

```kotlin
dependencies {

    implementation("ai.pleos.playground:Vehicle:2.3.1")

}
```

- 주의: 이 가이드의 Vehicle SDK 버전은 2.3.1이나, SDK 릴리즈 노트(pleos-only/release-note/sdk-261015.md)와 샘플 앱 가이드(pleos-only/tutorial/vehicle-sdk-sample-app.md)는 2.3.2. 어느 쪽이 최신인지 확인 필요.

**권한 선언** (pleos-only/getting-started.md, app/src/main/AndroidManifest.xml)

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="pleos.car.permission.CAR_DOORS" />

    <application

        ...>

        ...

    </application>

</manifest>
```

- 읽기 권한 `CAR_DOORS`, 쓰기 권한 `CONTROL_CAR_DOORS` (tutorial 기준). 실행 중 승인 창이 없고 Manifest 선언으로 충분 (tutorial).
- 샘플 앱 전체 목록 중 우리 데이터와 이름이 맞닿는 권한: CAR_SPEED, CAR_MILEAGE, CAR_ENERGY, CAR_INFO, CAR_DRIVE, CAR_POWERTRAIN, CAR_SEATS, CAR_SAFETY, CAR_TOLL. 단 각 권한이 어느 API(속도·주행거리·시동·기어 등)에 필요한지는 **문서에 없음** ("API별 권한은 Vehicle SDK permissions에서 확인"이라고만 함). 제품 앱은 실제 사용하는 API의 최소 권한만 선언 (tutorial).

## 5. SDK 서비스 상태 표 및 릴리즈 노트

**SDK 상태** (pleos-only/create-my-project.md, pleos-only/release-note/sdk-261015.md, playground-261015.md)

| SDK | 상태 | 버전(2026-10-19) |
|---|---|---
| Vehicle State | 사용 가능 (신청 불필요) | 문서에 없음 (Vehicle SDK v2.3.2와 동일 항목인지 문서에 명시 없음)
| NaviHelper | 사용 가능 (신청 불필요) | v3.0.5
| Vehicle SDK | 문서에 명시 없음 | v2.3.2
| FusedLocation | 준비 중 (Comming Soon, 신청 버튼 없음) | v1.1.3
| TextToSpeech | 준비 중 | v3.3.1
| SpeechToText | 준비 중 | v3.3.1
| Vehicle Control SDK | 준비 중 | 문서에 없음
| LLM SDK | 제공 종료 (Gleo Interface 이용) | —
| CRN | 제공 종료 | —
| 블루투스 동글 연동 | 제공 종료 | —

- connect-sdk-service-status.md: 요청한 SDK 문서가 해당 경로에 없다는 안내만 있음. 제공 여부·계획은 확인 불가.

**Emulator v2.1.0 (2026-10-19)** (emulator-261015.md)
- 신규: Pleos Connect Virtual Console, 폼팩터 테스트용 에뮬레이터 기능
- 개선: 탑재 SDK 버전 업데이트로 API 지원 범위 확대
- 제거: LLM SDK, CRN, 블루투스 동글 연동

**Playground v2.6.0 (2026-10-19)** (playground-261015.md)
- 개발자 여정 가이드(Discover > Developer Journey), 문서 검색 추가. Pleos Connect 가이드 재구성.

**Vehicle SDK v2.3.2** (sdk-261015.md)
- Breaking: CruiseControl 기존 상수(OFF, READY, ACTIVE) 제거. checkHvacFanSpeedCapabilities 콜백 타입 Map<SeatArea, List<Int>> → Map<SeatArea, AreaBounds<Int>>. FanDirectionType 확장(ordinal 저장 시 마이그레이션 필요). DoorArea, MirrorArea, SeatArea, TurnSignalArea, WheelArea, WindowArea에 내용 기반 equals/hashCode 추가 → 객체를 Map 키로 쓰는 코드 확인 필요.
- New: checkVINInfoCapabilities, getVINInfo, getCurrentEvEfficiency, registerEvBatteryStateOfCharge, getCurrentSmartGlassLevel 등 (EV/Fuel 효율, 배터리 충전율, 연료량, ETCS 볼륨 조회·구독 포함).
- Deprecated: getCRNInfo/checkCRNInfoCapabilities (→ getVINInfo/checkVINInfoCapabilities 전환), checkWheelAreaCapabilities.
- **Shutdown: VehicleSpeedListener 삭제 (리스너와 onSpeedUpdated 제거)**. getHvacTemperatureValueSuggestion 삭제.

**NaviHelper v3.0.5** (sdk-261015.md)
- Breaking: onNavigationStatus 인자 타입 RouteDriving → NavigationStatus. **데이터 모델 생성자 좌표 순서 변경 (longitude, latitude → latitude, longitude)**: BookmarkInfo, CurrentLocationInfo, DestinationInfo, RecentDestinationInfo, RequestWaypointInfo, RouteInfo, WaypointInfo. **DestinationInfo, WaypointInfo의 totalDistance/totalTime → remainDistance/remainTime**.
- New: requestTrip, requestRouteWithWaypoints, requestNavigationScreen, initialize(onConnected, onFailed), onCautionPointInfo, onRoutingCompleted, onTripInfo.
- Deprecated: onRouteEnded → onRoutingCompleted 권장.

**TextToSpeech / SpeechToText v3.3.1**: 오류 콜백 인자 String → ErrorType, initialize(listener) 추가. 우리 앱과 무관.

**FusedLocation v1.1.3**: onChanged 인자 LocationData → LocationData?, onError 필수 구현. Proximity Alert 추가. (단 상태가 준비 중이라 사용 불가.)

## 6. 샘플 앱 튜토리얼 요약 (Vehicle SDK 호출 패턴)

(pleos-only/getting-started.md, pleos-only/tutorial/vehicle-sdk-sample-app.md)

**초기화 → 도메인 → 호출 → 해제 (원문 예제)**

```kotlin
val vehicle = Vehicle(context)

vehicle.initialize()

val door = vehicle.getDoor()

door.getCurrentDoorPosition(
    area = DoorArea(DoorValue.ROW_1_LEFT),
    onComplete = { pos: Int? ->
        // Use the current door position.
    },
    onFailed = { e: Exception ->
        // Handle the Vehicle SDK error.
    }
)

// Do not call release() here.
// Call release() when the app no longer needs Vehicle SDK (for example, in onDestroy()).
```

- 호출 흐름: 지원 확인 `checkDoorPositionCapabilities` → 조회 `getCurrentDoorPosition` → 변경 알림 구독 `registerDoorPosition` → 변경 요청 `setDoorPosition` → 해제 `unregisterDoorPosition`.
- 콜백: onComplete/onFailed는 비동기. 변경 요청 완료 콜백의 값은 요청값이지 재조회 값이 아님. 변경 후 반드시 재조회 또는 리스너 알림으로 확인.
- 리스너: 등록한 **동일 객체와 동일 area**로 해제. 화면을 떠나거나 다른 기능으로 바꾸는 것만으로는 구독이 해제되지 않음 (명시적 해제 필요).
- 지원 확인: 실패 또는 Unsupported면 변경 요청하지 않음. 'Unsupported'에는 실제 미지원과 확인 요청 실패가 섞일 수 있음.
- 값이 null 또는 unavailable이면 값을 못 받은 상태. 권한 누락으로 단정하지 않음.
- "SDK initialized"는 초기화 호출이 예외 없이 반환됐다는 뜻. 서비스 연결 완료를 뜻하지 않음.
- 리소스: `vehicle.release()`로 정리 (예: onDestroy).

## 7. adb 명령 중 테스트에 쓸 만한 것

(pleos-only/vehicle-app-developer-guide/adb-command-reference-guide.md)

- 기기 확인: `adb devices`
- Virtual Console 포워딩: `adb forward tcp:8088 tcp:8088`
- 앱 설치: `adb install -d -r [apk파일주소]` (실패 시 `adb push` 후 `adb shell pm install -d -r /data/local/tmp/[apk파일이름]`)
- 패키지 찾기: `adb shell pm list packages | grep [패키지명 일부]`
- 앱 실행: `adb shell monkey -p [패키지이름] -c android.intent.category.LAUNCHER 1` 또는 `adb shell am start -n [패키지이름]/[Activity 경로]`
- 앱 강제 종료: `adb shell am force-stop [패키지이름]`
- 패키지 데이터 초기화: `adb shell pm clear [패키지이름]`
- 앱 삭제: `adb uninstall [패키지이름]`
- 텍스트 입력: `adb shell input text "[텍스트]"`
- 화면 캡처: `adb exec-out screencap -p > ~/Desktop/screen_$(date +"%Y%m%d_%H%M%S").png`
- 화면 녹화: `adb exec-out screenrecord --output-format=h264 -` (Ctrl+C로 종료, ffmpeg로 mp4 변환)
- **주행 규제 ON/OFF (모든 차종 공통)**: `adb shell cmd hmg_car_service --service drivingstate driving_regulation on` / `... off`. 운행 중 입력 제한 화면 테스트에 유용.
- 기어 변경: adb가 아니라 Virtual Console에서 설정 (문서상 명시)
- 유틸리티 모드: 차속 0, 주차 브레이크 ON, 기어 P 선행 필요. 원시 바이트를 `/dev/vcs_simulator_rx`에 쓰는 명령. **효과가 무엇인지 문서에 없음**. 사용 전 주의.
- CCS 연결 명령(`hmg_is_ccs_account_linked`, `hmg_provisioning_status`)은 Devbox와 Pleos Connect Emulator에서 지원되지 않음. 쓰지 말 것.
- 시동, 속도, 주행거리 등을 바꾸는 adb 명령: 문서에 없음.

## 8. 우리 앱에 주는 영향

(항목별 가능성. 근거는 위 1~7절 참고)

| 데이터 / 항목 | 에뮬레이터에서 바꿔 볼 수 있는가 | 비고
|---|---|---
| getCurrentDistanceDriven (계기판 누적거리) | 가능 (Virtual Console Odometer 0~1,000,000 km) | 카드가 이 API 값과 1:1 대응하는지 문서에 없음. 실제 조회값으로 확인
| getTripCurrentDrivingDistance / getTripCurrentDrivingTime | 문서에 없음 | TripStatistics 모델만 신규 언급, 시뮬 카드 없음
| getFuelPercent | 문서에 없음 | 연료량 조회·구독 API 추가만 언급. Energy 카드는 EV 배터리용
| getVINInfo | 문서에 없음 (API 존재는 확인: sdk-261015.md) | 시뮬 값 설정 방법 없음
| 시트 위치 | 문서에 없음 | Seat Occupancy(탑승 Empty/Occupied)만 있음
| 시동 (AAOS IGNITION_STATE) | 문서에 없음 | 시뮬 카드 없음. 주행 규제 해제 조건으로 "IGN1 OFF"가 언급될 뿐
| 기어 (AAOS GEAR_SELECTION) | 가능 (Gear Selection P/R/N/D) | Virtual Console 설정이 AAOS 프로퍼티에 반영되는지는 문서에 없음. 콜드부트 문서에서 VHAL 언급으로 간접 추정만 가능
| 속도 (AAOS PERF_VEHICLE_SPEED) | 불가 (문서에 없음) | 속도 카드 없음. SDK VehicleSpeedListener는 2.3.2에서 삭제됨
| NaviHelper getCurrentLocationInfo | 문서에 없음 | 위치 시뮬 카드 없음
| NaviHelper getDestinationInfo / getRecentDestinationInfo / getBookmarkInfo | 문서에 없음 | 내비 시뮬 기능 언급 없음
| 주행 규제 상태 | 가능 (adb on/off) | 우리 앱 입력 차단 동작이 실제로 바뀌는지는 문서에 없음
| 운전자 선택·P단 입력 | 부분 가능 | 기어 P 설정으로 P단 조건 재현은 가능. 주행 중 입력 잠금 여부는 문서 표가 QR 화면만 다룸
| 국세청 양식 QR 표시 | 문서에 없음 | 표의 QR 항목은 Pleos 기본 화면뿐. 우리 앱 QR 화면의 규제 대상 여부는 확인 불가

**주의할 점**

1. 시동, 속도, 트립거리, 연료, 시트 위치, 위치·목적지를 에뮬레이터에서 바꿀 수 없으므로, 시동 ON/OFF 기반 운행 시작·종료 로직은 에뮬레이터만으로 end-to-end 검증 불가. 기어와 주행거리 조합의 mock 또는 실차 검증이 필요.
2. Vehicle SDK 2.3.2에서 VehicleSpeedListener 삭제. 속도를 리스너로 받는 설계는 불가. 속도 대체 수단(getter 등) 존재 여부는 문서에 없음.
3. NaviHelper v3.0.5: 좌표 생성자 순서가 (lat, lon)으로 바뀜. 우리가 데이터 모델을 직접 만들면 위도·경도 뒤바뀜 위험. DestinationInfo의 totalDistance/totalTime은 remainDistance/remainTime으로 이름 변경.
4. Vehicle SDK 버전 불일치: 시작 가이드는 2.3.1, 릴리즈 노트·샘플 앱은 2.3.2. 프로젝트에 어느 버전을 쓸지 확인.
5. 콜드부트 필수: quick boot 시 VHAL 사용 불가.
6. Vehicle SDK 리스너는 등록 객체와 area로 명시 해제. 화면 이탈만으로는 해제되지 않음.
7. "Vehicle State"와 "Vehicle SDK"의 관계가 문서상 불명확. 사용 가능 상태 확인을 Playground에서 직접 해야 함.
8. 문서 공백: infolink-emulator/setup-infolink-emulator.md는 404 페이지(내용 없음). infolink-emulator/driving-restiction-policy.md는 InfoLINK 전용 규정. Vehicle SDK API 상세(권한 표, 메서드 목록)는 수집 범위 밖이라 확인 불가.
