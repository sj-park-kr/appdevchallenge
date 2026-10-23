# Pleos 공식 문서 정리 (개발 가이드 / 앱 연동 / 앱 등록)

원문 위치: `C:\Users\PC001\develop\appdevchallenge\research\raw\pleos-docs\pleos-only\`
범위: vehicle-app-developer-guide (adb-command-reference-guide.md 제외), app-integration-guide, app-registration-guide
표기: 원문 인용은 인용 블록, 문서에 없는 내용은 "문서에 없음"으로 표기.

---

## 1. 주행 규제 개발 가이드 (driving-restriction-development-guide.md)

**주행 상태를 앱이 아는 방법: `CarUxRestrictions` 콜백 하나뿐**

- 원문: "`CarUxRestrictionsManager`에 `registerListener()`를 등록하면 `onUxRestrictionsChanged()` 콜백으로 변경된 `CarUxRestrictions`를 수신합니다."
- 원문: "플랫폼이 지역별 규제 사양에 맞는 `ActiveRestrictions`를 내려주므로, 앱은 notify로 수신한 `CarUxRestrictions`만 반영하면 됩니다."
- 원문: "DO를 선언한 앱도 주행 규제가 활성화되면 `CarUxRestrictions`와 `ActiveRestrictions`를 확인하여 기능별 UX 제한을 직접 적용해야 합니다."

**제한 판단 코드 (문서 샘플 그대로)**

```java
if (mCurrentCarUxRestrictions.isRequiresDistractionOptimization()
        && (mCurrentCarUxRestrictions.getActiveRestrictions()
            & CarUxRestrictions.UX_RESTRICTIONS_NO_VIDEO) != 0) {
    stopPlayingVideo();
}
```

- 기능별 플래그 예: `UX_RESTRICTIONS_NO_VIDEO` (동영상/DMB 재생 제한).
- 문서에 없음: 제한 시 우리 같은 "입력 UI"를 어떻게 바꿔야 하는지(잠금, 비활성화, 숨김 등) 구체 규칙. 샘플은 동영상 정지 1건뿐.
- 문서에 없음: 주행 중 여부를 기어(P/D) 또는 시동 상태로 직접 알려주는 API. 이 문서 기준으로는 `CarUxRestrictions`가 유일한 신호다.
- 문서에 없음: 플래그 전체 목록. "기능별 지역 허용·잠금 정보는 지역별 주행 규제 정책을 참조"라고만 되어 있고, 그 정책 문서는 이 묶음에 없다.
- UX 규제 피그마 사양서는 Pleos Playground에 공개하지 않는다고 명시.

---

## 2. CCP 개발 가이드 (ccp-rotary-controller-development.md)

**앱 분류별 CCP 요건**

- User-installed(App Market 배포, 사용자 설치): CCP 지원 여부는 개발사가 선택. 미지원도 등록 제한 없음. 단, **"CCP 미지원 앱은 필수 조작을 터치만으로 완결할 수 있어야 합니다."**
- Pre-installed(기본 탑재): CCP 지원 필수, 계약서에 명시. 초기 릴리즈부터 회전·클릭·방향 이동 지원. 누락·비활성화 허용 안 됨. 미지원이면 승인 불가.
- System 앱: 플랫폼/OEM 포함.
- 우리 앱이 어느 분류인지는 문서로 확정 안 됨. 공모전 맥락에서 App Market 배포 기준인지 확인 필요(문서에 없음).

**CCP 미지원 선언 (User-installed만 해당)**

```xml
<application ...>
    <meta-data
        android:name="com.hmg.rotary.ROTARY_SUPPORTED"
        android:value="false" />
