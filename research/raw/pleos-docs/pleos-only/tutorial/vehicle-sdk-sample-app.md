> 출처: https://document.pleos.ai/docs/pleos-only/tutorial/vehicle-sdk-sample-app (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Vehicle SDK Sample App 사용 가이드
Vehicle SDK Sample App은 차량 기능을 찾아보고 Vehicle SDK의 사용 흐름을 익히는 Android 예제 앱입니다. 이 가이드는 Pleos Connect 전용 AVD에서 Sample App을 사용하는 환경을 기준으로 설명합니다.

## Sample App 화면 둘러보기​

Sample App은 차량 기능을 선택하는 진입 화면과 선택한 기능을 사용하는 상세 화면으로 구성됩니다.

### Sample App 진입 화면​

앱을 실행하면 왼쪽에서 차량 기능의 분류를 선택하고, 오른쪽에서 사용할 기능을 찾을 수 있습니다.

[이미지: Sample App 진입 화면. 왼쪽에는 차량 기능 분류, 오른쪽에는 Door Position, Door Lock, Glove Box Lock이 표시됩니다.]

| | 화면 레이블 | 역할
| | `Vehicle Playground` | Sample App의 화면 제목입니다. 상단에는 SDK와 Vehicle Service 버전, SDK 초기화 상태가 함께 표시됩니다.
| | `BROWSE VEHICLE APIS` / `VEHICLE DOMAINS` | Door, Window 등 차량 기능의 분류를 선택하는 영역입니다. 숫자는 해당 분류의 기능 수입니다.
| | `Search features` | 선택한 분류 안에서 기능을 검색하는 입력란입니다.
| | `Door Position` | 문 위치를 조회하거나 변경하는 기능 카드입니다. 선택하면 상세 화면이 열립니다.

상단의 `SDK initialized`는 SDK 초기화 호출이 예외 없이 반환됐음을 나타냅니다. 이 표시만으로 Vehicle Service 연결 완료나 개별 기능의 사용 가능 여부를 판단하지 않습니다.

### 기능 상세 화면​

Door Position을 선택하면 지원 범위, 현재 상태, 변경 요청, 변경 알림과 API 실행 결과를 한 화면에서 볼 수 있습니다.

[이미지: Door Position 상세 화면의 Vehicle support, Current value, Change value, Live updates와 API activity 영역.]

| | 화면 레이블 | 주요 기능
| | `Vehicle support` | 기능 지원 상태와 선택한 영역의 값 범위를 보여 줍니다. `Check support` 버튼으로 다시 확인합니다.
| | `Current value` | 마지막으로 조회하거나 변경 알림으로 받은 값을 보여 줍니다. `Area`에서 대상 영역을 선택하고 `Refresh` 버튼으로 다시 조회합니다.
| | `Change value` | 변경할 값을 지정하는 영역입니다. 값을 선택하는 것만으로는 요청하지 않으며, `Apply change` 버튼을 누르면 변경 요청을 보냅니다.
| | `Live updates` | 변경 알림을 관리하는 영역입니다. `Start updates` 버튼으로 구독하고 `Stop updates` 버튼으로 해제합니다.
| | `API activity` | 호출한 API와 최신 결과를 보여 줍니다. `Expand` 버튼으로 펼치고 `Collapse` 버튼으로 접습니다.
| | 왼쪽 화살표 버튼 | 현재 분류의 기능 목록으로 돌아갑니다. 구독 해제 버튼은 아닙니다.

기능에 따라 조회·변경·알림 구독 중 일부만 제공되며, 변경 API가 없는 기능에는 `Change value` 영역이 표시되지 않습니다. 값의 형식과 지원 범위에 따라 선택 버튼, 스위치, 숫자 입력 또는 슬라이더가 표시됩니다.

`Supported`는 기능 지원 상태를, `Reference`는 SDK를 직접 호출하는 기준 예제임을 나타냅니다.

## 학습 개요 및 목표​

본 가이드는 Android 앱(모바일 또는 태블릿) 개발 경험과 Android에 대한 사전 이해를 가지고 차량용 앱 개발을 처음 시작하는 개발자를 위한 과정입니다. Pleos Connect 전용 AVD에서 Vehicle SDK Sample App을 실행하고, Door Position을 비롯한 차량 기능을 살펴보며 Vehicle SDK를 활용한 차량 데이터 연동 방법을 기본부터 차근차근 알아보는 것을 목표로 합니다.

