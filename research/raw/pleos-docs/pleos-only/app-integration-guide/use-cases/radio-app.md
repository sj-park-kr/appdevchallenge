> 출처: https://document.pleos.ai/docs/pleos-only/app-integration-guide/use-cases/radio-app (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# How to Integrate Radio App with Gleo AI

## 1. App Schema 예시​

- 라디오 앱을 위한 App Schema의 예시는 다음과 같습니다.

`  {

    "packageName": "ai.umos.mediaapp",

    "appDescription": "An app for streaming live radio stations.",

    "actionCalls": [

      {

        "type": "function",

        "function": {

          "name": "SWITCH_BAND",

          "description": "Changes between FM and AM radio bands.",

          "parameters": {

            "type": "object",

            "properties": {

              "band": {

                "type": "string",

                "enum": [

                  "FM",

                  "AM"

                ],

                "description": "The radio band to switch to."

              }

            },

            "required": [

              "band"

            ]

          },

          "component": "service"

        }

      },

      {

        "type": "function",

        "function": {

          "name": "SEARCH_STATION",

          "description": "Searches radio stations based on a keyword or frequency.",

          "parameters": {

            "type": "object",

            "properties": {

              "searchTerm": {

                "type": "string",

                "description": "The keyword to search for in station names or frequencies."

              }

            },

            "required": [

              "searchTerm"

            ]

          },

          "component": "activity"

        }

      },

      {

        "type": "function",

        "function": {

          "name": "PLAY_FREQUENCY",

          "description": "Plays the specified radio frequency.",

          "parameters": {

            "type": "object",

            "properties": {

              "frequency": {

                "type": "number",

                "description": "The radio frequency to play. For FM band it can be both in MHz and kHz. AM frequency should be given in kHz."

              }

            },

            "required": [

              "frequency"

            ]

          },

          "component": "service"

        }

      }

    ]

  }

`

Receiving Side (Radio App)
`private fun handleIntent(intent: Intent?) {

    if (intent == null) return

    val bundle = intent.extras

    bundle?.let { data ->

        runCatching {

            val actionParam = data.getString("ACTION_PARAM") ?: "{}"

            val json = JSONObject(actionParam)

            when (intent.action) {

                "SEARCH_STATION" -> {

                    val searchTerm = json.optString("searchTerm", "Unknown")

                    Log.d("RadioReceiver", "Searching radio station with search term: $searchTerm")

                    // TODO: Implement logic to play the radio based on searchTerm

                }

                "SWITCH_BAND" -> {

                    val band = json.optString("band", "Unknown")

                    Log.d("RadioReceiver", "Switching band to: $band")

                    // TODO: Implement logic to switch band

                }

                "PLAY_FREQUENCY" -> {

                    // TODO: Implement for PLAY_FREQUENCY

                }

                else -> {

                    Log.w("RadioReceiver", "Unknown action received: ${intent.action}")

                }

            }

        }.onFailure {

            Log.e("RadioReceiver", "Failed to get intent extras: $it")

        }

    }

}

...

private fun sendCallback(functionName: String, status: String, message: String) {

    val response = JSONObject()

    try {

        response.put("functionName", functionName)

        response.put("status", status)

        response.put("message", message)

        response.put("data", data) // optional

    } catch (e: JSONException) {

        e.printStackTrace()

    }

    // Send response back to Gleo AI (e.g., via an API or broadcast)

}

`

- 라디오 앱은 위에서 언급한 각 function에 대한 앱 intent를 생성하고 앱 내에서 해당 처리 로직을 실행합니다.

- 라디오 앱은 Gleo AI로부터 `SEARCH_STATION(searchTerm="SBS Power FM")`과 같은 intent를 수신합니다. 그런 후 LLM/Search SDK 또는 SQLite 데이터베이스를 사용하여 제공된 검색어를 기반으로 적절한 채널을 검색하고 해당 주파수를 재생합니다.

## 2. Callback 예시​

- 라디오 앱에 대한 Callback 예시는 다음과 같습니다.

SEARCH_STATION - 성공

`{

  "functionName": "SEARCH_STATION",

  "status": "success",

  "message": "The radio has started playing successfully.",

  "data": "[\n  {\n    \"frequency\": \"91.9MHz\",\n    \"frequencyBand\": \"FM\",\n    \"stationName\": \"MBC\",\n    \"channelName\": \"MBC FM4U\"\n  }\n]"

}

`

SEARCH_STATION - 실패

`{

  "functionName": "SEARCH_STATION",

  "status": "fail",

  "message": "Failed to play the requested radio. Please check the station name or frequency."

}

`

SEARCH_STATION - 확인 요청 (다수 일치)

`{

  "functionName": "SEARCH_STATION",

  "status": "asking",

  "message": "Multiple stations match your request. Please specify the frequency or channel name.",

  "data": "[\n  {\n    \"frequency\": \"91.9MHz\",\n    \"frequencyBand\": \"FM\",\n    \"stationName\": \"MBC\",\n    \"channelName\": \"MBC FM4U\"\n  },\n  {\n    \"frequency\": \"95.9MHz\",\n    \"frequencyBand\": \"FM\",\n    \"stationName\": \"MBC\",\n    \"channelName\": \"MBC Standard FM\"\n  }\n]"

}

`
