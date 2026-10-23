> 출처: https://document.pleos.ai/docs/connect/guide/glossary (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Glossary
42dot LLM
42dot에서 자체 개발한 Large Language Model로, Pleos Connect 내에서 Gleo AI를 지원하기 위해 Supervised Fine-Tuning(SFT)를 수행한 자체 모델입니다.

AD (Autonomous Driving)
Driving view 3D 영역에서 자율주행·주행 보조 정보를 표시하는 기능입니다. ADAS 인지 결과(객체·차선·신호등), 주행 계획, 충돌·근접 경고, 자동 주차, AD indicator를 3D scene에 렌더링합니다.

AD indicator
Driving view 우측 overlay에서 AD ready/on, 목표 속도, Auto speed mode, LKA, Auto Parking, sensor calibration 상태를 표시하는 AD UI입니다.

ADAS SDK
ADAS SDK는 주행 보조 역할을 할 수 있는 정보를 제공하는 ADAS API를 제공합니다.

Ambient AI
Gleo AI는 LLM 기반의 인공지능 기술과 음성 기술을 활용하여 사용자의 맥락과 대화를 이해하고 필요한 응답과 실행을 제공하여 사용자에게 편리하고 안전한 이동경험을 제공하는 차량용 음성 비서입니다. On-device Gleo AI 서비스와 Cloud Gleo AI 서비스로 제공되며, Cloud Gleo AI는 NL2API, RespGen, RAG와 같은 생성 엔진을 제공합니다.

AMI Server
AMbient Intelligence(AMI) Server는 개인화 AI 경험을 제공하기 위한 모듈로, 사용자 데이터를 분석하여 맞춤형 서비스를 제공하기 위한 서비스입니다.

Android Auto
모바일 기기와 차량 디스플레이를 연결해 Android Auto 지원 앱을 투영하는 phone projection 레퍼런스 구현입니다. 유선(AOAP/USB)과 무선(IVI Wi-Fi) 연결을 지원합니다.

App Library
설치 앱과 차량 제어 버튼을 카테고리(앱, 공조, 빠른 설정, 더 보기)별로 제공하는 런처 system application입니다. GNB favorite/shortcut 슬롯에 드래그 앤 드롭으로 등록할 수 있으며, Launcher activities, Disabled activities, hidden apps, Distraction Optimized 앱을 관리합니다.

App Market
Pleos App Market은 Pleos Connect에서 동작하는 infotainment application을 유통할 수 있는 서비스입니다.

App Market Console
Pleos App Market Console은 Pleos App Market에 등록할 앱을 심사 받고 출시 승인을 받는 개발자 서비스입니다

Apple CarPlay
Wireless Apple CarPlay phone projection 레퍼런스 구현입니다. 모바일 앱을 차량 디스플레이에서 사용하며 IVI Wi-Fi로 무선 연결합니다.

Auto parking
AD 3D 영역에서 주차 슬롯 검색·선택·주차 trajectory를 표시하고 top view 등 자동 주차 scene을 전환하는 Driving view 기능입니다.

BSM
Business Service Management(BSM)은 Pleos Connect 시스템에서 사용자에게 제공할 다양한 정보들을 연결해 주는 백앤드 서버입니다.

Camera app
EVS 기반으로 주행·주차 시 외부 카메라를 모니터링하는 Pleos Connect system application입니다.

Car Accessory Protocol SDK
Car Accessory Protocol SDK는 차량과 스마트폰의 인터페이스를 제공하는 SDK로서, 스마트폰에서 차량 상태 및 주행 정보를 조회하고 차량을 제어할 수 있도록 하는 API를 제공합니다.

CarUxRestrictions
CarUxRestrictionsManagerService가 주행 상태별로 계산하는 Android Automotive UX 제한입니다. idling·moving에서는 requiresDistractionOptimization과 no_setup|no_video 등을 적용해 앱·설정·프로필 조작을 제한합니다.

Climate panel
GNB 공조 영역 터치 또는 상단 드래그로 열리는 공조 제어 overlay입니다. 앞·뒷좌석 온도, 풍량, 풍향, air vent를 제어합니다.

Climate shortcut
GNB 슬롯에 배치되는 공조·Quick control·More 버튼 shortcut입니다. App library에서 드래그 앤 드롭으로 편집합니다.