</application>
```

**CCP Back 하드키 처리 (필수)**

- 원문: "앱 내 최상단 포커스(더 이상 이전 화면으로 이동할 수 없는 상태)에서 CCP Back 하드키가 입력되면 앱을 종료하지 않고 숨김(Hide) 처리해야 합니다. 숨김 이후에도 미디어 사운드 출력 등 백그라운드에서 유지되어야 하는 기능은 계속 동작해야 합니다."
- 하위 화면/팝업이 있으면 기존 Back 정책(이전 화면 이동 또는 팝업 닫기).
- 선행 확인: CCP Back이 Android 표준 Back 이벤트로 전달되는지 확인 후 `OnBackInvokedDispatcher` 등 Back API 사용.
- 숨김 구현: `moveTaskToBack(true)` 호출. `finish()`, `finishAffinity()` 금지.
- 원문: "Task를 백그라운드로 이동한 경우에도 앱 프로세스가 종료될 수 있으므로 필요한 상태는 별도로 저장하고 복원해야 합니다."
- 원문: 최상단 Back에서 종료되거나 숨김이 미구현이면 **심사 반려 대상**.

**CCP 심사 항목 (Pre-installed 대상이지만 참고용)**

- 포커스 이동이 모든 주요 UI에서 정상, 회전 시 리스트 스크롤, 클릭 확인, 역방향(뒤로/취소), 터치 전용 UI 없음, 운전 중 차단 요소 준수.

**CCP UX 가이드라인**

- 원문: "Pleos Connect CCP UX Guideline" (본문 내용은 이미지/링크로만 있고 텍스트 없음 → 문서에 없음)

---

## 3. IME 동작에 따른 window resize 처리 가이드 (ime-window-resize-handling-guide.md)

**Pleos Connect 사양 (표 원문)**

- EditText 또는 TextField가 있는 window: IME 표시 시 view가 IME에 의해 위로 밀려 올라가는 것이 사양.
- EditText 또는 TextField가 없는 window: IME 표시 시 view가 앵커링되지 않아야 함. 앱에서 수정 필요.
- 원문: "이 동작은 Pleos Connect 플랫폼 정책이 아니라 AOSP 기본 동작입니다." (Android는 IME 표시 시 IME insets만큼 view 크기를 조정)

**IME insets 제외 (EditText 없는 다이얼로그에 적용)**

```kotlin
// App Dialog
val dialog = Dialog(this)
val window = dialog.window
window?.let { win ->
    val params = win.attributes
    val typesToFit = WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()
    params.setFitInsetsTypes(typesToFit)
    window.attributes = params
}
dialog.setContentView(R.layout...)
dialog.show()

