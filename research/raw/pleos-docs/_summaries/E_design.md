# Pleos Connect UI 디자인 가이드 정리 (우리 앱: 법인 차량 자동 운행기록부)

근거 경로 기준: `research/raw/pleos-docs/connect/guide/` (이하 생략, 예: `docs-design/...`)
원문은 HTML에서 본문만 추출한 것이라 표·이미지 안의 수치가 빠진 문서가 많다. 빠진 항목은 "문서에 없음"으로 표기했다.

---

## 1. 주행을 위한 디자인 원칙

원문 (`docs-design/Introduction/designing-apps-for-driving.md`, `docs-design/Introduction/intro.md` 동일 내용):
- **Easy & Safe**: "운전 중 시각적, 인지적 부담을 최소화하여, 쉽고 명확한 정보 전달"
- "운전 중 동영상, 애니메이션 이미지, 텍스트 자동 스크롤과 같이 운전자의 시선을 유도하면 안 됩니다."
- "앱 조작은 한 손만으로도 가능해야 하며, 양손을 모두 사용하게 해서는 안 됩니다. 단순한 조작만을 요구해야 합니다. 운전자의 손이나 발을 움직이는 동작을 유도해서는 안 됩니다."
- **Glanceability**: "운전자는 짧은 시간(1~2초) 내에 정보를 파악해야 하므로, 핵심 정보만 노출하고 불필요한 요소는 배제합니다."
- "사용자 입력 후 시스템 응답 시간이 0.25초를 초과하지 않아야 합니다. 응답이 지연되거나 시간이 필요한 경우에는 시각적으로 응답 중인 상태를 알리세요."
- 텍스트 수치 (`docs-design/Introduction/intro.md`):
  - "한 줄의 텍스트는 80자(영문 기준) 이하", "문장 또는 단락은 텍스트 3줄을 넘지 않아야 합니다."
  - "장문의 텍스트는 최소화하고, 단순한 아이콘과 짧은 문장으로 전달합니다."
  - "중요 정보(예: 속도, 내비게이션 안내, 경고 메시지 등)를 표시하는 기본 텍스트는 높이 5 mm 이상, 보조 텍스트는 최소 3 mm 이상"
  - 대비: "아이콘, 텍스트 및 기타 이미지의 대비율이 4.5:1 이상"
  - "중요한 정보는 강한 대비로 표현하되, 과도한 색상 사용은 피합니다."
  - 알림: "앱은 운전자의 필요와 관련된 경우에만 알림을 표시해야 합니다." / 알림으로 광고 표시 금지
- 주행 상태 (`docs-design/Experiences/driving-view.md`는 주행 화면 구성만 설명, 상태 정의는 `glossary.md`):
  - Driving state는 CarDrivingStateService가 판단: parked(기어 PARK), idling(비주차·속도 0), moving(비주차·속도 非0), unknown
  - Distraction Optimized: "주행 중 운전자 주의 분산을 줄이기 위해 앱 조작을 제한하는 정책", 앱의 distractionOptimized 선언에 따라 제한 (`glossary.md`)
  - CarUxRestrictions: idling·moving에서 requiresDistractionOptimization 등을 적용해 앱·설정·프로필 조작을 제한 (`glossary.md`)
- Gleo AI 문서 (`docs-design/Experiences/gleo-ai.md`): 음성 대화 상태(Sleep/Listening/Thinking/Speaking 등)와 패널 구조. 우리 앱과 직접 관계 없음. 우리 앱이 음성 입력을 쓸 경우 참고만.
  - 문서 근거: "음성 기반 통신 시스템은 핸즈프리로 말하고 들을 수 있어야 합니다" (`docs-design/Introduction/intro.md`)

## 2. 레이아웃·창(window, layout)

출처: `docs-design/getting-started/layout.md`, `docs-design/getting-started/window.md`

- **화면 구성 요소**: Status bar / Driving view / GNB(하단) / Application window
  - 상단 상태 표시줄, GNB, 공조 패널, 키보드 등 System UI는 앱보다 상위 레이어 → 앱 창을 일시적으로 가릴 수 있음