Cloud Gateway
Cloud gateway는 42dot의 API 게이트웨이로서, Pleos Connect의 infotainment application과 42dot 서비스/리소스 간 상호 연결 및 데이터 교환을 가능하게 합니다. API 게이트웨이에 등록된 42dot API를 사용하려면 authentication & authorization 절차를 거쳐야 합니다.

Cluster
차량 운행을 위한 주요 정보를 시각적으로 제공하는 계기판 또는 디지털 계기판을 말합니다. Pleos Connect v3.2에서는 Driving view의 Driver information cluster overlay가 주행 정보 UI를 담당합니다.

Cluster overlay
Driving view 내 Driver information이 차지하는 주행 정보 overlay 영역입니다. 전통적 클러스터 정보를 IVI Driving view에 통합 표시합니다.

Connect-L
기존 Pleos Connect 디스플레이 명칭으로, 12.9인치 크기를 의미했습니다. 현재는 Connect-S Standard 유형으로 재분류되었습니다.

Connect-S
OS 기본 크기로 제공되는 Standard 디스플레이 유형입니다. S는 Standard의 줄임말이며, 17인치, 14.5인치, 12.9인치 세 가지 크기를 제공합니다. 하단 GNB, 상단 Status bar, PnP 영역을 포함하는 센터 디스플레이 UI 구성의 기준 폼팩터이기도 합니다.

Connect-W
Connect-S보다 가로가 긴 Wide 디스플레이 유형입니다. 주로 고급 차종에 탑재되며, 차량 상태에 따라 세로 높이가 확장될 수 있습니다.

Connect-W-Extended
Connect-W 디스플레이가 차량 상태에 따라 세로 높이가 확장된 형태입니다.

Connect-WF
Waterfall이라 불리는 Wide 계열 디스플레이로, Connect-W 대비 작은 해상도이지만 차량 내 핵심 기능을 제공합니다.

CRP (Deprecated)
42dot이 개발한 Pleos Connect 플랫폼의 예전 이름. CRP에서 Pleos Connect로 플랫폼 명칭이 변경되었습니다.

CWC
Communication Wireless Controller. 차량 connectivity를 담당하는 board로, CWC Wi-Fi를 포함하며 외부 인터넷 연결과 connectivity-manager를 통해 WLAN을 제어합니다.

CWC Wi-Fi
CWC board에 포함된 외부 연결용 Wi-Fi입니다. 외부 AP 연결과 일반 인터넷 사용에 쓰이며 Pleos Wi-Fi Service를 통해 IVI에서 제어합니다.

Dashcam
차량 블랙박스 녹화·클라우드 업로드 기능입니다. Status bar indicator와 Vehicle settings Security에서 제어됩니다.

Destination shortcuts
Welcome screen에서 검색, 최근, 즐겨찾기, Home/Work 설정 등 내비게이션 화면 진입점을 제공하는 shortcut 영역입니다.

Distraction Optimized
주행 중 운전자 주의 분산을 줄이기 위해 앱 조작을 제한하는 정책입니다. CarUxRestrictions와 앱의 distractionOptimized 선언에 따라 Driving restriction policy, Home screen, App library에서 사용을 제한합니다.

Driver information
Driving view cluster overlay에 운전자가 주행 중 확인할 정보를 표시하는 기능입니다. 기어, 속도, SOC, Road sign information, Mini TBT, telltale, Pre-drive guide 등으로 구성됩니다.

Driving restriction policy
기어·속도 기반 주행 상태에 따라 앱 실행, 사용자 조작, 프로필 전환을 제한하는 System service 정책입니다. CarDrivingStateService와 CarUxRestrictionsManagerService를 중심으로 동작하며, Home screen·Vehicle settings·App library·프로필 서비스에 UX 제한을 전달합니다.

Driving state
CarDrivingStateService가 vehicle property로 판단하는 주행 상태입니다. parked(기어 PARK), idling(비주차·속도 0), moving(비주차·속도 非0), unknown(판단 불가) 네 가지로 구분됩니다.

Driving View
주행 중 차량 상태와 안내 정보를 표시하는 Pleos Connect 시스템 영역입니다. AD(3D 주행 보조), Driver information(cluster overlay), Vehicle control(3D 차량 본체)로 구성되며 Home screen window 정책의 Driving view container에 배치됩니다.

