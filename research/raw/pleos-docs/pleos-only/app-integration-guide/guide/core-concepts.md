> 출처: https://document.pleos.ai/docs/pleos-only/app-integration-guide/guide/core-concepts (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Gleo Interface

## 1. Core Concepts​

- Gleo Interface는 Gleo AI와 타사 앱이 차량 내에서 사용자의 음성 명령을 처리하기 위해 서로 상호작용하는 방식을 정의하는 인터페이스입니다.

- Gleo Interface는 앱에서 정의한 function call을 LLM이 생성하고 앱의 응답을 바탕으로 최종 답변을 생성하는 function calling 방식에 기반합니다.

- 이 방식은 기본적으로 OpenAI의 function calling 메커니즘과 유사하지만, Android 애플리케이션을 지원하기 위해 스키마에 추가적인 수정 및 확장을 적용하였습니다.

- Gleo AI와 연동하려면, 타사 앱은 먼저 앱에서 Gleo AI가 호출할 수 있는 function과 그 호출 방식을 정의한 JSON 파일인 App Schema를 등록해야 합니다.

- Gleo Interface를 사용하면, Gleo AI는 Gleo Action을 통해 앱을 호출하고, Callback을 통해 앱의 응답을 받을 수 있습니다.

- 아래는 음악 앱이 Gleo Action 및 Callback을 통해 Gleo AI와 상호작용하는 예시를 보여줍니다.

- 현재 가이드는 개발이 진행됨에 따라 지속적으로 개선될 예정입니다.
