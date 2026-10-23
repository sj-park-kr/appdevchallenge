> 출처: https://document.pleos.ai/docs/pleos-only/app-integration-guide/guide/app-capability (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# App Schema Writing Guide

## 1. App Schema란?​

- App Schema는 Gleo AI가 앱 내 특정 function을 호출할 수 있도록 필요한 필드와 형식을 정의합니다.

- App Schema는 아래 명세를 따르며 JSON Schema를 기반으로 해야 합니다.

## 2. App Schema​

### 2.1 Fields​

- packageName(`string`): Android 애플리케이션의 패키지명입니다.

- appDescription(`string`): 앱의 주요 목적을 명확히 나타내는 간결한 설명입니다. App Schema 작성 가이드라인를 참조합니다.

- version(`string`): Pleos 앱 마켓에 등록된 애플리케이션 버전입니다.

- actionCalls(`array`): 음성 명령으로 호출할 수 있는 function 목록입니다 (최대 3개).

- type(`string`, "function"으로 고정)

- function(`object`)

- component(`string`, 기본값 "activity"): Android에서 Gleo AI가 function을 호출하는 방식을 지정합니다. 앱의 설계와 사용 사례에 따라 두 방법 중 하나를 적용할 수 있습니다.

- "activity": Android의 `context.startActivity()` 메서드를 사용하여 action을 실행합니다. 포어그라운드 UI 실행이나 사용자 상호작용이 필요한 경우 사용합니다.

- "service": Android의 `context.sendBroadcast()` 메서드를 사용하여 action을 전송합니다. UI 없이 백그라운드 처리가 필요한 경우에 적합합니다.

- name(`string`): 앱 내에서 호출을 구분하기 위해 사용되는 고유한 function 이름입니다. 반드시 모든 글자를 알파벳 대문자로 작성하고 각 단어는 밑줄(_)로 구분해야 합니다.

- description(`string`): Function의 목적과 역할을 명확하고 간결하며 완전하게 설명하는 문장입니다.

- parameters(`object`)

- type(`string`, "object"로 고정)

- properties(`object<string, object>`): function 호출 때 Gleo AI가 전달할 parameter를 정의하는 object입니다.

- 각 property의 이름은 앱이 function 입력으로 받을 parameter명입니다.

- 각 property의 값은 parameter의 `type`과 `description`을 지정하는 object입니다. `type`은 전달될 데이터 유형을, `description`은 그 값이 무엇을 나타내는지 설명합니다. 허용 가능한 값의 범위가 정해져 있는 경우, `enum`에 해당 문자열 값의 목록을 지정할 수 있습니다.

- JSON Schema 전체 기능을 지원하지 않기 때문에, 아래 App Schema 작성 가이드라인과 App Schema 예시를 참조하세요.

- required(`array<string>`): function 실행 시 필수적인 parameter 이름의 배열입니다.

## 3. App Schema 예시​

다음 예시는 세 가지 function을 지원하는 앱(packageName: `ai.dot42.pleos.reminderapp`)을 기반으로 합니다.

`{

  "packageName": "ai.dot42.pleos.reminderapp",

  "appDescription": "A reminder app that lets you schedule tasks and receive notifications at the right time.",

  "invokeWord" : "리마인더",

  "version" : "1.0.0",

  "actionCalls": [

    {

      "type": "function",

      "function": {

        "name": "ADD_REMINDER",

        "description": "Add a reminder that will notify the user at the given date and time.",

        "parameters": {

          "type": "object",

          "properties": {

            "title": {

              "type": "string",

              "description": "Title of the reminder."

            },

            "dateTime": {

              "type": "string",

              "description": "Date and time to trigger the reminder notification, in ISO 8601 date and time format."

            }

          },

          "required": ["title", "dateTime"]

        },

        "component": "activity"

      }

    },

    {

      "type": "function",

      "function": {

        "name": "SEARCH_REMINDER",

        "description": "Search for a reminder that matches or contains the search term.",

        "parameters": {

          "type": "object",

          "properties": {

            "searchTerm": {

              "type": "string",

              "description": "The keyword for searching a reminder."

            }

          },

          "required": ["searchTerm"]

        },

        "component": "activity"

      }

    },

    {

      "type": "function",

      "function": {

        "name": "DELETE_REMINDER",

        "description": "Delete a reminder from the list of reminders.",

        "parameters": {

          "type": "object",

          "properties": {

            "searchTerm": {

              "type": "string",

              "description": "The title or keyword for deleting a reminder."

            }

          },

          "required": ["searchTerm"]

        },

        "component": "activity"

      }

    }

  ]

}

`

## 4. App Schema 작성 가이드라인​

- `actionCalls`

- `actionCalls`는 사용자의 음성 명령으로 실행할 수 있는 function들을 포함합니다. 최대 3개로 제한되지만, 사용자는 화면(디스플레이) 상의 상호작용을 통해 앱의 다른 기능들도 사용할 수 있습니다.

- Function 이름

- App Schema 내 각 function 이름은 고유해야 하며, 다른 function과 중복되지 않아야 합니다.

- 최상의 성능을 위해 각 function은 여러 호출 없이도 단독으로 사용자 명령을 수행할 수 있도록 설계하는 것이 좋습니다.

- 단순히 동사만 사용하는 것보다, 2~3개의 단어로 구체적인 대상까지 포함해 작성하는 것을 권장합니다.

- 앱, function 및 parameter의 description

- 모든 description은 영어로 작성해야 합니다.

- Gleo AI의 동작을 조작하려 하거나 다른 앱이나 function 사용을 억제하는 문구를 포함하지 마세요.

- Description 내에 구체적인 예시를 제공하지 마세요. 이는 Gleo AI가 맥락에 기반하여 action을 호출하는 데 방해가 될 수 있습니다.

- Description은 간결하지만 앱, function 또는 parameter의 의미와 역할을 포괄적으로 설명해야 합니다. 한 문장(최대 두 문장)으로 작성하는 것이 권장됩니다.

- Parameter properties

- Parameter의 type은 string, number, boolean, array 중 하나여야 합니다.

- `type`에는 하나의 값만 지정할 수 있습니다. `"type": ["string", "null"]`처럼 여러 type을 배열로 지정하는 형식은 지원하지 않습니다.

- `enum`을 지정하는 경우 문자열 값만 사용할 수 있습니다. JSON Schema에서 허용하는 `null` 값은 지원하지 않습니다.

- 현재 지원되는 type은 제한적이지만, 향후 type 검증 기능과 함께 점차 확대될 예정입니다.

- Parameter 이름은 LLM이 쉽게 이해할 수 있도록 값을 명확하게 나타내는 이름이어야 합니다.

- `required` 필드

- function 호출 시 필요한 parameter를 포함해야 합니다. 선택적 parameter는 포함하지 마세요.

- Gleo AI가 모든 필수 parameter를 채워줄 것을 보장하지는 않지만, 이 필드에 명시하면 실행 성공률을 높일 수 있습니다.
