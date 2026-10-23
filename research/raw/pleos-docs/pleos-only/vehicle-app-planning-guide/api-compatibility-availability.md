> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-planning-guide/api-compatibility-availability (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# API 호환성 및 가용성
Pleos Connect 앱을 설계·개발할 때는 차량에서 사용할 수 있는 Pleos Connect SDK의 API와 AAOS vehicle property를 미리 확인해야 합니다.
이 페이지에서는 Pleos Connect 적용 차량의 API 호환성과 AAOS Vehicle Property 가용성을 정리합니다.

## Pleos Connect SDK API 호환성​

Pleos Connect가 적용된 차량 모델에 따라 API 지원 여부가 달라질 수 있습니다.

| | Pleos Connect SDK | 차량 모델별 API 호환성
| | Vehicle SDK | 모델에 따라 다름

 API 가용 여부는 Vehicle SDK 도메인별 `checkXXXCapabilities` API로 확인할 수 있습니다.
| | NaviHelper SDK | 내비게이션이 탑재된 차량에 한해 전체 호환
| | TextToSpeech SDK, SpeechToText SDK | 전체 호환
| | FusedLocation SDK | 모델에 따라 다름

 FusedLocation SDK 가용 여부는 FusedLocation SDK `isSupported` API로 확인할 수 있습니다.

## AAOS Vehicle Property 가용성​

AAOS Vehicle Property의 지원 여부와 접근 가능 상태는 차량 모델 및 프로퍼티에 따라 다를 수 있습니다. 프로퍼티의 정의와 대상 차량에서의 지원 여부를 확인하려면 Google 공식 문서를 참조하시기 바랍니다.

- Property 정의와 ID 확인: VehiclePropertyIds

- 실제 차량에서의 설정 및 접근 가능 여부 확인: CarPropertyManager

주의

- 차량 모델에 따라 프로퍼티 지원 여부가 다를 수 있으므로, 모델명을 기준으로 분기 처리하지 말고 `VehiclePropertyIds`와 `CarPropertyManager`를 사용하여 실제 지원 여부와 접근 가능 상태를 확인하시기 바랍니다.

- Pleos Connect SDK API가 제공하지 않는 특수 프로퍼티가 필요한 경우, 직접 구현 전 반드시 기술 지원팀에 검토를 요청하시기 바랍니다.