- **화면 유형**:
  - Connect-S: OS 기본 크기. 17인치 / 14.6인치 / 12.9인치(Connect-L) 세 가지 (`layout.md`). glossary는 "14.5인치"로 적음 → 원문 간 불일치(`glossary.md`).
  - Connect-W: S보다 가로가 긴 Wide, 주로 고급 차종. 세로가 확장될 수 있음(W-Extended).
  - Connect-WF: Waterfall, Wide 대비 작은 해상도.
- **창 정책** (`window.md`):
  - Connect-S: 앱 2개 실행 시 1:1, 앱 1개 실행 시 2:0 (기본 1:1)
  - Connect-W: 2:1 또는 1:2 (기본 2:1), 최대 앱 2개
  - 신규 앱은 이전 앱의 orientation(landscape/portrait)을 따름
  - 앱 종료: 3핑거 스와이프. 윈도 바 드래그 또는 앱 윈도 버튼으로 landscape↔portrait 전환
- **앱 설계 필수 조건** (`layout.md`): "가로 전용 게임 등 한 가지 모드로만 실행 가능한 애플리케이션을 제외한 모든 앱은 Landscape, Portrait 두 가지 레이아웃에 적절하게 조절되도록 설계해야 합니다."
- **Driving view의 landscape 뷰 삭제, resize handle 미제공** (`window.md` 알아두기)
- 창 이동 제스처 수치 (`docs-design/foundations/interaction.md`): Reorder는 다른 window의 translateX 50% 이상 이동 시 이동. Close는 Y축 drag 60% 이후 종료 (기존 75%에서 변경).
- **화면 해상도(px), 그리드 컬럼·거터, 앱 창 내부 여백**: 문서에 없음 (아래 "우리 앱 적용안"의 여백 수치는 Toast 패딩과 Status bar 안전 영역만 근거로 함).
- 여백 관련 확인된 수치:
  - Toast: "App panel 내 side padding 24, bottom padding 24" (`components/toast.md`)
  - Toast popup: "24dp 공간을 두고 Max로 제공" (`components/popups/toast-popup.md`)
  - Status bar: SP0과 SP1 사이 "40dp safe bounds"를 right padding으로 포함 (`components/status-bar.md`)
  - Toast 최대 폭 792, 메시지 최대 폭 712 (`components/toast.md`, 단위 표기 없음)

## 3. 파운데이션

### 색 (`foundations/colors.md`, `Introduction/theme.md`)
- 구조: Basic Color(Grayscale, Alpha[White Alpha, Gray Alpha], Static[Light/Dark]), System Color(Background, Button, Controller, Climate, Dropdown, Dim, Driving, Fields, Gleo AI, Icon, Informative, Keyboard[Normal/Static], Media, Overlay, Phone, Regulation, Surface, Switch, Text)
- Static Color: "라이트, 다크 테마에 영향을 받지 않으며, 항상 raw값을 유지" → 주로 Overlay 위 요소용
- **다크/라이트**: "야간/주간에 따른 조명 환경에 따라 UI 밝기와 대비를 자동 조정하여 가독성을 유지합니다." (`Introduction/intro.md`). 테마 문서는 "아이콘, 폰트, 컬러 중심 브랜드 아이덴티티 유지"라고만 함 (`Introduction/theme.md`). 다크 팔레트 HEX 값: 문서에 없음.
- 색 HEX 값과 토큰별 색 목록: 문서에 없음 (표·이미지 누락으로 추정, 원문에 본문 없음)

### 타이포 (`foundations/typography.md`)
- 폰트: 중립적·균일한 시인성 서체. 시스템 UI 폰트 **Asta Sans** (한국어·영어 지원) (`typography.md` Material 절)
- **최소 글자 크기**: "Android 접근성 가이드라인에 따르면, 최소 폰트 크기는 12sp 이상을 권장합니다. (12sp ≈ 12dp → 12 × (160dpi / 160) = 12px)"
- 행간: "가독성을 위해 일반적으로 1.5배 이상 사용을 권장, 약 18~20px 정도의 높이를 확보하는 것이 안전합니다."
- "실제 픽셀 기준 최소 높이: 18px 이상"
- 정보 위계에 따라 컴포넌트 간 일관된 사이즈 적용 권장. 서브 텍스트는 위계를 구분.
- Font Hierarchy(Headline/Title/Body/Label)의 pt/px 수치: 문서에 없음
- 주행 중 기본 텍스트 높이 5mm 이상 (`Introduction/intro.md`) — 위 1절 참조. mm→px 환산 기준은 문서에 없음.

