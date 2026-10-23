> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/music-audio-app-developement-guide (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Music/Audio 앱 개발 가이드
Pleos Connect에서 동작할 Music/Audio 카테고리 앱을 개발할 때 반영해야 할 사항을 가이드합니다.
Music/Audio 카테고리 앱의 분류·세분화 기준과 미디어 라이브러리 연동 시 사용자 경험 저하를 방지하는 정책을 가이드하며, 이 가이드는 Pleos App Market 등록 시 심사 기준으로 적용됩니다.

## Music/Audio 앱 카테고리​

### 카테고리 정의​

Music/Audio 카테고리는 다음과 같은 오디오 중심 서비스를 제공하는 앱을 포함합니다.

- 음악 스트리밍 및 재생

- 팟캐스트, 오디오북, 라디오 콘텐츠 제공

- 차량 내 미디어 재생을 목적으로 하는 오디오 플랫폼

정보
영상이 주 기능인 앱은 본 카테고리에 포함되지 않습니다.

### 카테고리 등록 기준​

Pleos App Market Music/Audio 카테고리에 앱을 등록하려면 다음 요건을 충족해야 합니다.

- 오디오 콘텐츠 재생이 앱의 주 기능일 것

- 차량 주행 환경에 적합한 UI/UX를 제공할 것

- 백그라운드 재생 및 차량 미디어 컨트롤 연동을 지원할 것

### 카테고리 불일치 정책​

- 음악 외 부가 기능(커뮤니티, 쇼핑 등)이 포함된 경우에는 오디오 재생이 핵심 기능인지를 기준으로 카테고리 적합성을 판단합니다.

- 단손 보조 기능으로 음악을 제공하는 앱은 심사에서 즉시 반려됩니다.

## 미디어 앱 라이브러리 연동​

팁
미디어 센터를 사용하는 앱은 차량의 미디어 앱 라이브러리에 자동 등록될 수 있습니다.

미디어 센터를 사용하지 않는 앱은 미디어 앱 라이브러리에 표시되지 않습니다.

### 미디어 앱 라이브러리 연동을 위한 카테고리 세분화 정책​

차량 환경에서 미디어 앱 라이브러리 노출은 핵심 사용자 경험 요소입니다. 미디어 앱 라이브러리는 시스템 미디어 브라우저에서 사용자에게 표시되는 앱 및 콘텐츠 목록을 의미합니다. Music/Audio 앱은 콘텐츠 유형에 따라 하위 카테고리를 정의해야 하며, 이렇게 분류된 정보가 미디어 앱 라이브러리와 연동되어 미디어 브라우저, 음성 명령, 스티어링 휠 컨트롤 기반 사용 흐름과 연결됩니다.

| | 하위 카테고리 | 구분 원칙
| | 음악(Music) | 아티스트, 앨범, 트랙 기반의 음악 콘텐츠 제공
 예: 음악 스트리밍 서비스, 로컬 음악 플레이어
| | 팟캐스트(Podcast) | 에피소드 단위의 음성 콘텐츠 제공
 구독, 최신 회차, 에피소드 목록 구조를 포함
| | 오디오북(Audiobook) | 도서 기반 장시간 음성 콘텐츠
 챕터 단위 탐색 및 재생 위치 저장 기능 포함
| | 라디오(Radio) | 실시간 스트리밍 또는 방송 기반 오디오 콘텐츠
 채널/방송국 중심 탐색 구조

복합 콘텐츠 앱의 처리

- 하위 카테고리 구분이 불명확한 경우 심사에서 반려 사유가 될 수 있습니다.

### 미디어 앱 라이브러리 연동 정책 (필수)​

Music/Audio 카테고리 앱은 다음 정책을 준수해야 합니다.

- 콘텐츠 유형별로 명확한 브라우징 구조 제공

- 시스템 미디어 앱 라이브러리와 연동 시 하위 카테고리(음악/팟캐스트/오디오북/라디오) 정보 전달 필수

- 단일 리스트로 모든 콘텐츠를 혼합 노출하는 방식은 제한될 수 있음

### 미디어 앱 라이브러리 연동 구현​

매니페스트 파일에 카테고리 정보를 추가합니다. `<application>` 요소의 `android:appCategory` 속성을 `"audio"`로 설정합니다. 자세한 정보는 미디어 앱에 Android Automotive OS 지원 추가(https://developer.android.com/training/cars/media/automotive-os?hl=ko)를 참조합니다.

AndroidManifest.xml
`<application

  ...

  android:appCategory="audio" />

`

## Music/Audio 앱 개발 정책​

차량에 탑재되는 모든 Music/Audio 앱은 차량 시스템과의 표준 미디어 연동을 위해 MBS(`MediaBrowserService`)를 반드시 사용해야 합니다.

### 필수 요구사항​

- 앱은 Android `MediaBrowserService`(MBS)를 구현해야 합니다.

- 차량 시스템은 MBS를 통해 앱의 콘텐츠 탐색, 재생 상태 확인, 미디어 제어를 수행합니다.

- 앱은 차량 시스템이 제공하는 표준 미디어 인터페이스와 호환되어야 합니다.

- 앱은 Android `MediaSession`을 통해 재생 상태와 제어 기능을 제공해야 합니다.

배포 제외 기준
MBS를 구현하지 않은 오디오 앱은 차량 탑재 및 배포 대상에서 제외될 수 있습니다.

### 미디어 센터 사용 권장 정책​

미디어 센터는 MBS 기반의 개발 템플릿입니다. Music/Audio 앱 개발에 미디어 센터 사용을 권장합니다.
미디어 센터를 사용하면 차량 미디어 기능 연동이 용이하며, 미디어 앱 라이브러리 자동 등록, Tune Knob, Media 버튼 연동 등 차량 통합 기능을 활용할 수 있습니다. 미디어 센터를 사용하지 않는 경우에는 동일 기능을 앱에서 별도로 구현하거나 일부 기능을 사용할 수 없습니다.

| | 기능 항목 | 미디어 센터 사용 | 미디어 센터 미사용
| | 스티어링 휠 키 지원 | 기본 제공 | 개발 가능하나 별도 구현 필요 (미구현 시 심사 반려 가능)
| | 미디어 앱 라이브러리 등록 | 지원 | 미지원 (라이브러리 미노출)
| | Tune Knob 지원 (다음/이전 곡) | 지원 | 미지원
| | 차량 Media 버튼 연동 | 지원 | 미지원
| | 차량 Mode 버튼 연동 | 미지원 | 미지원
| | 차량 미디어 생태계와의 통합성 | 높음 | 제한적
| | 추가 개발 부담 | 적음 | 기능별 별도 개발 필요

## 차량 미디어 앱 스티어링 휠 키 지원 정책​

차량에서 실행되는 모든 미디어 앱은 스티어링 휠 키를 통한 기본 재생 제어를 지원해야 합니다.
기본 재생 제어는 미디어 센터 연동을 권장하며, 다음 두 가지 구현 방식 중 하나를 적용해야 합니다.

- 미디어 센터 연동

- Android MediaBrowserService를 사용한 구현

### 미디어 센터 연동​

차량의 미디어 센터를 통해 재생, 일시정지, 정지, 이전 트랙, 다음 트랙 등 기본 제어를 구현해야 합니다.

### Android MediaBrowserService를 사용한 구현​

미디어 센터를 사용하지 않을 경우, 앱은 Android `MediaBrowserService`를 기반으로 스티어링 휠 키를 통한 기본 재생 제어를 지원해야 합니다.

- `MediaSessionCompat`을 등록하고 `MediaSessionCompat.Callback`을 구현해야 합니다.

- 최소한 다음 기능을 지원해야 합니다.

- 재생, 일시정지, 정지, 미디어 ID 기반 재생, 검색 기반 재생

- 콘텐츠 특성상 가능한 경우 이전 트랙 및 다음 트랙 이동도 지원해야 합니다.

- 앱 연결 시 자동 재생은 금지하며, 사용자의 명시적 동작 또는 시스템 재개 요청에 따라 재생해야 합니다. 자세한 내용은 Android Developers 가이드(https://developer.android.com/training/cars/media?hl=ko)를 참조하세요.

배포 제외 기준
스티어링 휠 키 동작이 지원되지 않거나 Google 가이드에 맞는 미디어 세션 처리가 구현되지 않은 미디어 앱은 차량 탑재 또는 배포 대상에서 제외될 수 있습니다.

## 개발사가 구현해야 할 동작 규칙​

### 자동 재생 제한 정책​

- 프로필이 변경된 경우에도 음원을 자동 재생하면 안 되며, 사용자의 명시적 동작 또는 시스템 재개 요청에 따라 재생해야 합니다.

### 오디오 포커스 상실 및 세션 정리​

- 게임 앱 실행 등으로 `AUDIOFOCUS_LOSS`를 수신한 경우, `MediaSession`이 active 상태로 유지되지 않도록 `stop` 처리 또는 session 비활성화 로직을 적용해야 합니다.

- 샘플 앱 구현 예시는 다음과 같습니다.

`private val audioFocusListener = AudioManager.OnAudioFocusChangeListener { focus ->

    when (focus) {

        AudioManager.AUDIOFOCUS_LOSS -> {

            stopPlayback()

            audioManager.abandonAudioFocusRequest(audioFocusRequest)

        }

        AudioManager.AUDIOFOCUS_LOSS_TRANSIENT,

        AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK -> pausePlayback()

        AudioManager.AUDIOFOCUS_GAIN -> resumePlayback()

    }

}

`

- media 앱이 `bind()`/`unbind()`만 호출하는 경우 `onTaskRemoved()`를 수신하지 못할 수 있으므로, `onCreate()`에서 `startService()`를 호출해 서비스가 Started 상태가 되도록 구성해야 합니다.

- `onStartCommand()` 및 재생 시점에는 `startForeground()`를 호출해야 합니다.

- `onTaskRemoved()`에서는 `stopMedia()` → `stopSelf()` → `super.onTaskRemoved()` 순서로 실행해야 하며, `super.onTaskRemoved()` 호출 이전에 내부 정지 로직을 먼저 수행해야 합니다.

- 쓰리핑거 동작 시 시스템에서 `MediaSessionCompat.Callback.onStop()`이 호출될 수 있으며, 앱은 `onStop()` 수신 시 `ExoPlayer.stop()`을 수행해야 합니다.

## Gleo AI 기능 연동 정책​

Pleos Connect에서 동작하는 Music/Audio 앱은 Gleo AI 기능을 사용할 수 있습니다.

Gleo AI는 사용자의 이동 여정을 함께 하며 소통하고 도와주는 AI 에이전트입니다. LLM 기반의 인공지능 기술과 음성 기술을 활용하여 사용자의 음성 명령의 맥락과 대화를 이해하고 필요한 응답과 실행을 제공하여 사용자에게 편리하고 안전한 이동 경험을 제공합니다.

Gleo AI와 연동할 경우 다음 기능을 사용할 수 있습니다.

- “멜론 앱에서 아이유 노래 틀어줘”와 같은 곡 검색 및 재생 음성 기능을 제공할 수 있습니다.

- 곡 검색 외에도 앱의 핵심 기능 중 약 3~5개의 추가 음성 기능을 선택적으로 제공할 수 있습니다.

- 앱 심사 통과 후 Pleos App Market에 출시되면, 사용자는 앱 설치 후 해당 음성 기능을 바로 사용할 수 있습니다.

앱에서 Gleo AI 음성 검색 및 제어 기능을 사용하려면 다음 두 가지 방법 중 하나를 구현해야 합니다.

- Gleo Interface 구현

- Android 표준 미디어 API 기반 구현

### Gleo Interface 구현​

Gleo Interface는 Gleo AI와 타사 앱이 차량 내에서 사용자의 음성 명령을 처리하기 위해 서로 상호작용하는 방식을 정의하는 인터페이스입니다.
Gleo Interface를 사용하려면 Gleo AI가 호출할 수 있는 function을 앱에서 구현해야 하며, Gleo AI와 function 간의 호출 방식을 정의한 schema를 등록해야 합니다.

Gleo Interface 구현 가이드
Gleo Interface 구현 방법에 대한 자세한 설명은 Gleo Interface 구현 가이드를 참조하시기 바랍니다.

### Android 표준 미디어 API 기반 구현​

Gleo AI가 MediaAgent를 통해 음악 앱을 제어하는 방식입니다. MediaAgent는 Android 표준 Media3 기반으로 미디어 앱을 제어합니다.
AndroidX Media3 및 AAOS 표준 미디어 API를 준수하여 개발된 음악 앱의 경우, 별도의 Schema를 구현하지 않더라도 음성 기능을 사용할 수 있도록 향후 업데이트를 준비 중에 있습니다.

#### 표준 미디어 정책 준수의 최소 조건​

Android 미디어 컨트롤 표준 라이브러리인 Media3를 사용하려면 최소한 다음 사항을 구현해야 합니다.

- `MediaSession` / `MediaLibraryService` 연동

- 재생 / 일시정지 / 다음 곡 / 이전 곡 등 기본 미디어 제어 명령 제공

- (`MediaLibraryService` 연동 시) 검색 관련 명령 제공

기존의 `MediaBrowserService`도 호환 가능하지만, 최신 표준인 Media3 사용을 권장합니다.

#### 곡 검색 기반 음성 기능 지원 조건​

곡 검색과 같은 음성 기능을 사용하려면 Media3 기준 `MediaLibraryService`의 검색 기능을 반드시 구현해야 합니다. `MediaSession`만 제공되는 경우 기본 재생 제어는 가능하지만 검색 기반 음성 기능은 제한됩니다.

## 심사 및 운영 기준​

### 심사 기준​

Pleos App Market Music/Audio 카테고리 앱 등록 시 심사 기준은 다음과 같습니다.

- 카테고리 및 하위 카테고리 정의가 명확한지 확인합니다.

- 미디어 앱 라이브러리 연동 구조가 적합한지 확인합니다.

- 차량 환경에서의 사용성 및 안전성을 평가합니다.

### 정책 위반 시 조치​

정책 위반 시 다음과 같이 조치할 수 있습니다.

- 카테고리 불일치: 수정 요청 또는 심사 반려

- 하위 카테고리 미정의: 기능 보완 요청

- 위의 사항을 반복 위반 시: 앱 노출 제한 또는 등록 중단
