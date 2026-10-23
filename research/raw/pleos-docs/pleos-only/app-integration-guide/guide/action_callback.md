> 출처: https://document.pleos.ai/docs/pleos-only/app-integration-guide/guide/action_callback (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Callback Schema Writing Guide

## 1. Callback Schema란?​

- Callback Schema는 앱이 Gleo AI에 응답을 반환하는 방법을 정의하며, Gleo AI는 이를 바탕으로 사용자에게 표시할 텍스트 또는 음성 출력 형태의 최종 응답을 생성합니다.

- Callback Schema는 아래의 명세를 따르는 JSON 스키마를 따라야 합니다.

## 2. Callback Schema​

### 2.1 Fields​

- functionName(`string`, required): Callback을 발생시킨 intent action의 이름입니다.

- status(`enum`, 필수): 앱에서 Gleo Action을 호출한 의 상태를 나타냅니다.

- 가능한 값: "success", "asking", "fail"

- message(`string`, 필수): 호출 결과에 대한 짧은 설명으로, 완전한 문장으로 작성되어야 합니다.

- Message는 영어 문장이어야 하지만, 필요에 따라 다른 언어의 콘텐츠(예: 검색어, 특정 위치, 항목 이름 등)를 포함할 수 있습니다.

- mode(`enum`, 선택, 기본값은 "voice"): Gleo AI가 사용자에게 답변을 전달하는 방법을 나타냅니다.

- "voice" : 답변을 음성 출력으로 재생합니다.

- "beep" : 음성 출력 대신 효과음만을 재생합니다.

- "silent" : 음성 출력이나 효과음 없이 아무 소리도 재생하지 않습니다.

- 앱이 자체적으로 음성 출력이나 소리를 재생해야 할 때 이 mode를 선택할 수 있습니다.

- data(`string`, 선택): 요청 결과를 JSON 객체 배열 문자열 형식(key-value 형식의 객체들)으로 표현한 값입니다.

- 전체 결과를 그대로 반환하기보다는, Gleo AI가 적절한 응답을 생성하는 데 필요한 정보만을 포함하도록 하세요. Callback Schema 작성 가이드라인을 참조하세요.

### 2.2 `Status`에 대한 세부 정보​

- success

- Action이 정상적으로 처리되었을 때 사용됩니다.

- 결과가 없더라도 정상 처리된 경우라면 사용할 수 있습니다.

- `message` 예시:

- "The reminder has been added successfully."

- "The search was completed, but no matching results were found."

- asking

- Action을 실행하기 위해 추가 정보(예: 필수 parameter)가 필요하거나 사용자 확인 같은 후속 상호작용이 필요한 경우 사용됩니다.

- Message에는 누락되었거나 필요한 추가 정보에 대한 안내를 포함합니다.

- `message` 예시

- "Search term is required to search for a reminder."

- "It is necessary to select from the retrieved data."

- "Confirmation for the deletion request is required."

- fail

- Action이 완료될 수 없을 때 사용됩니다. 충족되지 않은 preconditions, conflicts, 기타 domain-level constraints로 인한 비즈니스 로직 실패뿐 아니라 app crash, network failure, internal server timeout 같은 system-level error도 포함합니다.

- message에는 실패 이유를 간략히 설명합니다.

- 참고로, Gleo는 timeout을 위해 7초 후 Action을 취소합니다.

- `message` 예시

- "The item already exists."

- "The list exceeds 10 items, so a new item cannot be added."

- "A timeout occurred while processing the request."

- "An unexpected internal error occurred."

## 3. Callback Schema 예시​

- Function이 앱에서 정상적으로 처리된 경우, Callback은 다음과 같습니다.

`{

  "functionName": "ADD_REMINDER",

  "status": "success",

  "message": "The reminder was successfully added.",

  "data": "[ { \"title\": \"미팅\", \"dateTime\": \"2025-02-20T06:00:00Z\" } ]"

}

`

- 필수 parameter가 누락된 경우, Callback은 다음과 같습니다.

`{

  "functionName": "ADD_REMINDER",

  "status": "asking",

  "message": "A registration date is required.",

  "data": "[ { \"missingField\": \"dateTime\" } ]"

}

`

- 논리 조건으로 인해 실행을 완료할 수 없을 경우:

`{

  "functionName": "ADD_REMINDER",

  "status": "fail",

  "message": "It exceeds 10 items, so it cannot be added."

}

`

- System-level error (예: app crash, timeout 또는 internal exception)로 실행이 실패한 경우에도 `fail`을 사용합니다.

`{

  "functionName": "ADD_REMINDER",

  "status": "fail",

  "message": "A timeout occurred while processing the request."

}

`

- 앱에서 자체적으로 TTS를 재생하거나 음악 재생을 시작하고자 할 경우, `"mode": "silent"`를 설정하면 Gleo의 TTS를 비활성화할 수 있습니다.

- 이 경우 Gleo AI는 실제 사용자 상호작용에 접근할 수 없기 때문에 Callback에만 전적으로 의존하게 됩니다.

`{

  "functionName": "PLAY_FREQUENCY",

  "status": "success",

  "message": "Starting the requested station now.",

  "data": "[ { \"stationName\": \"SBS 파워FM\", \"frequency\": \"107.7MHz\" } ]",

  "mode": "silent"

}

`

- Gleo AI가 TTS 대신 짧은 완료음만 재생하도록 하려면, `"mode": "beep"`를 사용하세요.

`{

  "functionName": "PLAY_MUSIC",

  "status": "success",

  "message": "Playback started.",

  "data": "[ { \"track\": \"Love Dive\", \"artist\": \"IVE\" } ]",

  "mode": "beep"

}

`

## 4. Callback Schema 작성 가이드라인​

- `functionName` 필드

- Callback을 발생시킨 App Schema의 function 이름(actionCalls → function → name)과 일치해야 합니다.

- `data` 필드

- 선택 사항이지만 `data`를 반환하는 것을 강력히 권장합니다. 이는 Gleo AI가 더 정확하고 근거 있는 응답을 생성하는 데 필요한 문맥을 제공하기 때문입니다.

- 또한, Callback의 `mode`가 "silent" 또는 "beep"일 때도 `data`를 포함하면 Gleo AI가 상호작용의 문맥을 이해하고 연속성을 유지하는 데 도움이 될 수 있습니다.