### 인터랙션 (`foundations/interaction.md`, `intro.md`)
- 제스처 정의: Pressed / Long Pressed(2~3초 홀드 → 편집 활성화) / Swipe / Drag & Drop
- **버튼 피드백 (shrink)**: Enabled → Pressed(scale 95% + 모드별 배경색) → Release. 영역 밖으로 나가면 Cancel
- 터치 시 "진동 피드백(Haptic) 또는 음성 피드백 제공" (`intro.md`)
- 오버스크롤: 바운스 효과, 최대 범위는 스크롤 영역 전체의 약 2/5 (`interaction.md`)
- Easing / Durations(Short·Medium·Long)의 ms 값: 문서에 없음
- **최소 터치 영역 크기(dp/px)**: 문서에 없음

### 아이콘·앱 아이콘 (`foundations/contents-creation/iconography.md`, `app-icon.md`)
- 아이콘 그리드 기본 사이즈: **48 × 48dp** 기준 그리드
- 스타일: 시인성을 위해 상황에 따라 **Filled / Outlined** 2종
- 1벌 제작 후 필요한 사이즈로 조정
- 텍스트 라벨과 함께 제공하여 이해도 향상, 국제적으로 통용되는 아이콘 사용 (`intro.md`)
- 아이콘 세부 Icon Types 목록: 문서에 없음
- **앱 아이콘**: Adaptive Icon 구조. Foreground(로고·주요 그래픽) + Background 분리. 시스템 마스킹으로 형태 결정. 차량 브랜드별 스타일 정책 적용. 제작 규칙 상세는 "Adaptive Icon Design Guide" 참조(외부, 본 문서에 없음). 템플릿은 "Pleos Connect UI Design Guide > Design Resources Download"의 Figma 템플릿 (`app-icon.md`)
- 아이콘 크기(px) 및 앱 아이콘 해상도: 문서에 없음

### 그림자 (`foundations/shadow.md`)
- Level 1: Y 6 / Blur 24 / Spread 0 / #14000000 (8%) — 가장 낮은 elevation
- Level 2: (1-1) Y 8 / Blur 32 / #29000000 (16%) + (1-2) Y 2 / Blur 2 / #14000000 (8%)
- Level 3: (1-1) Y 20 / Blur 40 / #3D000000 (24%) + (1-2) Y 2 / Blur 4 / #33000000 (20%)
- X는 모두 0, Spread는 모두 0

### 애니메이션 (`foundations/animation.md`)
- 옵션: Linear(정적인 로딩), Tension(페이지 로딩 등 로딩 시간이 긴 경우)
- 애니메이션 시간값: 문서에 없음

## 4. 컴포넌트