Driving view container
Home screen window 정책에 따라 Driving view 시스템 영역이 배치되는 컨테이너입니다. AD, Driver information, Vehicle control이 이 영역에 표시됩니다.

EIC
Elina Interface Connect(EIC)는 cloud gateway에서 인증/인가가 완료된 요청을 SpeechToText, TextToSpeech, RespGen으로 라우팅하는 역할을 하는 백앤드 서버입니다.

Entertainment mode
Parking 상태 game/image/video 등 앱의 Full screen mode 변형입니다. timeout·차량 상태 변경 시 자동 해제됩니다.

EV Route Planner
배터리와 주행 거리를 기반으로 내비게이션이 선제적으로 충전에 대한 해결책을 제시하여 운전자가 충전에 대한 걱정 없이 원하는 장소로 이동하도록 돕는 서비스입니다.

EVS
Exterior View System(EVS)는 차량 외부 카메라 뷰를 지원하는 소프트웨어 스택으로 Pleos Connect 시스템의 서브 시스템입니다. Camera app과 연동하며 custom launching, 주차 가이드라인 overlay, multi camera view를 제공합니다.

External threat warning
차량이 잠겨 있고 내부에 탑승자가 없을 때 파손·도난 시도·외부 충격이 감지되면 표시하는 Power state UX입니다. IVI Full screen 경고로 외부 접근자에게 위험 감지 사실을 알리고 차주 실시간 전송 가능성을 안내합니다.

Favorite apps
GNB에 고정 배치하는 자주 쓰는 앱 영역입니다. Vehicle settings·Navigation은 always-favorite입니다.

Fleet API
차량 및 Fleet을 관리할 수 있도록 지원하는 API입니다. Fleet API를 활용하면 Pleos Fleet과 인터페이스하는 애플리케이션을 개발할 수 있습니다. Fleet API는 Fleet REST API와 Fleet API Webhook을 제공합니다. Fleet REST API는 차량과 단말의 기본 정보, 실시간 데이터, 차량 제어, 운전자 정보, 차량 정비 및 이상 상태 등을 연동할 수 있도록 지원하는 API입니다. Fleet API Webhook은 실시간으로 발생하는 차량 데이터를 사용자 지정 endpoint로 전달하는 기능을 제공합니다.

Full Screen Mode
Home screen과 연동해 앱을 전체 화면으로 전환하는 System service 기능입니다. Parking 상태에서 진입 UI를 표시하고, 진입 시 TaskView를 전체 bounds로 확장하며 System UI를 숨깁니다. Entertainment mode 변형을 지원하며, 기어 변경, 브레이크, 도어 개방 등 조건 또는 timeout에 따라 자동 해제됩니다.

Fused Location SDK
Fused Location SDK는 GPS, Wi-Fi, 셀룰러 네트워크 및 센서 데이터를 결합하여 챠량의 위치 정보를 제공하는 SDK입니다.

Gleo
Pleos Connect Gleo AI 에이전트의 wake word 입니다. '글레오'는 16세기 인류 최초로 새로운 위성을 관측해 우주과학사의 전환점(태양 중심설)을 만든 Galileo를 모티브로 한 이름으로, SDV를 통해 새로운 모빌리티의 패러다임을 만들고자 하는 의미를 담고 있습니다.

Global Search
Status bar 검색 아이콘에서 진입하는 Pleos Connect System UI 통합 검색입니다. 앱, 내비게이션, 차량 설정, 연락처 등 등록된 search provider 결과를 한 화면에서 조회합니다.

GNB
화면 하단에 상시 표시되는 Global Navigation Bar System UI입니다. Vehicle settings, 공조 온도, dual defroster, climate shortcut, App library, favorite apps, recent apps 및 PnP 영역으로 빠른 접근을 제공합니다.

Heads-Up Notification
통화·메시지·내비게이션 등 즉시 인지가 필요한 알림을 화면 overlay로 일시 표시하는 System service 알림 유형(HUN)입니다.

Home screen
Pleos Connect의 HOME 역할 system app입니다. TaskView로 앱 window를 배치하고 Driving view, Mini app, OSD, Full screen mode, Setup wizard, System UI를 한 화면 레이어에서 조정합니다.

Infotainment Application
Infotainment application은 Pleos Connect 상에서 동작하는 차량용 인포테인먼트 앱을 말합니다.