Sample App을 통해 차량 기능의 지원 범위와 현재 상태를 확인하고, 상태 변경 요청과 변경 알림의 구독·해제 흐름을 익힙니다. 본 과정에서는 디자인 가이드, UI 구성, 일반 Android API 연동 방법은 다루지 않습니다. Sample App의 사용 흐름과 기준 예제를 바탕으로 필요한 차량 기능을 직접 개발하는 앱에 적용해 보세요.

| | 용어 | 의미
| | Domain | Door, Window 등 차량 기능의 분류
| | Area | `ROW_1_LEFT`처럼 조회하거나 제어할 대상 영역
| | Capability | 기능의 지원 여부, 읽기·쓰기 접근 방식, 영역별 값 범위
| | Read / Write | 현재 상태 조회 / 상태 변경 요청
| | Listener | 차량 상태의 변경 알림을 받는 객체

## 사용 환경과 준비 사항​

내 프로젝트에 SDK를 연동하려면 Vehicle SDK 연동 가이드를 참고하세요. 실습 후에는 내 앱에 적용하기에서 개발 단계별 문서로 이동할 수 있습니다.

### 전용 AVD 사용​

일반 Android 휴대전화나 기본 에뮬레이터 이미지가 아니라, Pleos Vehicle Service가 포함된 Pleos Connect 전용 AVD를 사용하세요. 설치 방법은 Pleos Connect Emulator 설치 및 실행을 참고하세요.

이 가이드의 화면은 `Pleos_Connect_v2.1` AVD(Android 14)에서 촬영되었습니다. 앱에서 조회하는 기능과 값 범위는 사용하는 AVD의 지원 상태에 따라 달라질 수 있습니다.

### Sample App release 기준​

이 가이드의 기준 버전은 Vehicle SDK `2.3.2`과 Vehicle Service `2.3.22`입니다.

| | 항목 | 기준
| | Sample App | `1.0.0-sdk35`
| | Vehicle SDK | `2.3.2`
| | Vehicle Service | `2.3.22`
| | AVD | `Pleos_Connect_v2.1`, Android 14
| | JDK | 17
| | Gradle wrapper | `8.10.2`
| | Android Gradle Plugin | `8.8.2`
| | Kotlin | `2.0.0`
| | Android SDK | compileSdk / targetSdk 35
| | Sample App minSdk | 23

상단 버전 표시는 앱이 사용하는 SDK 버전과 설치된 Service 버전 정보입니다. 버전 표시 자체가 호환성 보장은 아니므로 API 호환성 및 가용성와 실제 기능의 지원 결과를 함께 확인하세요.

전용 AVD에 Sample App을 설치한 뒤 Launcher에서 Vehicle SDK Sample을 실행합니다. 소스에서 직접 빌드하는 경우는 아래 소스 빌드와 설치를 참고하세요.

### 소스 빌드와 설치​

소스에서 직접 빌드하는 경우 위의 Sample App release 기준에 맞는 개발 환경과 저장소의 Gradle wrapper를 사용합니다. Sample App은 `gradle/libs.versions.toml`에서 Vehicle SDK 버전을 관리합니다.

프로젝트 루트에서 빌드한 뒤 실행 중인 전용 AVD에 설치합니다.

`./gradlew assembleDebug

./gradlew installDebug

`

APK는 `app/build/outputs/apk/debug/`에 생성됩니다. 설치가 끝나면 Launcher에서 Vehicle SDK Sample을 실행합니다.

Sample App 테스트 기준
SDK 버전을 변경한 경우 `PublicApiPolicyTest`의 public API 수 기준이 사용하는 SDK 버전과 일치하는지 확인하세요. 이전 버전의 기준이 남아 있으면 테스트가 실패할 수 있습니다. 이는 앱 빌드나 Service 연결 성공을 판단하는 근거와 별개입니다.

Sample App 자체의 `minSdk`는 23입니다. Pleos Playground에 배포할 제품 앱은 signing key rotation과 lineage 지원을 위해 Android API 28 이상의 요구사항을 별도로 적용해야 합니다.

## Door Position으로 사용 흐름 익히기​

Reference 예제

Door Position은 Vehicle SDK를 직접 호출해 지원 범위 확인, 조회, 변경, 알림 구독·해제를 구현한 기준 예제입니다. 제품 앱에 SDK를 적용할 때 이 호출 흐름을 참고하세요.

왼쪽 분류에서 Door, 기능 목록에서 Door Position을 선택합니다. 이 예제에서는 같은 `ROW_1_LEFT` 영역을 기준으로 조회, 변경, 알림 구독을 진행합니다.

