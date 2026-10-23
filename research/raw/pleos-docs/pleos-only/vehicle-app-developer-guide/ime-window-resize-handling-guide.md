> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/ime-window-resize-handling-guide (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# IME 동작에 따른 window resize 처리 가이드
Android Framework는 IME가 표시되면 IME(Input Method Editor) insets 영역만큼 view 크기를 조정하는 기본 동작을 수행합니다.

이 동작은 Pleos Connect 플랫폼 정책이 아니라 AOSP 기본 동작입니다.
이 문서는 앱 유형별로 window resize를 허용할지 제외할지 판단하는 기준과 설정 방법을 제시합니다.

## Pleos Connect 사양​

IME 표시 시 Pleos Connect 화면 동작 사양입니다.

| | 구분 | 사양
| | EditText 또는 TextField가 포함된 window | IME 표시 시 view가 IME에 의해 위로 밀려 올라가는 것이 사양입니다.
| | EditText 또는 TextField가 없는 window | IME 표시 시 view가 앵커링되지 않아야 합니다. 아래 가이드를 참고해 앱에서 수정이 필요합니다.

## IME Insets 제외 설정 가이드​

Dialog를 표시할 때 insets 적용 대상을 `statusBars`와 `navigationBars`로 한정하면, IME insets의 영향을 받지 않습니다.

### System Dialog​

`val params = WindowManager.LayoutParams(...)

val typesToFit = WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()

params.setFitInsetsTypes(typesToFit)

windowManager.addView(overlay, params)

`

### App Dialog​

`val dialog = Dialog(this)

val window = dialog.window

window?.let { win ->

    val params = win.attributes

    val typesToFit = WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars()

    params.setFitInsetsTypes(typesToFit)

    window.attributes = params

}

dialog.setContentView(R.layout...)

dialog.show()

`

### WindowInsetsListener 적용​

IME 외 insets(SystemBars)에 대해 view 업데이트가 필요한 경우 `WindowInsetsListener`에서 개별 처리해야 합니다.

- View.OnApplyWindowInsetsListener

Activity 유형 처리
Activity 유형은 아래 Google 가이드를 기준으로 별도 처리 검토가 필요합니다.

Handle input method visibility