IVI button bar
센터 디스플레이 하단 PnP 물리 버튼·다이얼 장치입니다. 온도·볼륨·미디어 0-depth 제어와 편집 가능 shortcut을 제공합니다.

IVI OS (Deprecated)
Pleos Connect라는 용어로 대체되었습니다. IVI OS는 더 이상 사용하지 않습니다.

IVI Wi-Fi
IVI에 내장된 Wi-Fi로, Android Auto, CarPlay, Screen Mirroring 같은 device-to-device phone projection 연결에 사용합니다.

Keyboard App
화면 입력용 소프트 키보드를 제공하는 Pleos Connect system application입니다. 한/영 레이아웃, 와이드 키보드, 음성 입력을 지원합니다.

LLM SDK
LLM SDK는 Pleos Connect에서 동작하는 infotainment application과 LLM 플랫폼 간 연동을 지원합니다.

Map API
Maps API는 지도, 경로안내, 주소검색, 공간검색, 실시간 교통정보 검색 등 다양한 기능을 제공합니다.

Maps JS
Maps JS는 Map API 사용을 돕는 자바스크립트 라이브러리입니다.

Media App
Bluetooth 음악과 라디오를 통합 제공하는 Pleos Connect system application(Media)입니다.

Mini app
Driving view 하단에 표시되는 소형 overlay UI입니다. Media control, TPMS, Call 등 고정·이벤트 반응형 Mini app을 AppWidget 기반으로 관리합니다.

Mini TBT
Driver information cluster overlay에서 내비게이션 turn-by-turn(TBT)의 다음 안내(거리, 방향, 설명)를 요약 표시하는 기능입니다.

multi window
Pleos Connect에서 클러스터와 애플리케이션을 동시에 사용할 수 있도록 하는 환경입니다. Home screen Window policy가 최대 2개 앱 TaskView 배치를 관리합니다.

Navigation
탑승부터 목적지까지 주변 환경과 상황 등을 인지해 사용자에게 필요한 정보를 자연스럽게 연결하는 인공지능 내비게이션을 말합니다. Gleo AI와 연동을 통해 음성으로 목적지를 설정하고 정보를 제공받을 수 있어, 사용자가 손쉽게 내비게이션을 조작할 수 있습니다. 경로 안내 솔루션은 실시간 교통 상황을 기반으로 최적의 경로를 제공하며, 충전이 필요한 경우 자동으로 충전소를 추가해서 안내합니다.

NaviHelper SDK
NaviHelper SDK는 Pleos Connect에서 동작하는 infotainment application이 Pleos Connect Navigation 앱과 연동할 수 있는 API를 제공합니다.

NaviProvider SDK
NaviProvider SDK는 Pleos Connect Navigation 앱이 Pleos Connect에서 동작하는 infotainment application에 이벤트 및 정보를 전달할 수 있도록 API를 제공합니다.

NL2API
Natural Language to Application Programming Interface(NL2API)는 사용자 입력 발화와 대화 이력을 분석해 응답 생성에 필요한 API 호출 커맨드(API 이름과 파라미터)를 생성합니다.

NL2SEARCH
Natural Language to Search(NL2SEARCH)는 사용자 입력 발화와 대화 이력을 분석해 정보 검색을 위해 필요한 파라미터를 생성합니다.

Notification
Pleos Connect에서 이벤트를 사용자에게 전달하는 System service 기능입니다. Vehicle notification, HUN, Toast, Dialog popup 유형으로 구분되며 Notification center가 표시 대상·정렬·그룹·삭제 정책을 관리합니다.

Notification Center
Status bar 알림 아이콘으로 열리는 알림 목록 System UI입니다. 차량 알림, HUN, 일반 알림을 프로필별로 표시·정렬·그룹화하며, swipe 삭제와 hidden flag로 표시 대상을 제어합니다.

NSS
고도로 상세한 지도 데이터나 실시간 교통 정보를 클라이언트에게 제공하는 역할을 하는 Network Serving Server입니다.

ODS (Occupant Detection System)
동승석 압력을 감지해 승객 분류(성인·어린이·빈 좌석)를 제공하는 Occupant Detection System입니다. PAB indicator 표시 상태 결정에 사용됩니다.

Onboarding
Onboarding은 사용자가 Pleos Connect 서비스를 처음 사용할 때 필요한 설정을 완료하고 서비스를 사용할 수 있도록 돕는 기능입니다.

