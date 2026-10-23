> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-planning-guide/pleos-connect-sdk-api (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# SDK API 정책
AAOS Alignment 정책, 하위 호환성 정책 등 Pleos Connect SDK API 정책을 설명합니다.

## API 디자인 원칙: AAOS Alignment​

Pleos Connect SDK는 동일 혹은 유사 기능의 API가 AAOS에 추가될 경우 플랫폼 파편화를 최소화하고 앱의 이식성을 극대화하기 위해 AAOS Alignment 정책을 준수합니다.

- 표준 우선 정책: 동일하거나 유사한 기능의 API가 AAOS 표준에 이미 존재하는 경우, 해당 표준 API 사용을 권장하며 Pleos Connect SDK에서는 중복 기능을 제공하지 않습니다.

- 확장 기능 제공: AAOS 표준 API로 접근이 불가능하거나, 제조사 고유의 보안 및 특화 제어가 필요한 영역에 한하여 Pleos Connect SDK 전용 API를 제공합니다.

[이미지: Pleos Connect API Policy]

## 하위 호환성 및 마이그레이션​

차량 플랫폼의 진화에 발맞추어, SDK 전용 기능이 향후 AAOS 표준 스펙으로 편입될 수 있습니다. 이 경우 SDK는 다음과 같이 개발자의 마이그레이션을 지원합니다.

- 호환성 보장: Pleos Connect SDK의 특정 API가 AAOS 표준으로 수용되더라도, 기존 SDK API는 최소 2개의 메이저 버전(Major Version)까지 하위 호환성을 유지합니다.

- 안정적 전환: 개발사는 충분한 유예 기간 동안 기존 코드를 유지하면서 차세대 표준 API로 점진적인 전환을 진행할 수 있습니다.

## API 선택 기준: AAOS와 Pleos Connect SDK 비교​

앱 개발 시 필요한 데이터나 제어 기능의 성격에 따라 어떤 API를 사용할지 확인한 뒤 설계에 반영합니다.

| | 구분 | 접근 경로 | 대상 기능 예시
| | 표준 데이터 | AAOS Car API | 속도, 기어 상태, 외기 온도, 연료 레벨 등
| | 특화 기능 | Pleos Connect SDK | 제조사 전용 시트 제어, 특화 라이팅, 고유 보안 인증 등

## 차량 모델별 API 호환성​

Pleos Connect 차량 모델에 따라 지원 API가 다를 수 있습니다.
자세한 내용은 API 호환성 및 가용성 문서를 참조하시기 바랍니다.
