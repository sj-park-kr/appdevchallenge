> 출처: https://document.pleos.ai/docs/pleos-only/app-test-guide/virtual-console-guide (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Pleos Connect Virtual Console 사용 가이드
Pleos Connect Virtual Console의 Emulation Controls를 사용하면 차량 상태와 이벤트를 도메인별로 설정할 수 있으며, 이를 통해 차량 상태 변화에 따른 앱의 동작을 검증할 수 있습니다.

시작하기 전에
Pleos Connect Virtual Console 셋업 가이드에 따라 Pleos Connect Emulator를 실행하고 Virtual Console에 접속하세요.

## Emulation Controls 사용 방법​

- Pleos Connect Virtual Console에서 Emulation Controls를 엽니다.

- 왼쪽 목록에서 테스트할 Domain을 선택하거나 검색창에서 카드 이름을 검색합니다.

- 카드에 차량 영역 선택 항목이 있으면 테스트할 영역을 선택합니다.

- 버튼, 목록 또는 슬라이더로 상태와 값을 변경합니다.

- Pleos Connect Emulator와 테스트 중인 앱에서 변경 결과를 확인합니다.

[이미지: Pleos Connect Virtual Console의 Emulation Controls 화면]

## Vehicle​

| | 카드 | 기능
| | Notification 1 | 식별자가 1인 차량 알림을 표시하거나 숨깁니다. 알림 상태에 따른 앱의 표시 동작을 확인할 수 있습니다.

## Motion​

| | 카드 | 기능
| | Gear Selection | 현재 기어를 P, R, N, D 중 하나로 설정합니다. 기어 변경에 따른 앱의 상태 전환을 확인할 수 있습니다.
| | Brake Pedal | 브레이크 페달 위치를 0~100% 범위에서 설정하고, 해당 값에서 파생되는 페달 작동 상태를 재현합니다.
| | Odometer | 누적 주행 거리를 0~1,000,000km 범위에서 1km 단위로 설정합니다.
| | Steering Angle | 스티어링 휠 각도를 -540~540도 범위에서 1도 단위로 설정합니다.
| | Steering Wheel Heat | 스티어링 휠 열선 단계를 Off, Low, Medium, High 중 하나로 설정합니다.

## ADAS​

| | 카드 | 기능
| | Cruise Control State | 크루즈 제어 상태를 Not ready, Ready, Longitudinal, Lateral, Full autonomous 중 하나로 설정합니다.
| | Cruise Target Speed | 크루즈 제어의 목표 속도를 5.556~27.778m/s 범위에서 0.277775m/s 단위로 설정합니다.

## Convenience​