OSD
On-Screen Display(OSD)는 차량 조작 결과를 짧게 보여 주는 overlay입니다. Home screen에서 Mini app 상단에 icon·text·level bar로 표시하며, 볼륨·공조·Quick control 등 상태 변경 피드백에 사용됩니다.

Passenger Air Bag (PAB) indicator
앞좌석 조수석 에어백 active/inactive 상태를 PASSENGER AIR BAG ON/OFF telltale로 Status bar vehicle indicator에 표시하는 Safety 기능입니다. OHC 물리 indicator가 없는 차량에서 IVI로 상태를 제공합니다.

Phone App
Bluetooth 기반 전화·문자(SMS) 서비스를 제공하는 Pleos Connect system application(Phone)입니다.

Phone projection
Android Auto(wired/wireless) 및 Wireless Apple CarPlay를 통해 스마트폰 기능을 IVI에 투영하는 영역입니다.

Pleos Account
현대자동차 통합 계정을 말합니다. Pleos App Market, Pleos App Market Console 사용 및 cloud gateway 인증을 위해서 Pleos Account가 필요합니다.

Pleos Connect
Pleos Connect는 Android Automotive OS를 기반으로 하는 Software-defined Vehicle(SDV) 차량의 In-Vehicle Infotainment 플랫폼입니다. Pleos Connect는 Pleos Connect 운영체제를 포함한 Pleos Connect 서비스를 통칭합니다. 기존의 IVI OS라는 용어는 Pleos Connect로 대체되었습니다.

Pleos Connect Devbox
Pleos Connect 플랫폼 개발자에게 reference hardware를 제공하기 위해 구성한 하드웨어 집합체입니다.

Pleos Wi-Fi Service
IVI에서 CWC Wi-Fi를 제어하고 상태를 수신하기 위한 service interface입니다. IVI client의 CWC Wi-Fi 요청과 CWC board connectivity-manager의 결과·상태를 연결합니다.

PnP (Plug and Play)
센터 디스플레이 하단 IVI button bar 물리 입력을 Car service·System UI로 전달하는 Plug and Play 연동입니다.

PnpView
PnP 입력을 System UI의 GNB, 공조, 미디어 등 기능과 연결하는 구현체입니다. 0-depth 제어와 GNB PnP 편집 모드를 지원합니다.

Power state UX
차량 sleep, wakeup, 잠금, 전원 종료 등 탑승 전후 맥락에서 필요한 안내·개입 UI를 제공하는 System service입니다. Full screen, HUN, System dialog, Driving view guide를 상황별로 사용하며, ConvenienceModeManagerService가 표시 mode를 결정합니다.

Pre-drive guide
Driver information 영역에서 정차·출발 전 프렁크, 트렁크, 문, 안전벨트, 브레이크, 기어, 가속 순으로 안내 illustration을 표시하는 Driving view 기능입니다.

Pre-Installed App
Pre-Installed App은 고객이 차량을 처음 인도 받았을 때부터 이미 설치되어 있어서 App Market에서 다운로드 받지 않아도 바로 사용할 수 있도록 제공되는 앱입니다.

Predictive destinations
Welcome screen 목적지 추천 영역입니다. Gleo·최근·즐겨찾기 목적지와 route trip 정보를 표시하고, 종료 시 route 요청을 수행합니다.

Proactive entertainment
Welcome screen 미디어 추천 영역입니다. Gleo media API 추천 또는 Bluetooth Music/Radio fallback을 제공합니다.

PTT
Push To Talk의 약어. 차량 핸들에서 제공하는 물리 버튼으로, PTT 버튼을 눌러 음성인식 발화를 시작할 수 있습니다.

RAG
Retrieval-augmented Generation(RAG)는 내부 벡터 DB 지식과 외부 검색 지식을 활용하여 지식 기반 응답을 생성하는 엔진입니다.

Recent apps
GNB App library 우측 2슬롯에 최근 실행 앱을 표시하는 영역입니다.

RespGen
Response Generation(RespGen)은 대화 문맥과 검색 결과를 바탕으로 응답을 생성하는 엔진입니다.

Road sign information
Driver information RoadSignView에서 도로 제한 속도·단속 카메라·구간 단속(남은 거리, 평균 속도) 정보를 원형 표지로 표시하는 기능입니다.

