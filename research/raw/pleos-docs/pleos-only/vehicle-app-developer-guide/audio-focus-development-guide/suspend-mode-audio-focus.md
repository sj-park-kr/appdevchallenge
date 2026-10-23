> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/audio-focus-development-guide/suspend-mode-audio-focus (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Suspend 모드 - 오디오 포커스 개발 가이드

## Suspend 모드 정의​

Suspend 모드는 차량의 시동(IGN)이 OFF된 이후, 시스템이 완전히 종료되지 않고 저전력 상태로 진입하는 운영 상태를 의미합니다.
이 상태에서 대부분의 사용자 기능은 중단되지만, 시스템은 빠른 Resume을 위해 메모리와 일부 핵심 기능을 유지합니다.

Suspend 모드의 주요 특징은 다음과 같습니다.

- 사용자 인터랙션이 없는 비활성 상태

- 디스플레이 및 대부분의 UI 기능 비활성화

- 오디오, 미디어 등 일반 서비스는 중단

- 일부 시스템 작업(Garage mode 등)은 제한적으로 수행 가능

- Resume 시 빠른 복구를 위한 상태 유지

Suspend 모드는 완전 종료(shutdown)가 아닌 저전력 유지 상태이며, 앱 관점에서는 '언제든 중단되고 이후 다시 시작될 수 있는 상태'로 간주해야 합니다.

## Suspend 모드에 따른 오디오 포커스 처리​

### 기본 원칙​

위험
Suspend 모드 진입 시 모든 일반 오디오 세션은 사용자에게 출력되지 않아야 하며 각 앱은 보유 중인 오디오 포커스를 반드시 반납해야 합니다.

핵심 원칙은 다음과 같습니다.

- 오디오 출력은 Suspend 모드 진입 전에 중단되어야 합니다.

- 오디오 포커스를 유지하지 말고, 반드시 명시적으로 반납(abandon)해야 합니다.

- Resume 이후에는 자동으로 포커스를 복원하지 않습니다.

- 오디오 상태는 저장하고 필요 시 재요청 합니다.

### Suspend 모드 진입 시 처리​

Suspend 모드 진입이 감지되면 각 앱은 다음 순서로 처리해야 합니다.

- 진행 중인 오디오 재생 즉시 중단

- 오디오 포커스 반납(abandon) 수행

- 플레이백 상태 저장 (재생 여부, 위치 등)

- 오디오 관련 리소스 해제 (player, track 등)

위험
이 과정에서 새로운 오디오 재생 또는 오디오 포커스 요청은 허용되지 않습니다.

### 예외 정책​

다음 기능은 시스템 정책에 따라 제한적으로 예외가 허용될 수 있습니다.

- 전화 통화 및 긴급 통신

- 안전 관련 경고음

- 시스템 필수 음성 안내

단, 예외 기능은 Suspend 상태에서 사용자 오디오를 지속적으로 제공하기 위한 목적으로 허용되어서는 안 되며, 예외 적용 범위는 최소한으로 제한되어야 합니다.

### Resume 시 처리​

위험
Suspend 이후 Resume 시에는 이전 오디오 상태를 그대로 복원하지 않습니다.

- 오디오 포커스는 자동으로 복구되지 않음

- 앱은 현재 상태를 재평가 후 필요 시 포커스를 재요청

- 자동 재생 여부는 OEM 또는 사용자 정책에 따름

### 준수 사항​

각 앱은 다음 사항을 준수해야 합니다.

- Suspend 모드 진입 시 오디오 포커스를 유지하지 않습니다.

- 백그라운드에서 오디오를 계속 재생하지 않습니다.

- Resume을 위해 오디오 포커스를 선점하거나 유지하지 않습니다.

## 예제 (Kotlin)​

Suspend 진입 및 Resume 처리를 보여주는 예제 코드입니다.

`import android.content.Context

import android.media.AudioFocusRequest

import android.media.AudioManager

import android.os.Bundle

import androidx.appcompat.app.AppCompatActivity

class PlayerActivity : AppCompatActivity() {

    private lateinit var audioManager: AudioManager

    // 예시용 플레이어 상태

    private var isPlaying: Boolean = false

    private var lastPlaybackPositionMs: Long = 0L

    private var hasAudioFocus: Boolean = false

    private val focusChangeListener = AudioManager.OnAudioFocusChangeListener { focusChange ->

        when (focusChange) {

            AudioManager.AUDIOFOCUS_LOSS,

            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> {

                pausePlayback()

                abandonAudioFocus()

            }

        }

    }

    private val audioFocusRequest: AudioFocusRequest by lazy {

        AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)

            .setOnAudioFocusChangeListener(focusChangeListener)

            .build()

    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager

    }

    fun startPlayback() {

        if (!requestAudioFocus()) return

        // TODO: 실제 플레이어 start 호출

        isPlaying = true

    }

    fun onSuspendEntering() {

        // 1) 새 작업 시작 금지

        // 2) 진행 중 작업 중단

        pausePlayback()

        // 3) 상태 저장

        savePlaybackState()

        // 4) 오디오 포커스 반납

        abandonAudioFocus()

        // 5) 필요 시 네트워크/타이머/센서 리소스 정리

        releaseTransientResources()

    }

    fun onResumeFromSuspend() {

        // Resume 후 자동 재생을 바로 하지 않고,

        // 현재 시스템 상태/사용자 조건을 다시 확인한 다음 재개 여부 판단

        restorePlaybackState()

        val shouldAutoResume = false // OEM/앱 정책에 따라 결정

        if (shouldAutoResume) {

            startPlayback()

        }

    }

    private fun requestAudioFocus(): Boolean {

        val result = audioManager.requestAudioFocus(audioFocusRequest)

        hasAudioFocus = result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED

        return hasAudioFocus

    }

    private fun abandonAudioFocus() {

        if (!hasAudioFocus) return

        audioManager.abandonAudioFocusRequest(audioFocusRequest)

        hasAudioFocus = false

    }

    private fun pausePlayback() {

        if (!isPlaying) return

        // TODO: 실제 플레이어 현재 위치 조회

        lastPlaybackPositionMs = getCurrentPlaybackPosition()

        // TODO: 실제 플레이어 pause/stop 호출

        isPlaying = false

    }

    private fun savePlaybackState() {

        // TODO: SharedPreferences/DB/ViewModel 등에 저장

        // 예: 재생 위치, 현재 콘텐츠 ID, 재생 여부

    }

    private fun restorePlaybackState() {

        // TODO: 저장된 상태 복원

    }

    private fun releaseTransientResources() {

        // TODO: 타이머 취소, 센서/리스너 해제, 임시 wake lock 정리 등

    }

    private fun getCurrentPlaybackPosition(): Long {

        // TODO: 실제 플레이어 position 반환

        return lastPlaybackPositionMs

    }

}

`
