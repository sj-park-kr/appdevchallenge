> 출처: https://document.pleos.ai/docs/connect/guide/docs-design/Experiences/gleo-ai (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Gleo AI
Gleo AI는 사용자의 편리한 이동 경험을 챙겨주는 개인형 모빌리티 어시스턴트입니다.
사용자가 놓치면 안 되는 중요 사항들을 가이드 하며, 대화를 통해 사용자에게 필요한 답변을 제공하거나 기능을 실행합니다.

## Branding​

### Gleo (글레오)​

Gleo는 16세기 인류 최초로 새로운 위성을 관측해 우주과학사의 전환점(태양 중심설)을 만든 갈릴레오를 모티브로 한 이름으로 기존 레거시를 넘어 sdv를 통해 새로운 모빌리티의 패러다임을 만들고 있는 42dot을 표현합니다.

### Brand Narrative​

갈릴레이는 목성과 위성의 움직임을 관찰하여 지동설을 입증했으며, 이를 통해 태양을 중심으로 한 행성의 공전을 밝혔습니다. 태양의 주위를 도는 공전의 움직임에서 착안하여 각 시간대에 따라 변하는 빛의 모습을 chrome과 logo의 메타포로 반영했습니다.

### Gleo Logo​

### Gleo Chrome​

Gleo brand concept에 따라 Gleo와 사용자가 발화하는 status별 chrome이 디자인되었습니다. chrome은 대화의 상태를 빛으로 구분하여 표현합니다.

## Status​

- 음성인식 기반의 대화는 사용자의 발화를 들을 수 있는 상태와 Gleo가 응답하는 상태를 명확히 구분되어야 합니다.

- 이에 음성인식 및 응답 단계들을 구분하여 정의하고 있으며, 각 단계별로 사용자가 사용할 수 있는 상태가 명확히 구분됩니다.

- Gleo와 사용자간의 대화 상태를 아래와 같이 구분합니다.

- chrome은 status를 시각적으로 구분해주는 역할을 합니다.

| | Status | Description
| | Sleep | 대화 중이지 않고, Gleo가 대기 중인 상태
| | Listening_Passive | 음성 입력을 받기 시작하였으며, 사용자의 발화가 입력되기 전까지 대기 상태.
음성 미입력 2초 후 “운전석에서 듣는 중..."와 같이 음성 입력 좌석 메시지를 표시.
| | Listening_Active | 사용자 발화하고 있으며, 음성 입력을 받는 중인 상태
| | Thinking | 사용자의 발화가 종료되고, 입력된 음성 데이터를 처리 중인 상태
| | Asking | 사용자의 발화에 대해 응답을 하기 전에 추가적인 입력을 받기 위해 되묻는 상태
| | Speaking | 입력된 사용자 발화에 대한 최종 응답을 제공하는 상태
| | Standby | 진행중이던 대화를 종료 후 Sleep으로 가기 직전, 혹시나 대화를 이어나갈 수 있는 가능성을 위해 응답 화면이 있을 경우 5초(응답 화면이 없을 경우 0초) 동안 응답 화면을 유지하는 대기상태로 제공되며, 대기시간 이후 자동으로 Sleep 되며 화면은 내려갑니다.

### Chrome​

Chrome은 lottie file로 제작되어 status별 애니메이션되며 노출됩니다.

## Response Display​

### Elevation​

- Gleo는 OS layer 상 GNB 다음 하위 layer에 위치합니다.

- Gleo와 대화는 1) 사용자가 PTT나 wake word 등을 통해 대화를 진행하겠다는 의사를 밝히거나 2) proactive suggestion을 통해 사용자에게 필요한 제안을 전달하는 경우 시작됩니다.

- Gleo는 상위 layer에 위치하기 때문에 Gleo 영역이 표시되면 다른 앱 뷰를 일시적으로 가릴 수 있습니다.

- Elevation과 별개로 특정 조건이나 외부 이벤트에 따라 Gleo가 닫힐 수 있습니다.

### Layout​

- Chrome: chrome 표시 상태로 대화 상태를 구분할 수 있습니다.

- Bubble: 사용자 발화를 표시하거나 Gleo 응답을 표시합니다.

- Gleo Panel:

- Template: 대화 중 필요한 콘텐츠를 표시하는 영역입니다. list, card 타입이 있습니다.

- Chips: 대화 상황에 따라 필요한 선택지를 추가 표시합니다.

#### Speaker Bubble + Panel​

#### Panel​

#### Event Conflict​

## Panel Interaction​

### Touch Interaction​

- LIST의 list item을 touch하면 지정된 기능을 실행합니다.

- Chips의 버튼을 touch하면 지정된 기능을 실행합니다. ex. 그래/아니. 답장해줘. 다음 메시지 읽어줘

- Panel을 상단으로 touch 드래그, Panel 구성 요소 이외 영역을 Touch하면 대화를 종료합니다.

- Panel을 하단으로 touch 드래그하면 Panel 창이 Gleo AI App으로 전환됩니다.

### Center Control Panel(CCP)​

- CCP는 차량 IVI(차량용 인포테인먼트 시스템) 내에서 메뉴 탐색과 선택을 지원하는 조그 다이얼 형태의 하드웨어 조작 장치입니다.

- 사용자는 Gleo와의 대화 중이거나 Gleo AI 앱을 사용할 때 CCP를 통해 메뉴를 탐색하고 항목을 선택할 수 있습니다.

#### Interaction​

- CCP 사용이 가능한 상황에서는 화면에 CCP focus가 표시됩니다.

- 이 focus는 현재 rotate, tilt, push 조작이 적용되는 대상을 나타냅니다.

#### CCP Focus in Conversation​

- Gleo와의 대화 상황은 OS CCP 정책상 ‘팝업’ 상황과 동일하게 처리됩니다. 예를 들어, 이때는 tilt 조작이 제한되며, Gleo 화면이 다른 앱보다 우선적으로 포커스를 받습니다.

- CCP focus는 화면에 패널이 있고, 그 안에 터치 가능한 선택 대상이 있는 경우에만 표시됩니다.

#### CCP Focus in Gleo AI App​

- Gleo AI 앱은 기본적으로 OS의 CCP 정책을 따릅니다.

- 앱 화면은 크게 상단 타이틀 영역, 하단 히스토리 영역(기본 영역)으로 나뉘며, 가장 최근의 대화 버블이 기본 포커스(default focus)로 설정됩니다.

## Panel Template​

Gleo는 사용자의 질문에 응답 시 정의된 template별로 panel 응답이 내려오며, template은 display template과 하단에 chips로 구성될 수 있습니다.

### Multi Screen Size​

- 스크린 사이즈별로 아래와 같이 표시될 수 있습니다.

- wide의 경우 사용자의 발화 좌석을 인식하여 가까운 위치에 Gleo가 표시됩니다.

#### Standard 14.6​

#### Standard 17​

#### Wide Standard​

#### Wide Extended​

#### Waterfall​