Safety
차량 안전과 관련된 telltale 및 indicator 기능을 다루는 Pleos Connect 영역입니다. Tire Pressure Monitoring System(TPMS), Seat Belt Reminder(SBR), Passenger Air Bag(PAB) indicator 문서로 구성됩니다.

Seat Belt Reminder
좌석 탑승자의 안전벨트 미착용을 telltale, Vehicle notification, Driving view notification image, warning sound로 경고하는 Safety 기능(SBR)입니다. 앞좌석·뒷좌석별 warning behavior가 다릅니다.

Send to Car
모바일에서 전달된 POI를 Welcome screen이 수신해 종료 시 해당 목적지로 route 요청하는 기능입니다.

Setup wizard
초기 계정·설정을 완료하는 Home screen Setup wizard layer에 표시되는 온보딩 UI입니다.

SOME/IP based
Franca IDL 기반 code generator로 Pleos Connect와 차량 제어기 간 SOME/IP 프로토콜 데이터 통신을 위한 Native, JNI, Kotlin library와 API를 생성·제공하는 Vehicle integration reference 문서입니다.

SpeechToText SDK
SpeechToText SDK는 Pleos Connect에서 동작하는 infotainment application에서 42dot 음성인식 플랫폼과 연동할 수 있도록 지원함으로써 음성 인터페이스 기반의 음성 인식 기능을 제공합니다.

Status bar
IVI 상단 고정 System UI입니다. 검색, Notification center, 통화, 프로필, 네트워크, 차량 indicator 등 시스템·차량 상태와 패널 진입점을 제공합니다.

System App
System App은 Pleos Connect 플랫폼에서 기본적으로 제공하는 필수 시스템 앱으로, 차량 출고 시 이미 설치되어 있을 뿐만 아니라 플랫폼 기능 구현에 직접 관여하거나 핵심 서비스를 제공합니다. System App은 삭제할 수 없습니다.

System applications
Pleos Connect가 제공하는 핵심 system application 영역입니다. App library, Media, Phone, Vehicle settings, Keyboard, Camera 등이 포함됩니다.

System service
차량 상태와 사용자 조작 맥락을 기반으로 시스템 동작을 제어하는 공통 정책 및 서비스 계층입니다. Full screen mode, Driving restriction policy, Notification, Notification center, Vehicle sound, Power state UX, Vehicle Network Management, Wi-Fi Network Management를 포함합니다.

System UI
앱 외 공통 UI 계층입니다. Status bar, GNB, Global search, Climate panel로 구성됩니다.

TaskView
Home screen에서 Android Task를 표시하는 window 컨테이너입니다. Window policy에 따라 Primary/Secondary window로 배치되며 Full screen mode 진입 시 전체 bounds로 확장됩니다.

Telltale
차량 경고·상태를 아이콘으로 알리는 표시 영역입니다. Driving view cluster overlay와 Status bar vehicle indicator에 표시되며, 일부는 elevation 요구로 Home screen에도 나타납니다.

TextToSpeech SDK
TextToSpeech SDK는 Pleos Connect에서 동작하는 infotainment application과 42dot 음성합성 플랫폼의 연동을 지원함으로써 음성 인터페이스 기반 음성 합성 기능을 제공합니다.

TPMS
Tire Pressure Monitoring System. Driving view TPMS Mini app으로 wheel별 공기압·단위·저압 상태를 표시하고, 경고 시 Vehicle notification과 함께 동작하는 Safety 기능입니다.

User-Installed App
User-Installed App은 사용자가 App Market에서 다운로드 받아야 하는 앱입니다.

V2L
Vehicle-to-Load. 차량 배터리 전력을 외부에 공급하는 기능으로 Status bar vehicle indicator에 상태가 표시됩니다.

Vehicle access guide
차량 문이 열리지 않을 때 키 미인식·NFC 키 태그 필요 등 미개방 사유와 다음 조작을 Full screen으로 안내하는 Power state UX입니다. 보안 경고가 아닌 정상 접근을 돕는 정보성 안내입니다.

Vehicle control
Driving view 3D 영역에서 문·창문·조명·충전 등 차량 본체 상태를 3D 모델로 표현하고 top/quarter/bird view 장면을 전환하는 기능입니다. 정차·저속 quarter view에서는 3D 차량 터치 제어도 제공합니다.