// System Dialog (WindowManager.addView)
val params = WindowManager.LayoutParams(...)
val typesToFit = WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()
params.setFitInsetsTypes(typesToFit)
windowManager.addView(overlay, params)
```

- IME 외 insets(SystemBars) 처리가 필요하면 `View.OnApplyWindowInsetsListener`로 개별 처리.
- Activity 유형별 처리는 Google 가이드("Handle input method visibility") 참조 (문서 내 상세 없음).

---

## 4. 오디오 포커스 개발 가이드 (audio-focus-development.md)

**기본 원칙**

- 원문: "포커스는 오디오 하위 시스템 제어의 유일 수단이 아니라, 충돌 방지/간접 제어 수단입니다."
- 상호작용: R(Reject, 새 요청 거부) / E(Exclusive, 새 요청이 빼앗음) / C(Concurrent, 동시 유지, 보통 duck).
- 보유자가 여러 명이면 가장 보수적 결과 적용: R > E > C.
- 구현 규칙: 재생 시작 전 `AudioAttributes` + `AudioFocusRequest`로 포커스 요청.
- C를 원하면 `AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK` 사용 (원문 "대표").

**포커스 변경 이벤트 처리 (필수, 권장 매핑)**

| 이벤트 | 처리 |
|---|---|
| `AUDIOFOCUS_GAIN` | 정상 재생 |
| `AUDIOFOCUS_LOSS` | 즉시 중단/정지 |
| `AUDIOFOCUS_LOSS_TRANSIENT` | 일시정지 후 복귀 가능 |
| `AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK` | duck(볼륨 감쇄) 적용 |

- Duck 중 pause하면 C가 깨질 수 있으므로 정책 의도에 맞게 구현.
- 로그 필수 항목: incoming context, gain type, client id, current holders, holder별 matrix 결과, 최종 결과(grant/steal/reject), duck 적용·해제.

**Pleos Interaction Matrix**

- 원문 표는 이미지(`Pleos Connect Interaction Matrix v1.0 (2026-01-28)`)라 셀 값(E/C/R)은 텍스트로 없음 → 문서에 없음. 구현 시 원본 이미지 확인 필요.
- 컨텍스트 목록: MUSIC, NAVIGATION, VOICE_COMMAND, CALL_RING, CALL, ALARM, NOTIFICATION, SYSTEM_SOUND, EMERGENCY, SAFETY, VEHICLE_STATUS, ANNOUNCEMENT.
- 원문: "Pleos Connect 오디오 포커스 정책 변경 대응을 위해 하드코딩 금지를 권장" → `interaction_matrix.json` 또는 csv로 탑재 후 로딩.

**우리 앱 알림음과 관련된 컨텍스트 매핑**

- NOTIFICATION: `NOTIFICATION`, `NOTIFICATION_*`
- SYSTEM_SOUND: `SYSTEM_SOUND`, `ASSISTANCE_SONIFICATION`, `ASSISTANCE_ACCESSIBILITY`
- 이 둘 중 어느 쪽 행/열이 C인지는 매트릭스 이미지 확인 필요(문서에 없음).

**컨텍스트별 규칙 (텍스트에 있는 것만)**

- CALL 중 MUSIC 요청 → R. CALL 중 NAVIGATION → C(옵션으로 R 가능).
- NAVIGATION ↔ MUSIC: C 공존. NAVIGATION은 MAY_DUCK 사용.
- VOICE_COMMAND(Gleo): 일반 오디오보다 우선하되 EMERGENCY/CALL 같은 R 컨텍스트에는 우선하지 않음. Gleo가 호출돼 앱이 `AUDIOFOCUS_LOSS_TRANSIENT`를 받으면 즉시 중단하고 필요 시 abandon.
- EMERGENCY 재생 중 어떤 요청(MUSIC/NOTIFICATION 등)은 R.

**검증 시나리오 (문서 원문)**
- MUSIC 재생 중 NAVIGATION 요청 → C, CALL 중 MUSIC 요청 → R, EMERGENCY 중 요청 → R, 동시 홀더 2명 상태에서 VOICE_COMMAND 요청 시 보수적 결과 적용.

---

## 5. Suspend 모드 - 오디오 포커스 (suspend-mode-audio-focus.md)

**Suspend 정의**: 시동(IGN) OFF 후 저전력 상태. 앱 관점에서 "언제든 중단되고 이후 다시 시작될 수 있는 상태".

**원칙 (위험 표시 원문)**
- "Suspend 모드 진입 시 모든 일반 오디오 세션은 사용자에게 출력되지 않아야 하며 각 앱은 보유 중인 오디오 포커스를 반드시 반납해야 합니다."
- 진입 시 순서: 새 작업 시작 금지 → 진행 중 작업 중단 → 재생 상태 저장 → 포커스 abandon → 리소스 해제(타이머, 센서, wake lock 등).
- 이 과정에서 새 재생/포커스 요청은 허용 안 됨.
- Resume 시 포커스 자동 복구 없음. 앱이 재평가 후 재요청. 자동 재생은 OEM/사용자 정책.
- 예외(제한적): 전화·긴급 통신, 안전 경고음, 시스템 필수 음성 안내. 단, Suspend에서 사용자 오디오를 지속 제공하는 목적은 불가.

**예제 핵심 코드**: `onSuspendEntering()`에서 pause → savePlaybackState → abandonAudioFocus → releaseTransientResources. `onResumeFromSuspend()`는 자동 재생 기본 false.

**우리 앱 관련 해석**: 시동 OFF 시점에 기록을 끝내려면 Suspend 진입 전에 상태를 저장하고 정리해야 한다는 의미로 읽힘. 단 문서는 오디오 기준이며, 운행기록 저장/종료 타이밍에 대한 문서 규칙은 없음(문서에 없음).

---

## 6. TTS / 음성 안내 선행 묵음 (voice-guidance-preroll-silence-guide.md)

- 적용 범위: TTS, 녹음 음원 안내, 내비, **알림, 상태 안내** 등 모든 음성 출력 경로.
- 권장: 선행 묵음 **150ms ~ 200ms**. 최소 150ms (미만이면 첫 음절 손실 가능). 200ms 초과는 체감 지연.
- 적용 위치 우선순위: PCM/WAV 앞단에 무음 패딩 > TTS 결과 후처리 > 플레이어 지연(비권장, 스케줄링 편차).
- 단일 안내 시작 시 적용. 연속 발화에는 추가 삽입 안 함. 스트림이 끊기거나 새 세션이면 다시 적용.
- 원문 위험: "선행 묵음은 초기 클리핑 완화 수단이며, 출력 경로 초기화 문제 자체를 대체하지는 않습니다." 출력 경로 초기화, 포커스 확보, 디코더/플레이어 준비 상태도 함께 확인.

---

## 7. 차량 앱 FAQ (vehicle-app-faq.md) - 우리 앱 관련 항목

- **플랫폼 확인**: `android.os.Build.DEVICE` → `CONNECT_S`, `CONNECT_L`, `CONNECT_W`. 실차에서만 유효, 에뮬레이터에서는 구분 용도로 쓸 수 없음.
- **지역 코드**: `product.sw.target_region` → 한국 `KOR`, 유럽 `EUR`, 북미 `USA`/`CAN`. 지역별 UX 정책 적용 대상.
- **내비 탑재 여부**: 퍼블릭 미공개. 문의 partnership@pleos.ai.
- **속도**: 클러스터는 `PERF_VEHICLE_SPEED`로 속도 표시. 앱이 GPS로 계산하면 클러스터와 어긋날 수 있음. 클러스터와 같은 속도를 쓰려면 `CarPropertyManager`로 `PERF_VEHICLE_SPEED` 조회·구독 (권한 선언 필요, API 상세는 Google 문서 참조). 운행 km를 클러스터 기준으로 맞출 때 직접 관련.
- **배터리**: Vehicle SDK `getEvBatteryStateOfCharge`.
- **코덱**: Connect-S/L/W 목록 있음. 에뮬레이터 코덱은 실차와 다를 수 있으니 결과를 실차에 그대로 적용 금지.
- 문서에 없음: 기어(P단)·시동 상태 조회 방법.

---

## 8. 앱 개발 가이드 intro (intro.md)

- 제목만 "Pleos Connect 앱 개발 가이드", 하위로 오디오 포커스 가이드 링크 1개. 별도 규칙 없음.

---

## 9. 앱 연동 가이드 (app-integration-guide): Gleo 연동

### 9-1. 개념 (core-concepts.md)
- Gleo Interface는 LLM이 앱 function call을 생성하고, 앱 응답(Callback)을 받아 최종 답변을 만드는 function calling 방식. OpenAI function calling과 유사, Android용으로 확장.
- 타사 앱은 먼저 **App Schema**(JSON)를 등록해야 함. 등록 후 Gleo가 Action으로 앱을 호출하고 Callback으로 응답을 받음.

### 9-2. App Schema (app-capability.md)

**파일 위치**: `assets/schema.json` (파일명 반드시 `schema.json`). 승인 후 통합 자동 활성화.

**필드**
- `packageName`, `appDescription`, `version`(Pleos 앱 마켓에 등록된 버전), `actionCalls`(최대 3개).
- 각 action: `type: "function"` 고정, `function.name`, `function.description`, `function.parameters`(type "object" 고정, properties, required), `function.component`("activity" 기본 또는 "service").
- `component`: `"activity"` = `startActivity()` (포어그라운드 UI/사용자 상호작용). `"service"` = `sendBroadcast()` (UI 없는 백그라운드 처리).

**작성 규칙 (원문 요약)**
- `name`: 모두 대문자, 단어는 `_` 구분 (예: `ADD_REMINDER`). 앱 내 고유.
- 이름은 2~3단어로 대상까지 포함 권장.
- 모든 description은 **영어**. 한두 문장. Gleo 동작을 조작하거나 다른 앱/function 사용을 억제하는 문구 금지. **description에 구체 예시 금지.**
- parameter type은 `string`, `number`, `boolean`, `array` 중 하나만. 배열 형태 다중 타입(`["string","null"]`) 불가. enum은 문자열만, null 불가.
- 필수 parameter만 `required`에 포함. 선택 parameter는 넣지 않음.
- Gleo가 필수 parameter를 채운다고 보장하지 않음. `required`가 성공률을 높임.
- 최고 성능을 위해 function 하나가 단독으로 명령을 수행하도록 설계 권장.

**예시 (발췌, 원문 구조)**
```json
{
  "type": "function",
  "function": {
    "name": "ADD_REMINDER",
    "description": "Add a reminder that will notify the user at the given date and time.",
    "parameters": {
      "type": "object",
      "properties": {
        "title": { "type": "string", "description": "Title of the reminder." },
        "dateTime": { "type": "string", "description": "Date and time to trigger the reminder notification, in ISO 8601 date and time format." }
      },
      "required": ["title", "dateTime"]
    },
    "component": "activity"
  }
}
```

- 문서 예시에 `invokeWord` 필드가 있으나, 필드 정의 목록에는 없음 → 필수 여부 문서에 없음.

### 9-3. Manifest 등록 (deliver-schema.md)
```xml
<activity android:name=".YourActivity">
    <intent-filter>
        <action android:name="ADD_REMINDER" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>