화면에서 수행하는 작업과 SDK API는 다음과 같이 연결됩니다. 각 호출의 결과는 `API activity`에서 확인합니다.

| | 작업과 화면 위치 | Door Position의 typed API
| | 지원 범위 확인 — `Vehicle support` | `checkDoorPositionCapabilities`
| | 현재 상태 조회 — `Current value` | `getCurrentDoorPosition`
| | 변경 알림 구독 — `Live updates` | `registerDoorPosition`
| | 상태 변경 요청 — `Change value` | `setDoorPosition`
| | 변경 알림 해제 — `Live updates` | `unregisterDoorPosition`

### 지원 범위 확인 — Vehicle support​

기능에 진입하면 지원 범위를 확인하고, 확인에 성공하면 현재값을 한 번 자동으로 조회합니다.

`Vehicle support`에서 지원 상태와 `Selected area range`를 확인하세요. Door Position 화면 예시의 범위는 `0..1`입니다. 다른 환경에서도 같은 범위라고 가정하지 말고 현재 선택한 영역의 결과를 사용합니다.

지원 확인이 실패하거나 해당 영역의 범위를 알 수 없으면 변경 요청을 진행하지 말고 `API activity`의 오류를 확인하세요. `Unsupported`에는 실제 미지원뿐 아니라 지원 확인 요청의 실패도 포함될 수 있습니다. 다시 확인하려면 이 영역의 `Check support` 버튼을 사용합니다.

### 현재 상태 조회 — Current value​

`Current value`의 `Area`가 `Row 1 Left · ROW_1_LEFT`인지 확인합니다. 표시된 값은 마지막 조회 또는 변경 알림으로 받은 값입니다.

다른 영역을 선택하거나 값을 다시 확인하려면 `Refresh` 버튼을 누릅니다. `API activity`에서 `getCurrentDoorPosition`의 응답을 함께 확인할 수 있습니다.

`null` 또는 `unavailable`은 사용할 수 있는 현재값을 받지 못했음을 나타냅니다. 오류 메시지가 있는 경우는 단순히 값이 없는 경우와 구분해 문제 해결을 확인하세요.

### 실행 결과 살펴보기 — API activity​

각 영역에서 수행한 작업은 화면 아래의 `API activity`에 API 이름과 결과로 표시됩니다. `Expand` 버튼을 누르면 긴 메서드 이름과 응답을 펼쳐 볼 수 있습니다.

[이미지: 펼쳐진 API activity에서 Door Position의 지원 범위 확인과 현재값 조회 결과를 확인하는 화면.]
`Complete`의 의미는 작업에 따라 다릅니다. 조회·변경 요청은 결과 콜백을 받은 상태이고, Listener 등록·해제는 SDK 호출이 예외 없이 반환된 상태입니다. 등록·해제의 표시를 Service 측 완료 응답으로 해석하지 않습니다.

### 변경 알림 구독 — Live updates​

`Live updates`에서 `Start updates` 버튼을 누릅니다. 앱의 구독 상태는 `Receiving vehicle updates`로 바뀝니다.

실제 알림을 받으면 `API activity`의 `registerDoorPosition` 응답에 `Door update: <value>`가 표시되고 현재값도 갱신됩니다. 구독 상태 표시와 실제 알림 수신 여부는 구분해서 확인하세요.

### 상태 변경 요청 — Change value​

`Vehicle support`에서 선택한 영역의 지원 범위와 쓰기 접근 가능 여부를 확인한 뒤, `Change value`에서 요청할 값을 선택합니다. 범위가 `0..1`인 Door Position 예제에서는 `Closed (0)` 또는 `Open (1)`을 선택할 수 있습니다.

값을 선택하는 단계는 입력값을 준비하는 단계입니다. `Apply change` 버튼을 누르면 선택한 영역으로 변경 요청을 전송합니다. 별도 확인 창은 표시되지 않습니다.

`API activity`의 `setDoorPosition` 결과는 변경 요청의 완료 콜백입니다. 이 콜백에 표시된 값은 요청한 값이며, 새로 조회한 차량 상태가 아닙니다.

### 변경 결과 확인​

변경 요청 완료만으로 실제 값이 바뀌었다고 판단하지 않습니다. `Current value`에서 `Refresh` 버튼으로 다시 조회하거나, 구독 중 수신한 변경 알림의 값을 확인합니다.

Sample App은 변경 요청이 완료됐다는 이유만으로 현재값을 바꾸거나 자동 재조회하지 않습니다. 현재값은 조회 결과 또는 Listener 알림으로 갱신됩니다. 요청값과 조회값이 다르면 그 차이를 그대로 확인하고, 변경이 반영됐다고 단정하지 않습니다.