| 컴포넌트 (문서) | 한 줄 용도 | 우리 앱 적용 가능성 |
|---|---|---|
| Basic button (`components/actions/basic-button.md`) | 명확한 영역·텍스트로 행동 유도. 상태: Pressed/Disabled/Loading(로더 표시) | **높음**. ①③⑤⑥ 실행 버튼, 확인 버튼 |
| Icon button (`actions/icon-button.md`) | 아이콘만으로 직관 인지 가능할 때. Style Basic/Plain/Circle, Size L/M/S | 중. 설정·뒤로 등 |
| Text button (`actions/text-button.md`) | 부가 정보 링크, 앞/뒤 아이콘. Size Medium/Small | 중. 보조 동작 |
| Toggle button (`actions/toggle-button.md`) | On/Off, 다중 옵션 상태 인지. Floating(Shadow 또는 컬러) | 낮음~중. 필터 칩 성격 |
| Keypad (`actions/keypad.md`) | 숫자·텍스트 입력. Text/Voice 입력 지원 | 중. ⑥ 숫자·이름 입력 |
| Segmented menu = "Tabs" (`components/segmented-menu.md`) | 2개 이상 콘텐츠·기능 옵션. Type Box/Line, Fitted | **높음**. ④ 목록/기록 탭, ⑥ 설정 탭 |
| Dropdown (`components/dropdown.md`) | 메뉴 이동·속성 변경. Prefix/Suffix, Container. Size Medium/Small | **높음**. ④ 운전자 필터, 직원 선택 후보 |
| Spinner (`components/spinner.md`) | Drag로 옵션 선택. Type **Date / Time** | **높음**. ④ 날짜·시간 필터, ⑤ 기간 선택. 주의: 로딩 스피너 아님 |
| Indicator (`components/indicator.md`) | 현재 값 + 이전/다음 값 나열 (Present/Narrow·Wide) | 낮음. 값 선택 스크롤 성격 |
| Controllers: Slider / Stepper (`components/controllers.md`) | 최소·최대 범위 값 조작 | 낮음 (우리 앱에 연속값 없음) |
| Bar: Window bar / Scroll bar (`components/bar.md`) | Window bar=앱 창 크기 조정(OS), Scroll bar=콘텐츠 탐색 | 중. ④ 긴 목록 탐색 (Scroll bar) |
| Page navigation (`components/page-navigation.md`) | 주요 여정 메뉴. Depth 상태에서 Back 버튼 표시, Subtitle | **높음**. 화면 ①~⑥ 간 이동, ⑤⑥ 하위 페이지 뒤로가기 |
| Text Field (`components/fields/text-field.md`) | 텍스트·비밀번호·이메일 입력. Type Text/Tel/Url/Email/Password. Size Medium/Small, Invalid 상태 | **높음**. ⑥ 직원 이름, 회사 위치(주소) 입력 |
| Number Field (`components/fields/number-field.md`) | 숫자 입력. Size Large/Medium | 중. ⑥ 사번 등 숫자 항목 (해당 시) |
| Checkbox (`components/selections/checkbox.md`) | 다중 선택 옵션 | 낮음~중 |
| Radio (`components/selections/radio.md`) | 독립 선택 옵션 (한 가지) | 중. ⑥ 설정 값 택1 |
| Switch (`components/selections/switches.md`) | On/Off 상태 전환 | 중. ⑥ 기능 on/off |
| Toast (`components/toast.md`, `components/popups/toast-popup.md`) | 일시적 알림 메시지. 패딩 24, 최대 폭 792, 메시지 712 | **높음**. 주유 감지 알림 등 짧은 안내 (단, 앱이 쓸 수 있는지 확인 필요, 아래 5절) |
| System popup (`components/popups/system-popup.md`) | Title/Description/Confirm/Cancel, Body에 콘텐츠 가능. Size Large/Medium, Button Align Single/Vertical/Horizontal | **높음**. ③ 확인 팝업, ⑤ QR 표시(Body 콘텐츠) |
| System notification (`components/notification/system-notification.md`) | OS 기본 알림. 유형 App icon / Profile / Image / Action. Button Align | 중. 주유 알림 후보 (앱 사용 가능 여부 문서에 없음) |
| Vehicle notification (`components/notification/vehicle-notification.md`) | 주행 알림. Telltale, Title, Description, Guide image. 차량 긴급·경고·정보 이벤트용 (`glossary.md`) | 낮음~중. 주유 감지는 "차량 정보 이벤트"로 볼 여지 있으나 적용 기준 문서에 없음 |
| Status bar (`components/status-bar.md`) | 주행·시스템 상태 영역. 우선순위 SP0/SP1. 시간 24h/12h는 시스템 설정 | 앱이 자체 구성 요소를 넣는다는 설명 없음. 앱은 "기록 중" 상태를 여기에 넣을 수 있다는 근거 없음 (추측 금지) |
| Widgets (`components/widgets.md`) | Handle(끌어내려 숨김), Pagination, Title/Action, Information area | 문서는 구조 이름만 있고 수치·규칙 본문 없음. 우리 앱 "기록 중" 카드 후보 (제공 방식 문서에 없음) |
| App library / GNB (`components/app-library.md`, `gnb.md`) | 앱 런처·하단 바. 앱 아이콘 등록은 사용자가 편집 | 설계 대상 아님. 앱 아이콘(Adaptive) 준비 근거 |
| Mini app (glossary) | Driving view 하단 소형 overlay (AppWidget 기반) | 우리 앱 SDK 범위 밖 가능성 높음 (CLAUDE.md: SDK는 Vehicle State·NaviHelper만) |
| 문서에 목록(List) 컴포넌트 | **문서에 없음** | 직원 목록(①)은 Dropdown / Basic button 나열 등으로 대체 여부 확인 필요 |
| 로딩 스피너 / 상태 표시 Indicator | **문서에 없음** (Spinner=날짜·시간 피커, Indicator=값 선택) | 버튼 Loading 상태 또는 Status 표현 방식 확인 필요 |
| QR 코드 컴포넌트 | **문서에 없음** | ⑤ QR은 Popup Body에 이미지로 넣는 방식 외 근거 없음 |
| 지도 / 주소 선택 컴포넌트 | **문서에 없음** (Map API는 SDK 항목, 우리 범위 밖) | ⑥ 회사 위치는 텍스트 입력 필드로 처리 |