```
- 각 function 이름을 action filter로 정의해야 Gleo Action을 수신.
- Gleo 부팅 시 모든 앱 `assets/schema.json`을 스캔해 DB 저장, 부팅 시 1회. Gleo 설치/삭제 시에도 DB 갱신(AAOS).
- 원문 절차: 스키마 작성 → 검토(가이드라인 준수 확인) → 승인 후 자동 활성화.

### 9-4. Gleo Action 전달 방식 (examples.md)
- Gleo가 자연어를 JSON으로 바꾼 뒤 Intent 변환: `action` → Intent action, `packageName` → 대상 지정, `actionParameters`의 각 key-value → `putExtra`.
- 예시(사용자 "오늘 오후 3시에 미팅 리마인더"): `{"packageName":"...","action":"ADD_REMINDER","actionParameters":{"title":"미팅","dateTime":"2025-02-20T06:00:00Z"}}`
- 수신 측(startActivity 방식): 원문은 `ACTION_PARAM` 문자열 하나에 JSON을 담아 보냄. `intent.extras`에서 `getString("ACTION_PARAM")`을 읽고 JSON 파싱.
- sendBroadcast 방식(`component: service`): 수신 측은 `BroadcastReceiver`에서 `intent.action`을 확인 후 `getStringExtra("ACTION_PARAM")` 파싱.
- 보내는 쪽 원문 코드: `intent.setPackage("ai.dot42.pleos.reminderapp")`로 대상 앱 지정.

### 9-5. Callback (action_callback.md, examples.md)

**Callback 필드**
- `functionName` (필수): Action의 function 이름과 일치해야 함.
- `status` (필수): `success` | `asking` | `fail`
  - success: 정상 처리. 결과 없어도 success 가능.
  - asking: 추가 정보 필요(누락 parameter) 또는 사용자 확인 필요.
  - fail: 완료 불가. 비즈니스 조건 실패뿐 아니라 **crash, 네트워크 실패, 서버 timeout 같은 시스템 오류도 fail**.
  - 원문: "Gleo는 timeout을 위해 7초 후 Action을 취소합니다."
- `message` (필수): **영어 완전한 문장.** 검색어·위치·항목명 등은 다른 언어 포함 가능.
- `mode` (선택, 기본 `voice`): `voice` 음성 출력 / `beep` 효과음만 / `silent` 아무 소리 없음.
  - 앱이 자체 TTS나 음악 재생을 할 때 `silent` → Gleo TTS 비활성. 이 경우 Gleo는 Callback에만 의존.
- `data` (선택, 강력 권장): 결과를 JSON 객체 배열 **문자열**로. "Gleo가 응답을 생성하는 데 필요한 정보만" 포함. mode가 silent/beep여도 data를 넣으면 맥락 유지에 도움.

**예시 (원문)**
```json
{
  "functionName": "ADD_REMINDER",
  "status": "success",
  "message": "The reminder was successfully added.",
  "data": "[ { \"title\": \"미팅\", \"dateTime\": \"2025-02-20T06:00:00Z\" } ]"
}
```
```json
{
  "functionName": "PLAY_FREQUENCY",
  "status": "success",
  "message": "Starting the requested station now.",
  "data": "[ { \"stationName\": \"SBS 파워FM\", \"frequency\": \"107.7MHz\" } ]",
  "mode": "silent"
}
```

**Callback 전송 방법 (Gleo로 broadcast, 원문 샘플 그대로)**
```kotlin
fun sendGleoBroadcast(functionName: String, status: String, message: String, data: String? = null) {
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
        }
    }.onFailure { ... }
}
```
- 문서에 "Gleo AI는 Android 서비스이므로 broadcast 수신이 가능"이라고 되어 있음.
- 문서에 없음: 이 action 문자열이 운영 환경(Pleos Connect 실차)에서도 같은지, 샘플 패키지가 `ai.pleos.playground`인 이유. 샘플 경로 그대로 쓰기 전 확인 필요.

### 9-6. 라디오 앱 사용 사례 (radio-app.md)
- 같은 구조를 실제 라디오 앱에 적용한 예: `SWITCH_BAND`(enum FM/AM, service), `SEARCH_STATION`(activity), `PLAY_FREQUENCY`(number, service).
- 라디오 앱은 `SEARCH_STATION` 결과가 여럿이면 `asking`으로 후보 목록을 `data`에 담아 되묻는 흐름을 보여줌.
- 원문 샘플 `sendCallback`은 `data`를 참조하나 정의가 없는 미완성 코드(발송 부분 주석 처리) → 샘플 그대로 쓰지 말 것.

### 9-7. 우리 앱과 연결 가능한 것 (정리)
- "오늘 운행 몇 km?" 같은 질의: `component: "activity"`(UI 필요 시) 또는 `"service"`(UI 없이 처리) 중 선택 가능. 결과는 Callback `status: success` + `data`에 km 값을 담고, 음성 출력은 Gleo 기본 `voice`에 맡기면 됨.
- 앱이 직접 TTS/효과음을 낼 경우 `mode: "silent"` 또는 `"beep"` 사용.
- 제약: action 최대 3개, description 영어 & 예시 금지, parameter 타입 제한, 응답 7초 내.

---

## 10. 앱 등록 가이드 (app-registration-guide)

### 10-1. 보안 가이드 (app-security-guide.md)

**민감 데이터 관리**
- 민감 정보: PII, 금융 정보, 민감 차량 데이터, 인증 토큰, API 키, 암호화 키.
- **기기 저장 민감정보는 저장 위치와 무관하게 암호화.** 대상: 앱 내/외부 저장소, 캐시, SQLite, SharedPreferences. 샌드박스와 별도로 앱 수준 암호화 필수. 임시 파일/사본도 평문 금지.
- 로그: 출시 전 디버그 로그 비활성화 또는 마스킹.
- 캐시: 민감정보 캐시 비권장. 필요 시 암호화. 사용 후 삭제 권장.
- 자동 백업: non-GAS AAOS에서는 Google 자동 백업 미동작. 비활성화 권장. 백업 사용 시 민감 파일 제외.
- 외부 저장소 사용 시 암호화 필수. 앱 전용 영역 사용 권장. 임시 파일은 사용 후 삭제.
- **URL에 민감정보 금지**: 토큰, 세션, 비밀번호를 경로/쿼리에 넣지 말 것. 토큰은 Authorization 헤더 등으로 전달.

**안전한 암호화 (우리 앱 QR/엑셀 흐름 관련)**
- 표준 검증 알고리즘 사용. 서명·무결성은 SHA-256 이상 (MD5, SHA-1 금지).
- 블록 모드는 AES-GCM 권장, ECB 피함.
- RSA는 OAEP + SHA-256 고려. AES-GCM은 패딩 불필요.
- IV/nonce: 같은 키로 재사용 금지 (특히 GCM).
- 난수: 암호학적 안전 생성기 사용.
- 키: Android Keystore 사용. 소스, 리소스, 설정에 하드코딩 금지. 보호 대상 데이터와 평문으로 같이 저장 금지.

**통신**
- 외부 통신은 HTTPS 등 암호화 프로토콜. 평문 노출 금지.
- TLS 1.2 이상 필수, **TLS 1.3 권장**. SSL, TLS 1.0/1.1 금지.
- 안전한 Cipher Suite 사용 (TLS 1.2는 구성 검토).
- 신뢰할 수 있는 서버만 연결.
- 서버에서 내려주는 원격 명령은 출처·유효성·무결성 확인, 동작 범위 제한.

**컴포넌트·권한**
- 권한 최소화. Pleos Connect에서 실제 필요한 권한 기준.
- 외부 호출 불필요한 Activity/Service/BroadcastReceiver/ContentProvider는 **exported 금지**.
- 민감정보 전달 시 **수신자 명시**. 수신자 미지정 암시적 브로드캐스트로 민감정보 전송 금지.
- 민감정보 제공/보호 기능 컴포넌트: 호출자의 인증 상태와 접근 권한 **둘 다** 확인.
- WebView 로컬 파일 접근은 필요 범위로 제한, 불필요하면 비활성화.
- 외부에서 받은 URI/파일 경로는 검증·정규화.

**개발·배포**
- 허가된 API만 사용. 차량 API는 기능과 직접 관련된 범위만.
- 비밀 정보 하드코딩 금지.
- 서버 IP 고정 대신 도메인 등 관리 가능한 방식 권장.
- 네이티브 라이브러리: RELRO, 스택 카나리, NX 보호 권장.
- SDK/라이브러리 취약점 주기 확인, 패치 버전 유지.
- **배포용 서명 인증서** 사용 (테스트/디버그 인증서 금지).
- **디버깅 비활성화**: 디버그 빌드 설정, 앱 디버깅, WebView 원격 디버깅 모두 끌 것.
- 문서에 없음: 코드 난독화(ProGuard/R8) 요구 여부. 원문에 해당 단어 없음.

**WebView 사용 앱**
- 위 원칙 전부 적용. 로드 콘텐츠와 이동 가능 사이트 범위 제한. JavaScript 브리지는 필요 시에만, 신뢰 못 할 콘텐츠가 민감정보나 보호 기능에 접근하지 못하도록.

**웹브라우저 앱 추가 요구 (우리 앱 해당 없을 가능성 높음)**
- 신뢰 엔진, 악성 사이트 차단, HTTPS 우선, 인증서 검증 우회 금지, CORS/SOP, CSP Level 2 이상, 샌드박스, 개발자 모드·프록시 변경·확장 설치 비활성화, 다운로드 제한.

### 10-2. 앱 태그 표기 (app-tagging-guide.md)
- 공식 타이틀이 외국어(예: 영어)이면 **영문 태그 필수**. 공식명과 동일 표기, 축약/변형 금지.
- 한국어 타이틀을 병행·대체 표기하면 한국어 태그 선택 추가 가능. 다국어 공식명이면 각 언어 명칭 추가 가능, 영문 태그는 필수 포함.
- 예시: 공식명 `Sport`, 노출명 `스포츠` → 필수 태그 `Sport`, 선택 `스포츠, 운동`.
- 태그 누락/오표기 시 반려 또는 수정 요청.
- 우리 앱처럼 공식 앱명이 한국어면 이 규칙 적용 대상 아님(가이드 적용 조건 기준으로 추정, 문서 명시 없음).

### 10-3. 업데이트 (app-update-guide.md)
- Pleos App Market은 **자동 업데이트 미지원**. 앱이 직접 업데이트 시퀀스를 제공해야 함.
- 흐름: 실행 시 버전 확인 → 최신 아니면 안내 팝업 → Yes 시 상세 페이지 이동 → 마켓에서 로그인 확인 → 업데이트 버튼.
- 개발사 구현: 버전 체크, 안내 메시지(원문: `최신 버전이 존재합니다. 업데이트를 위해 페이지를 이동할까요? (Yes, No)`), 이동 경로(`market://detail?package={패키지명}`), No 선택 시 처리(사용 유지 또는 종료는 개발사 정책).
- 마켓 제공: 로그인 확인과 로그인 후 처리. 버전 체크는 SDK 제공 "차후 고려"(현재 없음).

