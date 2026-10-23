> 출처: https://document.pleos.ai/docs/connect/guide/getting-started/application-development/configure-pleos-connect-emulator (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Pleos Connect Emulator 설정

## AVD 설정​

Pleos Connect Emulator는 Pleos Connect SDK를 사용해서 구현한 앱을 테스트할 수 있는 환경을 제공합니다.

실제 차량에 접근한 것처럼 테스트 해볼 수 있도록 Pleos Connect Virtual Console을 제공합니다.
셋업 방법은 Pleos Connect Virtual Console 셋업 가이드를, 사용 방법은 Pleos Connect Virtual Console 사용 가이드를 참조하시기 바랍니다.

Pleos Connect Emulator를 설치한 후에 다음과 같이 AVD를 설정합니다.

[AVD 그래픽 카드 권장/최소 사양]
Pleos Connect Emulator를 실행하려면 그래픽 카드가 필수입니다.
권장 사양과 최소 사양을 확인하세요.권장 사양

- NVIDIA RTX 4060/5060 Laptop 8GB 이상

- AMD Radeon RX 7700S/RX 7600M XT 8GB급 이상 외장 GPU

최소 사양

- NVIDIA GeForce RTX 3060 Laptop GPU 6GB 이상

- AMD Radeon RX 6600M 8GB 또는 RX 6700S 8GB 이상

### 언어 설정​

Pleos Connect Emulator는 한글을 기본으로 사용합니다. 영어로 바꾸려면 에뮬레이터 UI 메뉴에서 언어를 변경합니다.

차량 설정 > 일반 설정 > 언어/Language 항목에서 `English`를 선택합니다.

## 마이크 접근 설정​

SpeechToText(STT) 기능 테스트를 위해 에뮬레이터에서 마이크 접근을 설정합니다.

- 에뮬레이터 패널에서 Extended Controls 화면을 엽니다.

- Microphone 메뉴 화면에서 오디오 입력을 수신하도록 설정합니다.

정보
자세한 내용은 안드로이드 공식문서(https://developer.android.com/studio/run/emulator-extended-controls?hl=ko#standalone-window)를 참조 바랍니다.

## Cold boot 설정​

Pleos Connect Emulator 설치 후 AVD 디바이스를 추가할 때 `Boot options`를 반드시 `cold boot`로 설정해야 합니다. `quick boot`로 설정할 경우에는 VHAL을 이용할 수 없습니다. 설정 절차에 대한 상세한 설명은 다음 문서를 참고하여 주십시오.

- Pleos Connect Emulator 설치 및 실행

## AVD에서 Bluetooth 동글 연동​

본 가이드에서 다루는 Pleos Connect Emulator 버전에서는 AVD Bluetooth 동글 연동을 지원하지 않습니다.