Experiences 관련 (`Experiences/gleo-ai.md`): Gleo 패널 템플릿(list/card), Chips, Speaker bubble. 우리 앱 UI로 재사용 대상 아님.

## 5. 디자인 토큰·테마 사용 방법

출처: `Introduction/design-token.md`, `Introduction/theme.md`, `foundations/colors.md`, `foundations/contents-creation/app-icon.md`, `3d-contents.md`
- 디자인 토큰 정의: "스타일 속성 값(색상, 폰트, 간격, 그림자 등)을 코드로 추상화한 단위", 플랫폼 간 일관성 유지, Single Source of Truth
- **토큰 이름 규칙**: Prefix `ivi`, snake_case, 약어 금지, 전체 이름 사용
  - 예시(문서 제시): `vertical` (Do) / `v` (Don't), `vehicle_setting` (Do) / `vs` (Don't)
  - 실제 토큰 이름 목록: 문서에 없음
- 토큰 파일 형식, SDK 또는 라이브러리 이름, 리소스 참조 방법(XML/Compose 등): **문서에 없음**
- 디자인 리소스는 **Figma**: "Pleos Connect UI Design Guide > Design Resources Download", 'Pleos Connect display guide', 'Pleos Connect design assets' (`Introduction/intro.md`, `app-icon.md`)
- Android Automotive 기반 (`connect.md`). 앱 아이콘은 Android Adaptive Icon 형식 (`app-icon.md`)
- 3D 차량 모델은 glTF, 엔진 Google Filament (`3d-contents.md`), 3D 모델링은 우리 앱 범위 밖
- 테마 전환: "다크모드 / 라이트모드 / 브랜드 테마 전환 용이" 목적 (`design-token.md`). 구체적 전환 절차: 문서에 없음

## 6. 우리 앱 화면별 적용안

공통 규칙 (문서 근거):
- 주행 중(moving): 한 손 조작, 단순 조작만, 애니메이션·동영상·자동 스크롤 금지, 핵심 정보만
- 응답 0.25초 이내, 넘으면 응답 중 표시
- 대비 4.5:1 이상, 줄 80자 이하, 단락 3줄 이하
- 글자: 주요 정보 5mm 이상, 보조 3mm 이상 (mm→px 환산 기준: 문서에 없음), 최소 12sp, 실제 높이 18px 이상
- 버튼 누름: scale 95% + 배경색 변화
- 1탭 조작 시 진동(Haptic) 또는 음성 피드백 권장