### 10-4. 앱 버전 관리 정책 (app-version-management-policy.md)
- 배포 또는 심사 요청 시 **버전을 반드시 변경**. 기능/버그/설정 등 모든 변경은 버전 업데이트.
- 버전 미변경 시 심사 미진행 또는 반려.
- 심사 요청 전 버전 정보 정상 반영 확인.
- 버전 형식 규칙은 문서에 없음. 다만 `appdevchallenge` 제출 시 `manifest` version과 Gleo `schema.json`의 `version`을 같이 맞출 필요가 있음(문서상 `version`은 "Pleos 앱 마켓에 등록된 버전"이라 일치 원칙으로 추정).

---

## **우리 앱에 주는 영향**

### 반드시 지켜야 할 구현 규칙

**주행 제한 / 입력 UI**
1. `CarUxRestrictionsManager.registerListener()`로 구독하고 `onUxRestrictionsChanged()`에서 상태를 받는다. 주행 중 여부는 `isRequiresDistractionOptimization()`과 `getActiveRestrictions()`로 판단한다. 기어(P단) 신호는 이 문서에 없으니 별도 확인 필요.
2. 제한 중 동작은 플래그별로 직접 구현해야 한다. 플랫폼이 UI를 자동으로 막아주지 않는다. 운전자 선택·용무 입력은 P단에서만 열고, 주행 중에는 입력 UI를 막는 로직이 필요하다.
3. 입력 다이얼로그에 EditText가 있으면 IME로 view가 밀려 올라가는 게 사양이다. EditText가 없는 다이얼로그는 `setFitInsetsTypes(statusBars | navigationBars)`로 IME 영향을 막아야 한다.