| | 카드 | 기능
| | ETCS Power | 전자 요금 징수 시스템의 활성화 상태를 Off 또는 On으로 설정합니다.
| | ETCS Scenario | 카드 삽입·제거 또는 요금소 진입·진출 시나리오를 발생시킵니다.
| | Door Position | 앞좌석과 뒷좌석의 좌우 도어를 선택하여 열림 또는 닫힘 상태를 설정합니다.
| | Door Lock | 모든 승객 도어의 잠금 상태를 Unlock 또는 Lock으로 설정합니다.
| | Trunk / Frunk Position | 프렁크 또는 트렁크를 선택하여 열림 또는 닫힘 상태를 설정합니다.
| | Cabin Lights Switch | 전체 좌석의 실내등 상태를 Off 또는 On으로 설정합니다.
| | Reading Lights | 앞좌석과 뒷좌석의 좌우 좌석을 선택하여 독서등 상태를 Off 또는 On으로 설정합니다.
| | Ambient Brightness | 앰비언트 라이트 밝기를 0~100% 범위에서 1% 단위로 설정합니다.
| | Ambient Color | 앰비언트 라이트 색상을 Cyan, Blue, Purple, White 중 하나로 설정합니다.
| | Exterior Lights Mode | 외부 조명 모드를 Off, Auto, Tail lamp, Low beam 중 하나로 설정합니다. 선택한 모드에 맞춰 미등과 하향등 상태가 함께 변경됩니다.
| | High Beam | 상향등의 실제 상태를 Off 또는 On으로 설정합니다.
| | Hazard Lights | 비상등 스위치와 실제 상태를 함께 Off 또는 On으로 설정합니다.
| | Stop Lights | 제동등의 실제 상태를 Off 또는 On으로 설정합니다.
| | Door Lights | 프렁크 또는 트렁크를 선택하여 해당 도어 조명 상태를 Off 또는 On으로 설정합니다.
| | Turn Signal State | 방향지시등을 Off, 좌·우 Blink, 좌·우 Flash 중 하나로 설정합니다.
| | Window Position | 앞좌석과 뒷좌석의 좌우 창문을 선택하여 위치를 0~100% 범위에서 1% 단위로 설정합니다.
| | Window Lock | 양쪽 뒷좌석 창문 전체 또는 좌우 창문을 선택하여 잠금 상태를 Unlock 또는 Lock으로 설정합니다.
| | Seat Occupancy | 운전석, 동승석 또는 뒷좌석 좌우를 선택하여 탑승 상태를 Empty 또는 Occupied로 설정합니다.
| | Windshield Wiper Switch | 앞유리 또는 뒷유리 와이퍼를 선택하여 동작 모드를 Off, Auto, Low, High 중 하나로 설정합니다.
| | Glove Box | 동승석 앞 글로브 박스를 열림 또는 닫힘 상태로 설정합니다.

## Safety​

| | 카드 | 기능
| | Telltales | 주차 브레이크, 안전벨트, ABS, TPMS 등 지원되는 경고등을 선택하여 Off, On, Blink 상태로 설정합니다.

## Energy​

| | 카드 | 기능
| | Remaining Range | 예상 주행 가능 거리를 0~1,000,000m 범위에서 1,000m 단위로 설정합니다.
| | Battery Energy | 구동 배터리의 현재 에너지를 0~200kWh 범위에서 0.1kWh 단위로 설정합니다.
| | Battery SOC | 구동 배터리의 충전 상태를 0~100% 범위에서 1% 단위로 설정합니다.
| | Battery Capacity | 구동 배터리의 최대 용량을 0~200kWh 범위에서 0.1kWh 단위로 설정합니다.
| | Charge Current Limit | 충전 전류 제한을 10~48A 범위에서 0.5A 단위로 설정합니다.
| | Charge Percent Limit | 목표 충전량을 50~100% 범위에서 5% 단위로 설정합니다.
| | Charge Switch | 충전 활성화 상태를 Off 또는 On으로 설정합니다.
| | Charge Port | 충전 포트 상태를 Closed 또는 Open으로 설정합니다.

## Climate​

| | 카드 | 기능
| | HVAC Power | 공조 시스템 전원 상태를 Off 또는 On으로 설정합니다.
| | Air Conditioning | 에어컨 작동 상태를 Off 또는 On으로 설정합니다.
| | HVAC Auto | 자동 공조 작동 상태를 Off 또는 On으로 설정합니다.
| | HVAC Dual | 운전석과 동승석의 공조 동기화 상태를 Off 또는 On으로 설정합니다.
| | Air Recirculation | 공기 유입 상태를 Fresh 또는 Recirculate로 설정합니다.
| | Fan Speed | 공조 풍량을 0~8단계로 설정합니다.
| | Fan Direction | 운전석 또는 동승석을 선택하여 송풍 방향을 Face, Floor, Defrost 중 하나로 설정합니다.
| | Defroster | 전면 또는 후면을 선택하여 성에 제거 기능을 Off 또는 On으로 설정합니다.
| | Target Temperature | 운전석 또는 동승석을 선택하여 목표 온도를 16~30°C 범위에서 0.5°C 단위로 설정합니다.
| | Seat Temperature | 운전석 또는 동승석을 선택하여 좌석 통풍 3단계, Off, 좌석 열선 3단계 중 하나로 설정합니다.
| | Air Cleaner | 공기 청정 기능의 작동 상태를 Off 또는 On으로 설정합니다.