### 변경 알림 해제​

다음 상황에서는 사용하던 구독을 정리합니다.

- 해당 기능의 변경 알림 확인을 마쳤을 때

- 다른 기능이나 영역으로 실습 대상을 바꾸기 전

- SDK를 사용하는 화면이나 객체의 사용을 끝낼 때

Sample App에서는 등록했던 영역을 선택한 상태에서 `Live updates`의 `Stop updates` 버튼을 누릅니다. `Updates are stopped`와 `API activity`의 해제 호출 결과를 확인한 뒤 목록으로 돌아갑니다.

화면 이동과 구독의 관계
왼쪽 화살표로 돌아가거나 같은 분류의 다른 기능을 선택하는 것만으로는 구독이 해제되지 않습니다. Area 선택만 바꾸는 경우도 마찬가지입니다. 등록한 영역과 다른 영역에서 해제를 요청하면 등록 당시 영역을 선택하라는 오류가 발생할 수 있습니다.다른 영역으로 `Start updates`를 실행하면 기존 Door Position 구독을 해제한 뒤 새 영역을 등록합니다. 분류를 바꿀 때와 ViewModel이 종료될 때도 정리 코드가 실행되지만, 실습에서는 사용을 마친 구독을 명시적으로 해제하세요.

## 내 앱에 적용하기​

Sample App에서 확인한 차량 기능을 직접 개발하는 앱에 적용해 보세요. 필요한 개발 단계에 따라 다음 문서를 참고하세요.

| | 개발 단계 | 참고 문서
| | Maven 저장소 설정과 SDK 의존성 추가 | Vehicle SDK 연동 가이드
| | 사용하는 API의 권한 확인과 Manifest 선언 | 권한 선언 가이드
| | SDK 초기화, 도메인 객체 획득과 리소스 해제 | 도메인 객체 획득
| | 지원 범위 확인, 조회와 변경 API 사용 | 네 가지 API 타입
| | 변경 알림 등록과 해제 | Callback 가이드
| | 기능별 API 명세 확인 | Vehicle SDK API 상세 정보

제품 앱에서는 Door Position처럼 필요한 typed API를 직접 사용하고, 실제로 사용하는 API의 최소 권한만 선언하세요. Sample App의 공통 탐색기나 전체 권한 목록을 그대로 복사하지 않습니다. Listener는 등록했던 동일 객체와 area로 해제하고, SDK 사용이 끝나면 `Vehicle.release()`로 리소스를 정리하세요.

## 문제 해결​

`API activity`의 메서드 이름과 오류 메시지를 기준으로 원인을 확인합니다. `Unsupported`나 `Failed`라는 표시만으로 권한 문제, 연결 문제, 영역 미지원을 단정하지 않습니다.

### 권한 확인 위치​

권한은 Sample App 프로젝트의 **`app/src/main/AndroidManifest.xml`**에 선언합니다. Door Position의 지원 확인·조회·Listener에는 `CAR_DOORS`, 변경 요청에는 `CONTROL_CAR_DOORS`가 필요합니다.

이 권한은 일반적인 Android 위험 권한처럼 실행 중 승인 창을 띄우는 방식이 아닙니다. Manifest 선언을 확인하고, 사용할 기능의 접근 방식과 영역 지원 여부도 함께 확인하세요. 선언 방법은 권한 선언 가이드를, Sample App의 전체 목록은 Sample App 전체 public permission을 참고하세요.

| | 증상 | 확인할 내용과 다음 동작
| | `Initialization failed` 또는 Service 연결 오류 | 전용 AVD와 Vehicle Service 설치 상태를 확인합니다. SDK 초기화 상태 표시만으로 연결 성공을 판단하지 않습니다.
| | `Vehicle support`가 `Unsupported` | 실제 미지원이거나 지원 확인 요청 실패일 수 있습니다. `API activity`의 오류와 권한·연결 상태를 확인한 뒤 `Check support` 버튼으로 다시 확인합니다.
| | 현재값이 `null` 또는 `unavailable` | 사용할 수 있는 값을 받지 못한 상태입니다. 지원 여부와 선택 영역을 확인한 뒤 다시 조회합니다. 이 표시만으로 권한 누락이라고 판단하지 않습니다.
| | 현재값 조회가 `Failed` | 조회 API의 오류 메시지, 읽기 권한, 선택 영역, Service 상태를 확인합니다.
| | 변경 요청 거부 또는 범위 오류 | 쓰기 권한, 쓰기 접근 가능 여부, 선택 영역의 값 범위를 확인합니다.
| | 변경 요청은 완료됐지만 조회값이 다름 | 요청 완료와 실제 상태는 다릅니다. `Current value`의 재조회 결과와 수신한 변경 알림을 확인합니다.
| | 구독했지만 알림이 없음 | 등록한 영역과 오류 메시지를 확인합니다. 구독 상태 표시만으로 알림 수신을 판단하지 않습니다.
| | 구독 해제 시 등록 영역 오류 | 등록했던 영역으로 선택을 되돌린 뒤 `Stop updates` 버튼을 누릅니다. 제품 코드에서는 등록에 사용한 동일 Listener와 area로 해제합니다.