**CCP**
4. User-installed로 등록하면 CCP 미지원도 가능하지만, 그 경우 **모든 필수 조작을 터치만으로 완결**해야 하고 `com.hmg.rotary.ROTARY_SUPPORTED=false` 메타데이터를 선언한다. 지원하려면 회전·클릭·뒤로 포커스 이동을 구현한다.
5. CCP Back이 최상단에서 눌리면 **앱을 종료하지 말고 `moveTaskToBack(true)`로 숨긴다.** 숨긴 뒤에도 프로세스가 죽을 수 있으므로 상태를 저장·복원해야 한다. 운행 기록 수집은 숨김 후에도 계속돼야 한다("백그라운드 유지 기능").
6. 하위 화면·팝업은 기존 Back 정책(이전 화면 또는 닫기)을 따른다.

**오디오 / 알림음**
7. 알림음을 내기 전에 `AudioAttributes` + `AudioFocusRequest`로 포커스를 요청한다. 알림은 NOTIFICATION 컨텍스트. 실제 C/E/R 결과는 매트릭스 이미지를 확인해야 한다(문서에 없음).
8. `AUDIOFOCUS_LOSS`는 즉시 정지, `LOSS_TRANSIENT`는 일시정지, `LOSS_TRANSIENT_CAN_DUCK`은 감쇄. 포커스 변경 이벤트 처리는 필수.
9. 음성 안내(알림 포함)는 **선행 묵음 150~200ms**를 붙인다. 150ms 미만 금지 권장.
10. 시동 OFF(Suspend) 진입 시: 새 재생·포커스 요청 금지, 재생 상태 저장, 포커스 **반드시 abandon**, 리소스 해제. Resume 때 포커스 자동 복구 금지.
11. 알림음은 "소리 거의 없음"이 기본이므로 필요할 때만 최소 재생. 짧은 알림음도 포커스 규칙은 동일 적용.

