> 출처: https://document.pleos.ai/docs/connect/guide/getting-started/application-development/use-vehicle-emulator (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Pleos Connect Virtual Console 셋업 가이드

## Pleos Connect Virtual Console​

Pleos Connect Virtual Console은 Pleos Connect Emulator 환경에서 차량 핵심 기능을 재현하고 시뮬레이션하는 개발·테스트 도구입니다.
앱 개발자는 실제 사용자 동작과 유사한 방식으로 차량 상태와 이벤트를 조작하여 다음 항목을 확인할 수 있습니다.

- 차량 속도, 도어, 조명 등 차량 상태 변경

- 주행 및 차량 이벤트 시나리오 재현

- 앱 화면에 반영되는 실시간 차량 상태 확인

- 차량 제어 명령의 정상 동작 확인

- 반복 테스트 및 데모 시나리오 실행

정보
Pleos Connect Virtual Console를 지원하는 Pleos Connect Emulator 최소 버전은 v2.1.0입니다.
Pleos Connect Virtual Console가 정상 동작하지 않을 경우 Pleos Connect Emulator의 버전을 확인하세요.

## Pleos Connect Virtual Console 실행 방법​

Pleos Connect Emulator를 실행한 후 Pleos Connect Virtual Console를 사용하려면 다음 두 단계를 수행합니다.

-
터미널에서 에뮬레이터의 8088 포트를 포워딩합니다.

`adb forward tcp:8088 tcp:8088

`

-
PC 브라우저에서 다음 주소를 엽니다.

`http://127.0.0.1:8088/

`

## 주요 기능​

Pleos Connect Virtual Console에서 기어, 스티어링 휠, 공조, 도어·윈도우 등의 차량 기능을 시뮬레이션할 수 있습니다.

[이미지: Pleos Connect Virtual Console의 주요 기능 시연]

### Emulation Controls​

Emulation Controls에서는 Domain별로 차량 기능을 찾아 상태를 설정하고, Pleos Connect Emulator와 앱의 반응을 확인할 수 있습니다. 왼쪽 Domain 목록에서 영역을 선택한 다음 원하는 기능 카드의 값을 변경할 수 있습니다.

[이미지: Pleos Connect Virtual Console의 Emulation Controls 화면]

| | Domain | 설명
| | Vehicle | 차량 알림의 표시 또는 숨김 상태를 시뮬레이션합니다. 알림 상태에 따른 Pleos Connect Emulator와 앱의 동작을 확인할 수 있습니다.
| | Motion | 기어, 브레이크, 스티어링 휠 각도와 주행 거리를 설정합니다. 스티어링 휠 열선 단계도 시뮬레이션할 수 있습니다.
| | ADAS | 크루즈 제어의 준비 및 활성 상태와 목표 속도를 설정합니다. 설정한 주행 보조 상태가 앱에 반영되는지 확인할 수 있습니다.
| | Convenience | 도어·창문·트렁크, 시트, 조명, 와이퍼와 같은 편의 장치의 상태와 동작을 시뮬레이션합니다. ETCS 시나리오와 글로브 박스도 제어할 수 있습니다.
| | Safety | 주차 브레이크, 안전벨트, ABS 등 차량 경고등의 꺼짐·켜짐·점멸 상태를 설정합니다. 경고 상태에 따른 화면 표시를 확인할 수 있습니다.
| | Energy | 주행 가능 거리, 배터리 용량과 충전 상태를 설정합니다. 충전 전류·목표 충전량·충전 포트 상태도 시뮬레이션할 수 있습니다.
| | Climate | 공조 전원, 온도, 풍량, 송풍 방향, 내기순환과 제상 상태를 설정합니다. 좌석 열선·통풍과 공기 청정 기능도 제어할 수 있습니다.

Emulation Controls에서 제공하는 전체 카드와 설정 범위는 Pleos Connect Virtual Console 사용 가이드에서 확인하세요.

### 테마 및 시점 변경​

테마 메뉴를 통해 화면 상단의 주행 시각화 영역의 디자인을 변경할 수 있습니다. 테마 변경은 차량 테스트 기능에 영향을 주지 않습니다.

- 기어가 P 상태일 때 왼쪽 상단 테마 버튼을 통해 Highway 테마 또는 Forest 테마로 전환할 수 있습니다.

- Highway 테마에서는 오른쪽 상단의 First person 또는 Third person 버튼을 통해 1인칭 또는 3인칭 시점을 선택할 수 있습니다.

[이미지: Pleos Connect Virtual Console의 테마 및 시점 변경 시연]

## 문제 해결​

Pleos Connect Virtual Console에 접속할 수 없는 경우 다음 항목을 순서대로 확인합니다.

- Pleos Connect Emulator가 실행 중인지 확인합니다.

- Pleos Connect Virtual Console를 지원하는 Pleos Connect Emulator 이미지를 사용하고 있는지 확인합니다.

- `adb devices` 명령으로 에뮬레이터가 ADB에 연결되어 있는지 확인합니다.

- `adb forward tcp:8088 tcp:8088`을 다시 실행합니다.

- PC의 8088 포트를 다른 프로세스가 사용하고 있지 않은지 확인합니다.

- PC 브라우저에서 `http://127.0.0.1:8088/`로 다시 접속합니다.
