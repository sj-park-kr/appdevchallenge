> 출처: https://document.pleos.ai/docs/pleos-only/app-test-guide/form-factor-test-guide (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# 폼 팩터 테스트 가이드
폼 팩터 테스트에서는 실행 중인 Pleos Connect Emulator에 가상 디스플레이를 생성하고, 테스트할 앱을 해당 디스플레이에서 실행합니다. FormFactorConsole 앱에서 디스플레이 종류와 방향을 변경하며 앱 화면이 정상적으로 표시되는지 확인할 수 있습니다.

## 시작하기 전에​

다음 항목을 준비하세요.

- Android Studio와 Android SDK Platform-Tools

- Go 1.22 이상

- 테스트할 앱이 설치된 Pleos Connect Emulator

- `8095`, `8096` 포트를 사용할 수 있는 환경

주의
가상 디스플레이는 Android Emulator를 별도 창으로 실행할 때 표시됩니다. Android Studio의 Running Devices 도구 창에 내장하거나 Headless 모드로 실행하지 마세요.

## 1. AVD 설정 및 실행​

System Image 추가, AVD 생성 및 실행 방법은 AVD 실행 가이드를 참고하세요.

AVD를 실행한 후 터미널에서 연결 상태를 확인합니다.

`adb devices

`

여러 기기가 연결되어 있다면 이후 명령의 `<SERIAL>`에 테스트할 AVD의 시리얼(예: `emulator-5554`)을 입력합니다. 다음 명령으로 실행 중인 AVD 이름을 확인하고, 출력된 이름을 복사합니다.

Command

`adb emu avd name

`

Expected output

`Pleos_Connect_v2.0

OK

`

## 2. Host Display Bridge 실행​

Host Display Bridge는 호스트의 FormFactorConsole과 Android Emulator 사이에서 가상 디스플레이 생성 및 제거 요청을 전달합니다.

- host-display-bridge.zip을 다운로드하고 압축을 해제합니다.

- 터미널에서 압축을 해제한 `host-display-bridge` 디렉터리로 이동합니다.

- 앞에서 확인한 AVD 이름을 `<AVD_NAME>`에 입력하여 Bridge를 실행합니다.

Command

`go run . --avd "Pleos Connect v2.0"

`

Expected output

`2026/09/27 17:58:15 ConnectWebConsole host display bridge listening on http://127.0.0.1:8096

2026/09/27 17:58:15 Emulator gRPC target: 127.0.0.1:8554 (AVD: Pleos Connect v2.0)

2026/09/27 17:58:15 Emulator discovery file: C:\Users\A17315\AppData\Local\Temp\avd\running\pid_131004.ini

`

`http://127.0.0.1:8096`에서 요청을 수신한다는 로그가 표시되면 정상적으로 실행된 상태입니다. 테스트가 끝날 때까지 이 터미널을 종료하지 마세요.

팁
Bridge가 AVD를 찾지 못하면 AVD가 완전히 부팅되었는지와 `--avd`에 입력한 이름을 확인하세요. 여러 AVD가 실행 중일 때는 테스트하지 않을 AVD를 종료한 후 다시 실행하는 것을 권장합니다.

## 3. FormFactorConsole 접속​

에뮬레이터에서 FormFactorConsole앱을 실행합니다.

[이미지: FormFactorConsole 앱 실행]
페이지 상단에 `UNAVAILABLE`이 표시되면 Host Display Bridge가 실행 중인지 확인한 후 Refresh를 선택하세요.

[이미지: FormFactorConsole Unavailable 상태]
페이지 상단에 `DISCONNECTED`와 DISPLAY2가 없습니다. 문구가 표시되면 폼 팩터 테스트가 준비된 상태입니다.

[이미지: FormFactorConsole Disconnected 상태]

## 4. 폼 팩터 테스트​

-
Display preset에서 테스트할 폼 팩터를 선택합니다.

[이미지: WindowPolicy에서 테스트할 디스플레이 폼 팩터를 선택하는 화면]

-
Orientation에서 `Portrait` 또는 `Landscape`를 선택합니다.

[이미지: WindowPolicy에서 Portrait 또는 Landscape 방향을 선택하는 화면]

-
테스트 화면 크기에 표시된 dp, DPI, px 값을 확인합니다.

-
가상 디스플레이 생성을 선택합니다.

12.9인치 Portrait 가상 디스플레이를 생성하면 다음과 같이 표시됩니다.

[이미지: 12.9인치 Portrait 가상 디스플레이 생성 화면]
14.6인치 Landscape 가상 디스플레이를 생성하면 다음과 같이 표시됩니다.

[이미지: 14.6인치 Landscape 가상 디스플레이 생성 화면]

-
새로 열린 `DISPLAY2` 창에서 앱 목록을 확인합니다. 앱 목록이 자동으로 열리지 않으면 앱 목록 실행을 선택합니다.

-
다음 항목을 확인합니다.

- 화면 요소가 잘리거나 겹치지 않는지

- 텍스트, 이미지 및 아이콘의 크기와 정렬이 적절한지

- 가로·세로 방향에 맞게 레이아웃이 배치되는지

- 터치와 화면 전환이 정상적으로 동작하는지

-
다른 폼 팩터를 테스트하려면 가상 디스플레이 제거를 선택한 후 1~6단계를 반복합니다.

주의
가상 디스플레이를 제거하면 해당 디스플레이에서 실행한 앱이 강제 종료됩니다. 저장하지 않은 테스트 데이터가 있다면 먼저 저장하세요.

## 테스트 종료​

- FormFactorConsole에서 가상 디스플레이 제거를 선택합니다.

- Host Display Bridge가 실행 중인 터미널에서 `Ctrl+C`를 눌러 종료합니다.

- ADB 포트 포워딩을 제거합니다.

`adb forward --remove tcp:8095

`