**플랫폼 / 속도**
12. 운행 거리 계산 속도는 GPS가 아니라 `CarPropertyManager`의 `PERF_VEHICLE_SPEED`를 쓰면 클러스터와 값이 맞는다.
13. 플랫폼 분기는 `Build.DEVICE`(실차에서만 유효), 지역은 `product.sw.target_region`(KOR). 에뮬레이터 결과를 실차에 그대로 적용하지 않는다.

**보안 (가장 중요)**
14. 기기 저장 데이터(운행 기록, 운전자 정보, QR 생성용 데이터)는 **저장 위치와 무관하게 앱 수준 암호화**. SQLite, SharedPreferences, 캐시, 임시 파일 포함.
15. 암호화 키는 Android Keystore. 하드코딩 금지. 알고리즘은 AES-GCM, SHA-256 이상. IV/nonce 재사용 금지.
16. 외부 서버(엑셀 생성/QR 링크) 통신은 HTTPS, TLS 1.2 이상(1.3 권장). 인증 토큰은 Authorization 헤더로, **URL 쿼리/경로에 운행 데이터나 토큰을 넣지 않는다.** QR에 담는 URL은 1회용 식별자만 두고 데이터는 서버 측에 두는 방식이 문서 원칙에 맞다.
17. `exported=false`를 기본으로 하고, 민감정보를 Gleo로 보낼 때는 **수신자를 명시**(`setPackage`)해서 암시적 브로드캐스트를 쓰지 않는다.
18. `allowBackup` 비활성화 권장(Pleos non-GAS에서는 자동 백업 미동작이지만 다른 Android 환경 대비).
19. 디버그 빌드 설정, WebView 원격 디버깅 OFF. 배포 서명 인증서 사용.
20. 차량 API는 기능에 필요한 범위만(운행 기록 외 데이터 접근 금지).
21. 로그에 운전자명, 차량번호, 위치 등 민감 값 남기지 않기.