### 기능은 Supported인데 특정 영역의 조회가 실패하는 경우​

다음 Door Lock 화면은 기능 지원 확인 뒤 선택한 `ROW_1_LEFT` 영역의 조회가 실패한 예입니다. 오류에 `area ID: 0x1 not supported`가 표시됩니다. 기능 전체의 지원 상태와 특정 영역의 사용 가능 여부를 구분해야 합니다.

[이미지: Door Lock의 Supported 표시와 함께 선택 영역 미지원으로 조회가 실패한 오류 메시지가 표시되는 화면.]
이 이미지는 권한 오류나 정상 조회 성공의 예가 아닙니다. `Change value`에 보이는 ON 값도 현재 잠금 상태를 조회한 결과가 아니라 입력 중인 변경값입니다.

## 참고 자료​

### Sample App 전체 public permission​

Sample App은 여러 차량 기능을 제공하므로 Door Position 예제보다 넓은 권한을 선언합니다. 아래 목록은 이 가이드의 Sample App Manifest 기준입니다.

전체 public permission 보기`<!-- Read / state -->

<uses-permission android:name="pleos.car.permission.CAR_CLIMATE" />

<uses-permission android:name="pleos.car.permission.CAR_CONNECT_VENDOR_CONTROL" />

<uses-permission android:name="pleos.car.permission.CAR_DOORS" />

<uses-permission android:name="pleos.car.permission.CAR_DRIVE" />

<uses-permission android:name="pleos.car.permission.CAR_ENERGY" />

<uses-permission android:name="pleos.car.permission.CAR_INFO" />

<uses-permission android:name="pleos.car.permission.CAR_LIGHTS" />

<uses-permission android:name="pleos.car.permission.CAR_MILEAGE" />

<uses-permission android:name="pleos.car.permission.CAR_MIRRORS" />

<uses-permission android:name="pleos.car.permission.CAR_POWERTRAIN" />

<uses-permission android:name="pleos.car.permission.CAR_SAFETY" />

<uses-permission android:name="pleos.car.permission.CAR_SEATS" />

<uses-permission android:name="pleos.car.permission.CAR_SPEED" />

<uses-permission android:name="pleos.car.permission.CAR_TOLL" />

<uses-permission android:name="pleos.car.permission.CAR_TIRES" />

<uses-permission android:name="pleos.car.permission.CAR_WINDOWS" />

<!-- Control -->

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_CLIMATE" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_DOORS" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_DRIVE" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_ENERGY" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_INFO" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_LIGHTS" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_MIRRORS" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_SAFETY" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_SEATS" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_TOLL" />

<uses-permission android:name="pleos.car.permission.CONTROL_CAR_WINDOWS" />

<uses-permission android:name="pleos.car.permission.READ_CAR_DISPLAY_UNITS" />

<uses-permission android:name="pleos.car.permission.READ_CAR_STEERING" />

<uses-permission android:name="pleos.car.permission.READ_ADAS_STATES" />

<uses-permission android:name="pleos.car.permission.READ_WINDSHIELD_WIPERS" />

<uses-permission android:name="pleos.car.permission.CONTROL_WINDSHIELD_WIPERS" />

`

- 이 목록은 현재 Sample App release Manifest를 반영합니다. 이후 release에서는 해당 Manifest를 source of truth로 확인하세요.

- `PRIVATE_*` permission은 예제에 포함하지 않습니다.

- 제품 앱은 실제로 사용하는 typed API의 최소 permission만 선언하세요.

### 관련 문서​

- Vehicle SDK 연동 가이드

- Vehicle SDK API 호출 가이드

- Vehicle SDK API 상세 정보

- API 호환성 및 가용성

- Pleos Connect Emulator 설치 및 실행
