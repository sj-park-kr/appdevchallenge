> 출처: https://document.pleos.ai/docs/pleos-only/app-integration-guide/guide/examples (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Code Details with Examples

## 1. Gleo Action​

### 1.1 Android Intent 변환​

Gleo AI가 사용자의 요청인 “오늘 오후 3시에 미팅 리마인더를 추가해줘”를 해석하면, 다음과 같은 JSON 객체를 생성합니다.

`{

    "packageName": "ai.dot42.pleos.reminderapp",

    "action": "ADD_REMINDER",

    "actionParameters": {

      "title": "미팅",

      "dateTime": "2025-02-20T06:00:00Z"

    }

}

`

- 이후 Gleo AI는 이 객체를 Android Intent로 변환하여 외부 앱으로 전달합니다. 변환 과정은 다음 규칙을 따릅니다.

- `action` 값은 Intent의 action으로 설정됩니다.

- `packageName` 값은 대상 앱을 지정하는 데 사용됩니다.

- `actionParameters` JSON 객체는 파싱되며, 각 key-value 쌍이 개별적으로 Intent에 추가됩니다 (putExtra).

- 아래는 startActivity를 사용하여 데이터 전달 및 외부 앱을 실행하는 예시입니다 (`component`="activity").

Sending Side (Gleo AI)
`val intent = Intent()

intent.action = "ADD_REMINDER"

intent.putExtra(

    "ACTION_PARAM",

    "\"{\"title\":\"미팅\", \"dateTime\":\"2025-02-20T06:00:00Z\"}\""

)

intent.setPackage("ai.dot42.pleos.reminderapp")

context.startActivity(intent)

`

Receiving Side (3rd-party App)
`class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        // ...

        val bundle = intent?.extras

        bundle?.let { data ->

            runCatching {

                val actionParam = data.getString("ACTION_PARAM")

                // ...

            }.onFailure {

                Log.e(logTag, "Failed to get intent extras: $it")

            }

        }

    }

}

`

- 아래는 sendBroadcast를 사용하여 데이터 전달 및 외부 앱을 실행하는 예시입니다 (`component`="service")

Sending Side (Gleo AI)
`val intent = Intent()

intent.action = "ADD_REMINDER"

intent.putExtra(

    "ACTION_PARAM",

    "\"{\"title\":\"미팅\", \"dateTime\":\"2025-02-20T06:00:00Z\"}\""

)

intent.setPackage("ai.dot42.pleos.reminderapp")

context.sendBroadcast(intent)

`

Receiving Side (3rd-party App)
`class CustomReceiver : BroadcastReceiver() {

    override fun onReceive(

        context: Context,

        intent: Intent

    ) {

        if (intent.action == "ADD_REMINDER") {

            val rawJson = intent.getStringExtra("ACTION_PARAM") ?: "{}"

            try {

                // JSON parsing

                val json = JSONObject(rawJson)

                val title = json.optString("title", "No Title")

                val dateTime = json.optString("dateTime", "No DateTime")

                // To Do..

                Log.d("ReminderReceiver", "Title: $title, DateTime: $dateTime")

            } catch (e: Exception) {

                e.printStackTrace()

                Log.e("ReminderReceiver", "Failed to parse actionParameters")

            }

        }

    }

}

`

## 2. Callback​

- Gleo AI는 다음 형식의 Broadcast를 수신해야 합니다.

`{

  "functionName": "SWITCH_BAND",

  "status": "success",

  "message": "Successfully switched to the requested radio channel.",

  "data": "[{\"frequency\": \"91.9MHz\", \"frequencyBand\": \"FM\", \"stationName\": \"MBC\", \"channelName\": \"MBC FM4U\"}]"

}

`

- Gleo AI는 Android 서비스이므로 broadcast 수신이 가능합니다.

- 아래는 Gleo AI에 broadcast 응답을 전송하는 샘플 코드입니다.

Sending Side (3rd-party App)
`import android.content.Intent

import android.util.Log

import org.json.JSONArray

import org.json.JSONObject

fun sendGleoBroadcast(

    functionName: String,

    status: String,

    message: String,

    data: String? = null

) {

    runCatching {

        val jsonObject = JSONObject().apply {

            put("functionName", functionName)

            put("status", status)

            put("message", message)

            data?.let { put("data", it) }

        }

        Intent("ai.pleos.playground.intent.action.APP_ACTION_RESPONSE").apply {

            putExtra("packageName", packageName)

            putExtra("response", jsonObject.toString())

        }.also {

            sendBroadcast(it)

            Log.d("ThirdPartyApp", "respondAction success jsonObject: $jsonObject")

        }

    }.onFailure {

        Log.e("ThirdPartyApp", "respondAction onFailure >> $it")

    }

}

`

Sending Side (3rd-party App)
`sendGleoBroadcast(

    functionName = "SWITCH_BAND",

    status = "success",

    message = "Successfully switched to the requested radio channel.",

    data = """[{"frequency":"91.9MHz","frequencyBand":"FM","stationName":"MBC","channelName":"MBC FM4U"}]"""

)

`