Vehicle emulator
Vehicle property 값을 에뮬레이트할 수 있도록 Pleos Connect가 제공하는 개발 도구입니다. Vehicle HAL Emulator가 SOME/IP를 통해 Vehicle HAL service에 property 변경을 전달합니다.

Vehicle integration reference
Pleos Connect와 외부 ECU 간 Vehicle property로 지원되지 않는 복잡한 데이터 교환을 위한 참조 영역입니다. Native/JNI/Kotlin 라이브러리, code generator, Pleos Connect SDK ADAS 예제, SOME/IP based 연동을 제공합니다.

Vehicle Network Management
차량 내부 restricted network와 OEM paid network 접근을 platform capability, privileged permission, process binding으로 제어하는 System service 기능입니다. Vehicle process, OEM process, general process 역할 분리와 reachability 확인을 전제로 합니다.

Vehicle notification
차량 긴급·경고·정보 이벤트를 Car category 알림으로 표시하는 System service 알림 유형입니다.

Vehicle property
Pleos Connect 차량 integration을 위한 속성 체계입니다. VHAL 기반 표준 vehicle property, vendor vehicle property 확장, Vehicle emulator를 통해 조회·설정·개발 테스트를 지원합니다.

Vehicle reset and shutdown
secret button 조합으로 차량 reset 또는 shutdown이 요청될 때 표시하는 Power state UX System dialog입니다. hard reset·shutdown 선택 전 주의사항과 취소 action을 명확히 구분해 제공합니다.

Vehicle SDK
Vehicle SDK는 차량 정보 조회 및 제어 인터페이스를 제공하는 Vehicle API를 제공합니다.

Vehicle Settings
차량 설정·제어·프로필·보안(블랙박스)·연결 등 차량 상태를 조회·변경하는 Pleos Connect system application입니다.

Vehicle sound
차량·ADAS·AD·조작 이벤트를 청각으로 전달하는 System service입니다. Vehicle notification, ADAS, AD, Vehicle 사운드 cue를 긴급도에 맞게 재생합니다.

Vehicle unlock support
잠긴 차량 내부에 사용자가 있을 때 외부에서 도어 스위치·핸들 조작으로 탑승을 시도하면 표시하는 Power state UX입니다. HUN 또는 System dialog로 전체 도어 잠금 해제 여부를 내부 사용자에게 확인받습니다.

Vehicle wake-up guide
차량 sleep 상태이거나 IVI가 켜진 직후 주행 가능 상태로 전환하기 위한 다음 행동을 Driving view에서 안내하는 Power state UX입니다. NFC 키 인식, 브레이크 조작 등 필요 입력을 guide 형태로 제공합니다.

Vendor vehicle property
Android Automotive OS 표준에 없는 Pleos Connect vendor 영역 vehicle property 확장입니다. Pleos Connect Vendor Vehicle Property API reference에서 property ID와 접근 권한을 제공합니다.

VHAL
Vehicle Hardware Abstraction Layer. Pleos Connect가 차량 integration을 위해 제공하는 HAL 계층으로, vehicle property 조회·설정의 기반이 됩니다.

Welcome screen
탑승 후 주행 전 목적지·미디어를 선택하는 system app입니다. Predictive destinations, Send-To-Car, Destination shortcuts, Proactive entertainment 영역으로 구성됩니다.

WelcomeScreenLifecycleManager
Home screen에서 Welcome screen 표시 조건을 관리하는 컴포넌트입니다. Gear P, 계정 및 setup 완료 등 실행 조건을 확인한 뒤 Welcome screen을 표시합니다.

Wi-Fi Network Management
CWC board가 관리하는 Wi-Fi를 IVI에서 Pleos Wi-Fi Service로 사용할 수 있게 하는 System service 기능입니다. CWC Wi-Fi scan·저장·연결 제어로 외부 인터넷을 제공하고, Android Auto·CarPlay·Screen Mirroring 등 device-to-device 연결은 IVI Wi-Fi로 구분합니다.

Window policy
Home screen의 Primary/Secondary window 배치·실행·종료·크기 변경 정책입니다. multi window 환경에서 최대 2개 앱 TaskView를 관리합니다.

WWD
Wake Word Detection은 사용자의 wake word 발화를 탐지하는 기술입니다. PTT 버튼 누름 없이 '글레오(Gleo)' 라고 부르면 에이전트가 wake 되고 이후 발화를 seamless하게 인식하는 기능입니다.