| 화면 | 쓸 컴포넌트 | 지켜야 할 수치·규칙 | 근거 |
|---|---|---|---|
| ① 시동 후 P단, 직원 1탭 선택 | Dropdown 또는 Basic button 나열 (목록 컴포넌트 문서에 없음), Page navigation | P단(parked)에서만 조작. 1탭 선택. 누름 시 95% shrink + 햅틱. 응답 0.25초 이내. 이름 글자는 주요 정보 기준 5mm 이상 | interaction.md, intro.md, glossary.md(Driving state) |
| ② 주행 중 "기록 중 · 운전자 이름" | 상태 텍스트 (전용 상태 컴포넌트 문서에 없음), Widgets 후보 | 텍스트 1줄, 80자 이하. 점멸·애니메이션·자동 스크롤 금지. 조작 요소 없음(조작 금지 권장). 주요 정보 5mm 이상 | designing-apps-for-driving.md, intro.md |
| ③ 도착 P단, "업무: OO상사 방문 맞나요?" 1탭 확인 | System popup (Button Align: Horizontal 또는 Single), Basic button(Confirm) | 질문은 Description, 버튼 1탭. 팝업 Body 사용 없이 단순 조작. 주행 중 표시 금지(parked에서만). 팝업은 상위 레이어 | system-popup.md, layout.md(레이어), glossary.md(Distraction) |
| ④ 운행 기록 목록 (날짜·시간·운전자 필터) | Tabs(segmented menu), Dropdown(운전자 필터), Spinner Date/Time(날짜·시간), Scroll bar(긴 목록) | Tab 2개 이상. 긴 본문 텍스트 금지. 목록 과스크롤 시 bounce, 범위 약 2/5 내. 주차 중 조작 권장 | segmented-menu.md, dropdown.md, spinner.md, bar.md, interaction.md |
| ⑤ 내보내기 (기간 선택 → QR 표시) | Spinner Date(시작·종료), Basic button, System popup(Body에 QR 표시, Size Large) | 기간 선택은 parked에서만. QR은 Body 콘텐츠로 표시. QR 크기·여백 수치: 문서에 없음. 단일 메시지 짧게 | spinner.md, system-popup.md (Body Contents) |
| ⑥ 설정 (직원 등록, 회사 위치) | Text Field(Type Text, Size Medium/Large), Page navigation(Depth = Back 버튼), Switch/Radio(옵션), Keypad(입력), Basic button(저장) | 입력 필드 Invalid 상태 표시. 설정 조작은 주행 중 제한(CarUxRestrictions) → parked 전용 권장. 주소 입력은 텍스트 필드(지도 컴포넌트 문서에 없음) | text-field.md, page-navigation.md, switches.md, radio.md, keypad.md, glossary.md(CarUxRestrictions) |
| 참고: 주유 감지 알림 | Toast (패딩 24, 메시지 최대 712), 또는 System notification(App icon 타입). Vehicle notification은 적용 기준 문서에 없음 | 알림은 운전자 필요와 관련된 경우에만. 광고·텍스트 광고 금지. 주행 중에는 짧은 한 문장 | toast.md, toast-popup.md, system-notification.md, intro.md |

## 7. 문서에 없는 것 (확인 필요 목록)
- 화면 해상도(px)와 그리드 컬럼·거터·여백 수치
- 색 HEX 값, 다크 팔레트, 토큰 실제 이름과 목록
- 최소 터치 영역 크기(dp/px)
- 목록(List) 컴포넌트, 로딩 스피너, 상태 표시 컴포넌트, QR 컴포넌트
- 앱이 Toast·System notification·Vehicle notification·Widget·Status bar를 직접 쓸 수 있는지 여부와 SDK 조건 (CLAUDE.md상 SDK는 Vehicle State·NaviHelper만 사용 가능)
- 토큰/테마 사용 방법 (라이브러리, 리소스 이름, 코드 예시)
- 애니메이션·Easing·Durations의 ms 값
- Font Hierarchy(Headline/Title/Body/Label)의 크기 값
- mm→px 환산 기준

## 8. 원문 간 불일치·주의
- Connect-S 크기: layout.md는 14.6인치, glossary.md는 14.5인치
- Connect-L 명칭: 현재 Connect-S 세부 유형으로 재분류 (layout.md, glossary.md)
- Close 임계값: 기존 75% → 현재 60% (interaction.md 괄호 표기)
- 원문 HTML 추출 과정에서 표·이미지가 빠진 문서 다수 (예: colors.md, theme.md, interaction.md Easing/Durations)
- `docs-design/getting-started/` 아래 application-development 문서 3개는 이번 범위가 아니라 읽지 않음

