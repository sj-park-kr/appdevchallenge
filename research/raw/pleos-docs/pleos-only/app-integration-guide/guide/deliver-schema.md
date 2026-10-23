> 출처: https://document.pleos.ai/docs/pleos-only/app-integration-guide/guide/deliver-schema (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Delivering the Schema to Gleo

## App Schema를 Gleo에 전달하기​

- App Schema 파일 생성

- 파일 이름은 반드시 `schema.json`이어야 합니다.

- 파일은 앱의 `assets/` 디렉토리에 위치시켜야 합니다. (경로 : `assets/schema.json`)

- App Schema를 작성할 때 App Schema 작성 가이드를 반드시 따라주세요.

- App Schema 검토

- App Schema를 전달받으면, 당사 가이드라인을 준수하는지 검토합니다.

- 승인 후에는 통합이 자동으로 활성화됩니다.

- `AndroidManifest.xml`에 action filter 정의

- Gleo Action을 수신하려면 각 function에 대한 action filter를 정의해야 합니다.

- 다음은 리마인더 앱의 `ADD_REMINDER` function 예시입니다.

`<activity android:name=".YourActivity">

    <intent-filter>

        <action android:name="ADD_REMINDER" />

        <category android:name="android.intent.category.DEFAULT" />

    </intent-filter>

</activity>

`

- 앱 부팅 시 동작

- Gleo AI 앱(Gleo AI를 실행하고 타사 앱과 상호작용하는 앱)이 부팅되면, `AssetManager`를 사용하여 모든 시스템 또는 타사 앱을 스캔합니다.

- `assets/` 디렉토리에서 발견된 모든 `schema.json` 파일은 읽혀 데이터베이스에 저장됩니다.

- 해당 프로세스는 부팅 시점에 한 번만 실행됩니다.

- 앱 설치/삭제 시 동작(AAOS 환경)

- Gleo AI 앱이 설치(ADB install 또는 앱 마켓을 통해 설치)되거나 삭제될 때, 앱의 `assets/` 디렉토리에서 `schema.json` 파일을 읽고 데이터베이스를 갱신합니다.

- 해당 부분에 대해 추가적인 안내가 필요하다면 이 문서의 저자에게 문의해 주시기 바랍니다.
