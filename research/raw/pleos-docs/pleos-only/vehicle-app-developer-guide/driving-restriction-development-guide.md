> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/driving-restriction-development-guide (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# 주행 규제 개발 가이드
Pleos Connect 앱은 플랫폼이 제공하는 `CarUxRestrictions` 상태를 기준으로 주행 중 UX 제한을 적용해야 합니다. 이 문서에서는 `CarUxRestrictions`를 활용한 주행 규제 연동 방법과 앱 구현 시 유의 사항을 설명합니다. 지역·기능별 제한 범위는 지역별 주행 규제 정책을, 운전 중 UX 설계 원칙은 주행 안전을 고려한 설계를 참조하세요.

## CarUxRestrictions 연동​

앱은 AAOS CarUxRestrictionsManager를 통해 CarUxRestrictions 값을 얻어 주행 규제 상태를 확인하고, 사양에 맞게 동작하도록 구현합니다.

`CarUxRestrictionsManager`에 `registerListener()`를 등록하면 `onUxRestrictionsChanged()` 콜백으로 변경된 `CarUxRestrictions`를 수신합니다.

DO 미선언 앱의 상황별 사용 가능 여부는 지역별 주행 규제 정책을 참조하세요. DO를 선언한 앱도 주행 규제가 활성화되면 `CarUxRestrictions`와 `ActiveRestrictions`를 확인하여 기능별 UX 제한을 직접 적용해야 합니다.

### 샘플 코드​

동영상 재생 제한
`if (mCurrentCarUxRestrictions.isRequiresDistractionOptimization()

        && (mCurrentCarUxRestrictions.getActiveRestrictions()

            & CarUxRestrictions.UX_RESTRICTIONS_NO_VIDEO) != 0) {

    stopPlayingVideo();

}

`

### UX 규제 항목과 CarUxRestrictions 매핑​

기능별 `CarUxRestrictions` 플래그는 onUxRestrictionsChanged() 콜백으로 수신한 CarUxRestrictions의 `ActiveRestrictions`를 기준으로 적용합니다.

- 예: 동영상(DMB)은 `CarUxRestrictions.UX_RESTRICTIONS_NO_VIDEO`로 주행 중 재생 제한 여부를 판단합니다.

- UX 규제 피그마 사양서는 Pleos Playground에 공개하지 않습니다.

플랫폼이 지역별 규제 사양에 맞는 `ActiveRestrictions`를 내려주므로, 앱은 notify로 수신한 `CarUxRestrictions`만 반영하면 됩니다.
키보드·검색 등 기능별 지역 허용·잠금에 대한 정보는 지역별 주행 규제 정책을 참조합니다.
