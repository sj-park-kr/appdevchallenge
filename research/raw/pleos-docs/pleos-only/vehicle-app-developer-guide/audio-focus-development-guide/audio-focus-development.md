> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/audio-focus-development-guide/audio-focus-development (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# 오디오 포커스 개발 가이드
차량 안에서는 음악, 내비, 통화, 안전·긴급 안내 등 여러 사운드가 동시에 또는 경쟁적으로 재생될 수 있습니다. 어떤 소리를 재생·중단·거부할지는 아래 정책에 따라 설계하고 구현해야 하며, AAOS 오디오 포커스(https://source.android.com/docs/automotive/audio/audio-focus?hl=ko)를 바탕으로 하되 Pleos Connect 오디오 포커스 정책을 반드시 따릅니다.

AAOS 오디오 포커스 기본 개념
다음은 AAOS 오디오 포커스의 기본 개념 및 용어 설명입니다. 실제 설계·구현 시에는 이어지는 Pleos Connect 오디오 포커스 정책을 따릅니다.

#### 포커스 기본 원칙​
AAOS는 들어오는 요청의 CarAudioContext와 현재 포커스 보유자(들)의 CarAudioContext 사이의 사전 정의된 Interaction으로 요청을 처리합니다.

#### 포커스 상호작용​

- R(Reject): 거부 상호작용. 새 요청은 거부되어 포커스를 얻지 못합니다.

- E(Exclusive): 배타적 상호작용. 새 요청이 포커스를 획득하고 기존 보유자는 포커스를 상실합니다.

- C(Concurrent): 동시 상호작용. 조건을 만족하면 기존 보유자와 새 요청이 동시에 포커스를 유지합니다. (일반적으로 duck 기반)

중요: 포커스는 오디오 하위 시스템 제어의 유일 수단이 아니라, 충돌 방지/간접 제어 수단입니다.

#### C(Concurrent) 성립 조건​
동시 재생을 의도한다면, 들어오는 요청은 `AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK`을 사용해야 하며(대표), 기존 보유자 설정(예: duck 시 pause 여부)에 따라 C가 깨질 수 있습니다.

#### 포커스 보유자가 여러 명일 때 최종 결론 규칙​
C로 인해 현재 보유자가 여러 명일 수 있습니다. 이때 새 요청은 각 보유자와의 결과를 비교해 가장 보수적인 결과를 적용합니다.

- 우선순위: R > E > C

#### 통화 중 내비 처리 사용자 설정 (Optional)​
AAOS에는 통화 중 내비를 C → R로 바꾸는 사용자 설정이 존재할 수 있으며, 구현 시 플래그로 지원 가능합니다.

#### 지연 가능한 포커스 (Optional)​
비일시적(non-transient) 요청이 상호작용상 R로 거부될 상황이면, AAOS는 “지연 요청”을 지원할 수 있습니다. (요청자가 delayed를 수용하도록 빌드)

## Pleos Connect 오디오 포커스 정책​

Pleos Connect 오디오 포커스 정책은 다음 Pleos Connect Interaction Matrix를 따릅니다.

[이미지: Pleos Connect Interaction Matrix v1.0 (2026-01-28)]
Pleos Connect Interaction Matrix v1.0 (2026-01-28)

범례

- 행(Row): 현재 포커스 보유자의 컨텍스트 (Current Focus Holder’s Context)

- 열(Column): 새로 들어오는 요청의 컨텍스트 (Incoming Request’s CarAudioContext)

- MUSIC, NAVIGATION, VOICE_COMMAND, CALL_RING, CALL, ALARM, NOTIFICATION, SYSTEM_SOUND, EMERGENCY, SAFETY, VEHICLE_STATUS, ANNOUNCEMENT

- 셀 값: E/C/R

Suspend 모드 진입 및 Resume 시 오디오 포커스 처리 방법은 Suspend 모드 오디오 포커스 개발 가이드를 참조하세요.

## 개발사가 구현해야 할 동작 규칙​

### 포커스 요청 규칙 (요청 API 사용)​

- 각 오디오 스트림은 재생 시작 전 `AudioAttributes` + `AudioFocusRequest`로 포커스를 요청해야 합니다.

- C를 기대하는 컨텍스트(예: NAVIGATION이 MUSIC과 동시)라면 요청은 원칙적으로 `AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK`을 사용해야 합니다.

- E가 필요한 컨텍스트(예: CALL, EMERGENCY 등)는 목적에 맞는 gain을 사용하되, 포커스로 모든 것을 강제 제어하지 않아야 합니다.

### 포커스 변경 이벤트 처리 (필수)​

포커스 상실/획득 이벤트를 반드시 처리해야 합니다. 포커스 변경 이벤트 처리는 AAOS에서 필수 구현사항은 아니지만 자동차 UX/정책 준수를 위해 구현해야 합니다.

#### 권장 매핑 예시 (앱/서비스 공통)​

- `AUDIOFOCUS_GAIN` → 정상 재생

- `AUDIOFOCUS_LOSS` → 즉시 중단/정지

- `AUDIOFOCUS_LOSS_TRANSIENT` → 일시정지 후 복귀 가능

- `AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK` → duck(볼륨 감쇄) 적용

### 게임/엔터 앱 실행 전환 시 처리 정책​

- 게임 앱 실행으로 인한 오디오 포커스 상실 시 처리 정책 및 서비스 생명주기 구현 가이드는 Music/Audio 앱 개발 가이드를 참조하세요.

### Duck(감쇄) 구현 규칙​

- C는 보통 duck 기반 공존을 의미합니다.

- Duck 대상(예: MUSIC)은 `LOSS_TRANSIENT_CAN_DUCK` 수신 시 다음 내용을 적용합니다.

- 볼륨 감쇄(예: -X dB) 적용

- duck 해제 조건(다른 스트림 종료/포커스 반환)에서 원복

- Duck 적용 중 pause하도록 구성하면 C가 깨질 수 있으므로, 정책 의도에 맞게 설정/구현합니다.

### 다중 홀더 상황 처리 (중요)​

C로 인해 포커스 보유자가 여러 명일 때, 새 요청의 최종 결과는 R > E > C 우선순위로 가장 보수적 결과를 적용합니다.
다음의 내용을 구현해야 합니다.

- result = C로 시작

- 모든 currentHolder에 대해 Pleos Connect Interaction Matrix를 여러 현재 포커스 보유자에게 적용합니다. 다음은 개념적 의사 코드입니다.
`cell = MATRIX[currentHolder][incoming]

result = min_by_severity(result, cell) (R가 가장 강함)

`

- result에 따라 grant / steal / fail 처리

## 컨텍스트별 구현 가이드​

### EMERGENCY​

EMERGENCY 상황에서 다음의 내용을 구현합니다.

- EMERGENCY가 current일 때 대부분 incoming은 R(긴급음 보호)로 보장됩니다.

- Incoming EMERGENCY는 대부분 current를 E로 선점합니다.

- EMERGENCY-EMERGENCY는 C(표 대각)로 허용 → 테스트에서 긴급 중 음악/알림 요청이 실패하는지 반드시 확인합니다.

### SAFETY​

SAFETY 상황에서 다음의 내용을 구현합니다.

- SAFETY는 MUSIC/NAVIGATION/알림 등과는 대체로 C/E로 보장됩니다.

- EMERGENCY가 current면 SAFETY incoming은 R → Safety는 Emergency 아래라는 정책 의도가 명확하게 구현되어야 합니다.

### CALL / CALL_RING​

- CALL은 MUSIC에 대해 incoming이 R(통화 중 음악 금지)이며, NAVIGATION에 대해 incoming이 C(통화 중 내비 안내 허용)로 구현되어야 합니다.

- 단, 통화 중 내비 거부 옵션이 요구되면, 플래그로 NAVIGATION-in-CALL을 C→R로 변경 가능합니다.

### NAVIGATION ↔ MUSIC​

- 두 앱은 C로 공존을 기본으로 합니다.

- 실제 공존을 위해 NAVIGATION은 MAY_DUCK 포커스 요청을 사용해야 합니다.

### VOICE_COMMAND(Gleo) 동시 호출 처리​

- Gleo 음성 명령은 일반 오디오보다 우선 처리하되, EMERGENCY, CALL 등 매트릭스에서 Reject로 정의된 컨텍스트에는 우선하지 않습니다.

- Gleo가 호출되어 앱이 `AUDIOFOCUS_LOSS_TRANSIENT`를 수신하면, 즉시 재생을 중단하고 필요 시 오디오 포커스를 반납(abandon)해야 합니다.

## 설정/데이터 형태 권장​

### 매트릭스의 코드/설정화​

Pleos Connect 오디오 포커스 정책 변경 대응을 위해 하드코딩 금지를 권장합니다.

- 권장: interaction_matrix.json 또는 csv로 탑재 후 로딩

- 키: `current_context`, `incoming_context` → 값: E|C|R

### 로그/디버그 필수 항목​

- `incoming context`, `gain type`, `client id`

- current holders 목록

- holder별 matrix 결과(E/C/R)

- 최종 결과(R/E/C) 및 처리(grant/steal/reject)

- duck 적용/해제 이벤트(대상 스트림, 감쇄 값)

## 검증 체크리스트​

오디오 포커스 구현 후 다음 테스트 시나리오를 필수적으로 수행해야 합니다.

- MUSIC 재생 중 NAVIGATION 요청 → C (뮤직 duck + 내비 재생)

- CALL 중 MUSIC 요청 → R (요청 실패)

- MUSIC 중 CALL 요청 → (현재 MUSIC row, CALL col = E) → 통화가 뮤직 선점

- EMERGENCY 재생 중 어떤 요청(MUSIC/NOTIFICATION 등) → R

- C로 동시 홀더 2명(MUSIC+NAVIGATION) 상태에서 VOICE_COMMAND 요청

- 각각의 결과를 비교하여 최종이 보수적으로 적용되는지 확인합니다. (R/E 우선)

## 오디오 컨텍스트​

AAOS 오디오 구성을 단순화하기 위해 유사한 용도가 `CarAudioContexts`로 그룹화되었습니다. 이러한 오디오 컨텍스트는 `CarAudioService` 전체에서 라우팅, 볼륨 그룹, 오디오 포커스, 볼륨 낮추기 관리를 정의하는데 사용됩니다. AAOS의 정적 오디오 컨텍스트는 아래에 나열되어 있습니다.

이 표에서는 오디오 컨텍스트와 용도 간의 매핑을 설명합니다. 새 시스템 용도에는 강조 표시된 행이 제공됩니다.

| | CarAudioContext | AttributeUsages
| | MUSIC | `MUSIC`, `UNKNOWN`, `GAME`, `MEDIA`
| | NAVIGATION | `NAVIGATION`, `ASSISTANCE_NAVIGATION_GUIDANCE`
| | VOICE_COMMAND | `VOICE_COMMAND`, `ASSISTANT`
| | CALL_RING | `CALL_RING`, `NOTIFICATION_RINGTONE`
| | CALL | `CALL`, `VOICE_COMMUNICATION`, `VOICE_COMMUNICATION_SIGNALING`
| | ALARM | `ALARM`
| | NOTIFICATION | `NOTIFICATION`, `NOTIFICATION_*`
| | SYSTEM_SOUND | `SYSTEM_SOUND`, `ASSISTANCE_SONIFICATION`, `ASSISTANCE_ACCESSIBILITY`
| | EMERGENCY | `EMERGENCY`
| | SAFETY | `SAFETY`
| | VEHICLE_STATUS | `VEHICLE_STATUS`
| | ANNOUNCEMENT | `ANNOUNCEMENT`

정보

- 시스템 컨텍스트는 Android 11 이상에서만 사용할 수 있습니다.

- 상세 설명은 자동차 오디오 구성(https://source.android.com/docs/automotive/audio/audio-policy-configuration?hl=ko) 문서를 참조합니다.
