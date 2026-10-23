> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/ccp-rotary-controller-development (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# CCP 개발 가이드
CCP(Center Control Panel)는 차량 내 물리 버튼 및 하드키를 통해 시스템 기능을 제어하는 입력 장치를 말합니다. CCP 입력 장치에는 Rotary Controller, 다이얼, 물리 버튼 등이 포함됩니다. CCP Back 하드키는 현재 화면의 이전 단계로 이동하거나, 더 이상 이전 화면이 없는 경우 앱 또는 시스템 레벨의 Back 동작을 수행하는 물리 버튼입니다.

## CCP 지원 정책​

Pleos Connect 앱은 아래와 같이 분류되며, 분류별로 CCP 지원 요건이 다르게 적용됩니다.

- User-installed 앱 (사용자 설치 앱): Pleos App Market을 통해 배포되며 사용자가 차량에 설치하는 앱입니다.

- Pre-installed 앱 (기본 탑재 앱): 차량 출시 시 기본으로 탑재되어 있는 앱입니다.

- System 앱 (시스템 앱): 플랫폼 또는 OEM이 시스템 이미지에 포함하여 제공하며, 사용자가 설치·삭제할 수 없는 앱입니다.

### User-installed 앱​

User-installed 앱의 경우 CCP 지원 여부는 개발사가 선택할 수 있으며, CCP 미지원 앱도 Pleos App Market 등록 및 배포에 제한이 없습니다. 다만 CCP 미지원 앱은 필수 조작을 터치만으로 완결할 수 있어야 하며, 이는 CCP 미지원 환경에서 사용 불가 상태가 발생하지 않도록 하기 위한 요건입니다.

### Pre-installed 앱​

Pre-installed 앱은 필수적으로 CCP를 지원해야 합니다. Pleos Connect CCP UX 가이드라인에 따라 CCP 연동을 구현합니다.

Pre-installed 앱 CCP 적용 정책

#### Pre-installed 앱 CCP 정책​

- Pre-installed 앱 계약서에 "CCP 지원"을 의무 조건으로 명시합니다.

- 앱은 초기 릴리즈 시점부터 CCP 기반 조작(회전, 클릭, 방향 이동 등)을 지원해야 합니다.

- CCP 입력과 화면 포커스 이동은 Pleos Connect CCP UX 가이드라인을 준수해야 합니다.

- 향후 업데이트에서 CCP 기능이 누락되거나 비활성화되는 것을 허용하지 않습니다.

- CCP 미지원 또는 불완전 지원 시 Pre-installed 앱 승인 불가 처리됩니다.

#### Pre-installed 앱 CCP 적용 예외 정책​
Pre-installed 앱이 다음 조건 중 하나 이상을 충족하는 경우 CCP 지원을 필수로 요구하지 않습니다. 이 경우 해당 내용은 계약서에 명시되어야 합니다.

- 앱의 기능이 정적 콘텐츠 중심으로 되어 있어 CCP 입력이 불필요한 경우

- 화면 이동이나 포커스 기반 조작 요구가 없음

- 단순 정보 표시형 앱(예: 고정 정보 패널, 단일 화면 구조 등)

- 브라우저 앱 또는 특정 미디어 앱처럼 CCP 구현이 기술적으로 제한적인 경우

- WebView 기반 포커스 조작 제약

- Pleos Connect CCP UX 가이드라인에서 CCP 지원을 권고 수준으로 규정한 영역

- 게임처럼 CCP 사용이 UX나 안전성 측면에서 적합하지 않은 경우

### 게임 앱 CCP 지원 정책​

Pre-installed 앱은 원칙적으로 CCP 지원이 필수이나, 게임 앱은 특성상 CCP 지원이 의미 없거나 불가능한 경우 예외로 인정할 수 있습니다.

### 브라우저 앱 CCP 지원 정책​

#### 사용성 보장 요건​

Pre-installed 브라우저 앱은 CCP가 있는 차량에서 사용성을 보장하기 위해 다음을 준수해야 합니다.

- CCP 회전 → 스크롤(상/하)

- CCP 클릭 → 링크/버튼 선택

- CCP 좌/우 이동 → 포커스 이동 (적용 범위: 주소창, 북마크/탭/홈, 뒤로/앞으로, 설정, 기본 메뉴)

#### CCP 지원 영역​

Pre-installed 브라우저 앱은 CCP 지원을 브라우저 UI 영역에 한정하며, 웹페이지 내부 콘텐츠의 CCP 포커스는 전면 보장을 요구하지 않습니다. HTML 구조에 따라 포커스가 맞지 않거나 복잡한 웹페이지에서 예측 불가 동작이 발생할 수 있기 때문입니다.

### CCP 미지원 선언 방법​

CCP를 지원하지 않는 앱은 `<application>` 요소에 다음 메타데이터를 추가하여 CCP 미지원 앱임을 선언합니다.

AndroidManifest.xml
`  <application

      ...>

      <meta-data

          android:name="com.hmg.rotary.ROTARY_SUPPORTED"

          android:value="false" />

  </application>

`

## CCP Back 하드키 입력 시 앱 숨김 처리 정책 (필수)​

앱 내 최상단 포커스(더 이상 이전 화면으로 이동할 수 없는 상태)에서 CCP Back 하드키가 입력되면 앱을 종료하지 않고 숨김(Hide) 처리해야 합니다. 숨김 이후에도 미디어 사운드 출력 등 백그라운드에서 유지되어야 하는 기능은 계속 동작해야 합니다. 백그라운드 동작이 허용된 기능은 해당 기능의 서비스 생명주기와 오디오 포커스 정책에 따라 계속 동작할 수 있습니다.

앱 내 하위 화면 또는 팝업이 있는 경우에는 기존 Back 정책에 따라 이전 화면 이동 또는 팝업 종료를 수행합니다.

### 앱 숨김 처리 구현 방법​

CCP Back 하드키 입력을 처리하기 전에 다음 플랫폼 동작을 확인해야 합니다.

- CCP Back 하드키 입력이 Android 표준 Back 이벤트로 전달되는지 확인합니다.

- 표준 Back 이벤트로 전달되는 경우 `OnBackInvokedDispatcher` 또는 플랫폼에서 지원하는 기존 Back API 중 적절한 API를 사용합니다.

- 팝업, 하위 화면, 최상위 화면을 구분하여 하위 화면에서는 이전 화면 이동 또는 팝업 종료를 수행하고, 최상위 화면에서만 앱을 숨깁니다.

확인 결과 CCP Back 하드키 입력이 Android 표준 Back 이벤트로 전달된다면, 다음과 같이 앱을 숨김 처리합니다

- 앱 숨김 처리는 Android Framework에서 제공하는 `moveTaskToBack(boolean)` API를 사용하여 구현합니다.

- 앱 내 최상단 포커스 상태에서 CCP Back 하드키 입력 시 `moveTaskToBack(true)`를 호출하여 Task를 백그라운드로 이동합니다.

- `finish()` 또는 `finishAffinity()`를 통한 Activity 종료는 수행하지 않습니다.

- Task를 백그라운드로 이동한 경우에도 앱 프로세스가 종료될 수 있으므로 필요한 상태는 별도로 저장하고 복원해야 합니다.

최상단 포커스에서 CCP Back 하드키 입력 시 앱이 종료되거나 `moveTaskToBack(true)` 기반 숨김이 구현되지 않은 경우 심사 반려 대상이 될 수 있습니다.

## CCP 심사 정책​

CCP 지원이 필수인 Pre-installed 앱은 Pleos App Market 등록 전 CCP 심사를 거칩니다. 아래는 심사 시 확인하는 항목 예시와 결과 기준입니다.

### 심사 항목 예시​

심사 시 다음 항목을 확인합니다.

- 포커스 이동이 모든 주요 UI 구성요소에서 정상 동작하는지

- CCP 회전 시 리스트/메뉴 스크롤이 자연스러운지

- CCP 클릭 시 선택/확인 입력이 정상 수행되는지

- 역방향 입력(뒤로, 취소)이 정상 처리되는지

- 터치 전용 UI만 있어 CCP 조작이 불가한 영역이 없는지

- CCP 입력 시 안전 관련 동작(운전 중 차단 요소 등)이 준수되는지

### 심사 결과 기준​

- CCP 테스트에 합격하면 Pre-installed 앱으로 등록할 수 있습니다.

- CCP 테스트에 불합격한 경우 수정 요청 항목을 반영한 뒤 재심사를 요청합니다.

## Pleos Connect CCP UX 가이드라인​

Pleos Connect CCP UX Guideline

CCP 정책 준수 유의사항

- CCP 지원 정책은 AAOS 버전, 차량 플랫폼, 차종별 사양에 따라 업데이트될 수 있습니다.

- CCP는 차량 안전성과 직결되므로 HMI/안전 기준 미준수 시 배포가 제한되거나 기본 탑재 앱에서 제외될 수 있습니다.

- Pleos Connect CCP UX 가이드라인이 업데이트 될 경우, Pre-installed 앱 개발사에게 앱 업데이트를 요청할 수 있습니다.
