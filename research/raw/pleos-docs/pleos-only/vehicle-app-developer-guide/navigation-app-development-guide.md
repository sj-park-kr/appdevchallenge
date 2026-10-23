> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/navigation-app-development-guide (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Maps/Navigation 앱 개발 가이드

## Maps/Navigation 앱 기본 정책​

Pleos Connect의 Maps/Navigation 앱을 개발할 때 반영해야 할 기본 정책은 다음과 같습니다.

- 운전자 안전 최우선

- 단일 경로 · 단일 내비게이션 원칙

- 주행 중 조작 최소화

- 카테고리 기반 기능 제한

- Pleos Connect 플랫폼 API와 AAOS 표준 API를 사용하고 UX 가이드를 준수

## Maps/Navigation 앱 카테고리 선언​

모든 앱은 개발 및 등록 시 앱 카테고리를 필수적으로 선언해야 합니다.

### 카테고리 선언​

내비컨테이너(내비앱 고정 표시영역)를 사용하려면 Home screen에서 실행 중인 앱이 Navigation 앱인지 알 수 있어야 하며, 앱 카테고리 정보로 이를 확인합니다. 따라서 앱 개발자는 매니페스트 파일에 인텐트 필터로 앱 카테고리를 선언합니다.

AndroidManifest.xml
`<intent-filter>

    <action android:name="android.intent.action.MAIN" />

    <category android:name="android.intent.category.APP_MAPS" />

</intent-filter>

`

### 앱 등록 시 카테고리 지정​

매니페스트 파일에 선언된 앱 카테고리를 Pleos App Market 등록 시에도 반영하여야 합니다.

### 카테고리 불일치 정책​

- 선언된 카테고리와 실제 기능 불일치 시 심사에서 즉시 반려됩니다.

- 만약 앱 심사 중 기능이 변경된다면 반드시 재심사를 요청해야 합니다.

## Pleos Connect 경로 정책​

### 단일 경로 정책 (Route Exclusivity Policy)​

-
AAOS 환경에서는 하나의 Navigation 앱만 Active Route 상태를 가질 수 있기 때문에 복수 Navigation 앱의 음성 안내·경로 출력은 허용하지 않습니다.

| | 상태 | 설명 | 허용 범위
| | Active Route | 경로 안내 | 음성·TBT 허용
| | Inactive Route | 지도 탐색 상태 | 안내 금지
| | Background | 백그라운드 | 모든 안내 금지

위험
Inactive Route / Background 상태에서 경로 안내 제공 시 정책 위반에 해당합니다. 단, OEM Navigation 앱의 경우 안전규제 대응을 위해서 안전 운행 정보가 제공될 수 있습니다.

-
이러한 경로 배타 정책은 Navigation 앱 간에도 적용되지만 Navigation 앱과 Phone Projection 간에도 적용됩니다.

-
단일 경로 정책을 준수하려면 AAOS의 앱 포커스·경로 소유권을 다루는 다음 API를 사용합니다.

- android.car 참조를 통한 직접 CarAppFocusManager 핸들링

- requestAppFocus @ CarAppFocusManager  |  API reference  |  Android Developers

- CarAppFocusManager.OnAppFocusChangedListener  |  API reference  |  Android Developers

### 경로 전환 정책​

Pleos Connect에서는 다음 두 가지 경우에만 Navigation 앱의 경로 전환을 허용합니다.

- 사용자의 명시적 선택에 의한 전환

- 기존 Navigation 앱 오류 또는 종료에 의한 전환

Navigation 앱은 경로 전환 시 다음을 반드시 구현해야 합니다.

- 경로 전환 시 사용자가 인지할 수 있는 안내를 제공합니다.

- 사용자 동의 없이 자동으로 전환하지 않습니다.

## 주행 중 조작 최소화 구현​

주행 중 Navigation 앱에서 조작 금지 처리해야 하거나 허용 가능한 항목은 다음과 같습니다.

| | 주행 중 조작 금지 항목 | 주행 중 허용 항목
| | 복잡한 메뉴 탐색 (3 depth 초과)
 긴 리스트 스크롤
 영상, 애니메이션, 광고 노출 | 음성 입력
 단일 터치 기반 주요 기능
 즐겨찾기 목적지 선택

## UX 심사 가이드​

Navigation 앱은 Pleos App Market 등록 시 다음 UX 요건을 충족해야 합니다.

- Pleos Connect 플랫폼 및 AAOS UX 가이드 준수

- 터치 영역 최소 크기 충족

- 주행 핵심 정보 상시 노출

- 주행 중 전체 화면 팝업 금지

## 시스템 연동 및 권한 정책​

### 시스템 연동​

- Pleos Connect 및 AAOS 공식 API 사용을 권장합니다.

- 비공식 센서/API 사용은 금지되어 있습니다.

### 권한 정책​

Navigation 앱은 필요한 최소 권한만 요청해야 하며, 다음 정책을 준수합니다.

- 위치 권한: 필수

- 마이크: 음성 입력 시에만 허용

- 불필요한 권한 요청 시 심사에서 반려됩니다.

## 성능·안정성 심사 기준​

Navigation 앱은 다음 성능·안정성 요건을 충족해야 합니다.

- 앱 실행·전환 시 지연을 최소화해야 합니다.

- 장시간 주행 시에도 안정적으로 동작해야 합니다.

- Crash, freeze 발생 시 심사에서 반려됩니다.

## 보안 및 개인정보 정책​

Navigation 앱은 다음 보안·개인정보 정책을 준수해야 합니다.

- 위치 데이터는 암호화하여 처리해야 합니다.

- HTTPS 통신을 사용해야 합니다.

- 개인정보 처리방침을 반드시 제공해야 합니다.

- 불필요한 위치 데이터 저장은 금지됩니다.

## 금지 정책 (Immediate Reject)​

다음에 해당하면 심사에서 즉시 반려됩니다.

- 주행 중 광고 노출

- 영상·게임 요소 포함

- 복수 내비 동시 경로 안내

- 카테고리 위반 기능 제공

- OEM/AAOS 정책 위반