**앱 등록 / 버전**
22. 배포·심사 요청마다 **버전을 올린다.** 올리지 않으면 반려.
23. 자동 업데이트가 없으므로 앱 실행 시 버전 확인 → 안내 팝업 → `market://detail?package=...` 이동 흐름을 직접 구현한다.
24. 태그: 공식 앱명이 영문이면 영문 태그 필수. 한국어 앱명이면 이 항목 해당 없음(추정).

### 연동으로 할 수 있는 것 (Gleo)

- **음성 질의 응답**: "오늘 운행 몇 km?", "이번 달 업무 운행 몇 건?" 같은 질의를 App Schema action으로 등록하고, Callback `status: success`에 `data`(JSON 배열 문자열)로 수치를 담아 Gleo가 음성 응답을 만들게 한다.
- **action 구성 한도**: 최대 3개. 예: `GET_TODAY_DISTANCE`(service, 무UI), `START_TRIP_REPORT_EXPORT`(activity, 엑셀 QR 표시 화면 띄우기), `SET_TRIP_PURPOSE`(activity, 용무 입력은 P단에서만이라는 규칙 확인 필요).
- **음성 출력 제어**: 앱이 자체로 소리를 낼 땐 `mode: "silent"` 또는 `"beep"`로 Gleo TTS를 끈다. 알림음을 앱이 직접 낼 때 포커스 규칙을 따라야 한다.
- **실패 처리**: 질의 실패(데이터 없음, 시스템 오류)는 `fail`, 추가 정보 필요(예: 기간 누락)는 `asking`. `message`는 영어 한 문장.
- **제약**: `description` 영어, 예시 문구 금지, 파라미터 타입 4종만, enum은 문자열만, 응답은 7초 안에.
- **등록 방식**: `assets/schema.json`, Manifest에 action intent-filter, Gleo가 부팅 시 스캔.
- **문서에 없음**: 주행 중 Gleo 질의 응답을 허용하는 정책(주행 규제 상 음성은 허용되는지), Gleo가 우리 앱 음성을 주행 중 어떻게 처리하는지, Gleo 실제 배포 여부와 적용 대상 차량.
