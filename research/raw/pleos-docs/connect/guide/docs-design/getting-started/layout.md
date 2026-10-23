> 출처: https://document.pleos.ai/docs/connect/guide/docs-design/getting-started/layout (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Display Layout

## 화면 구성 요소 및 레이어​

### 화면 구성 요소​

Pleos Connect 화면은 다음과 같은 시스템 UI 요소와 애플리케이션 윈도로 구성됩니다.

-
Status bar: Driving status, Gleo AI와 검색, 시계, 네트워크 상태, 마이크 상태 표시, 알림 센터 및 프로필 선택 등 System status를 포함합니다.

-
Driving view(드라이빙뷰): Driving view는 Telltale, 속도, 차량의 상태 등 주행/안전 정보를 포함합니다.

-
Global Navigation Bar(GNB) : App library, 즐겨찾는 앱, 공조(Climate) 컨트롤 등을 포함합니다.

-
Application window : 실행 중인 애플리케이션이 표시되는 영역으로 1개, 혹은 2개의 앱을 노출할 수 있습니다. 따라서 가로 전용 게임 등 한 가지 모드로만 실행 가능한 애플리케이션을 제외한 모든 앱은 Landscape, Portrait 두 가지 레이아웃에 적절하게 조절되도록 설계해야 합니다.

### 화면 레이어​

상단의 상태 표시줄, GNB의 App library, 공조 등 패널과 키보드 등 System UI는 앱보다 상위 레이어에 위치하므로, 사용자가 해당 기능을 사용할 경우 일시적으로 애플리케이션 윈도우를 가릴 수 있습니다.

## 화면 유형​

Pleos Connect의 디스플레이는 Standard, Wide 2가지 타입으로 나누어져 있습니다. 기존의 Connect-L은 Connect-S로 재분류되었습니다.

- Connect-S: OS 기본 크기로 제공되는 디스플레이이며, S는 Standard의 줄임말입니다. 17인치, 14.6인치, 12.9인치(Connect-L) 세 가지 크기를 제공합니다.

- Connect-W: Wide 디스플레이로, Connect-S보다 가로가 긴 형태이며 주로 고급 차종에 탑재됩니다. 차량 상태에 따라 세로 높이가 확장될 수 있으며, 이 확장형이 Connect-W-Extended입니다.

- Connect-WF: Waterfall이라 불리며, Wide 대비 작은 해상도의 디스플레이입니다. 크기는 작지만 차량 내 핵심 기능을 제공합니다.
