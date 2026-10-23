> 출처: https://document.pleos.ai/docs/connect/guide/docs-design/getting-started/window (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Window Policy

| |  | Connect-S | Connect-W
| | 화면 구성 |
 앱 2개 실행 시: 1:1
 앱 1개 실행 시: 2:0 (기본값: 1:1) |

 2:1 또는 1:2 비율로 제공됨 (기본값: 2:1)
| | 기본 화면 |
 IVI 최초 실행 시
 - Primary : Navigation 앱
 최초 실행 이후 재탑승 시
 - Primary : Navigation 앱 |
 IVI 최초 실행 시
 - Primary : Navigation 앱
 - Secondary : Media 앱

 최초 실행 이후 재탑승 시
 - Primary : Navigation 앱
 - Secondary : 운전자가 마지막에 사용했던 Media 앱
| | 앱 실행 시 | 신규 앱은 이전 앱의 orientation과 동일하게 표시
 - 기존에 하나의 landscape 앱이 실행 중이면, 신규 앱도 landscape 모드로 실행
 - 기존에 두 개의 portrait 앱이 표시 중이면, 신규 앱은 primary window 영역에서 portrait 모드로 실행

 화면에서 사라진 앱은 종료되는 것은 아니며, 화면에 표시된 앱이 종료될 경우 최근 활성화된 앱 순으로 다시 표시됨 | 신규 앱은 항상 landscape 상태로 primary window에 표시
 - Primary window에 있던 앱은 secondary window로 이동
 - Secondary window 에 있던 앱은 사라짐

 화면에서 사라진 앱은 종료되는 것은 아니며, 화면에 표시된 앱이 종료될 경우 최근 활성화된 앱 순으로 다시 표시됨
| | 앱 화면 위치 변경 | 3 핑거 스와이프 혹은 윈도 바를 탭하여 두 개의 앱 위치를 변경 가능 | 3 핑거 스와이프 혹은 윈도 바를 탭하여 두 개의 앱 위치를 변경 가능
| | 앱 화면 사이즈 변경 | 3 핑거 스와이프 혹은 윈도 바를 드래그하거나 앱 윈도 버튼을 탭하여 landscape - portrait 전환 가능 | 3 핑거 스와이프 혹은 윈도 바를 드래그하거나 앱 윈도 버튼을 탭하여 landscape - portrait 전환 가능
| | 앱 종료 | 3 핑거 스와이프로 앱 화면을 종료

 앱을 종료시키면 오른쪽에서 왼쪽으로 최근 활성화된 앱 순으로 표시
 - Landscape window가 종료된 경우, landscape로 표시
 - Portrait window가 종료된 경우, portrait 상태로 표시
 디폴트 앱인 Navigation 앱은 종료할 수 없으며, 모든 앱이 종료되면 IVI가 처음 실행될 때와 동일한 화면 표시 | 3 핑거 스와이프로 앱 화면을 종료

 앱을 종료시키면 오른쪽에서 왼쪽으로 최근 활성화된 앱 순으로 표시
 - Primary window가 종료된 경우, secondary window 화면이 orientation을 유지한 상태로 primary window 위치에 표시
 - Secondary window가 종료된 경우, 최근 앱이 종료된 앱의 orientation과 동일한 상태로 표시

 디폴트 앱인 내비 앱은 종료할 수 없으며, 모든 앱이 종료되면 IVI가 처음 실행될 때와 동일한 화면 표시

## Connect-W specification​

- 최대 실행 가능한 앱의 개수는 2개로 제한합니다.

- App launcher(App library)는 운전석, 조수석에 모두 표시됩니다.

- Status bar는 운전석 GNB와 앱 영역 사이에 위치합니다.

- 조수석 쪽 App library에서 앱을 실행한 경우 해당 앱은 조수석 윈도에서만 실행됩니다.

알아두기

- Pleos Connect에서 제공하는 프리로딩 앱은 landscape view, portrait view 모두를 지원합니다.

- Driving view의 landscape view는 삭제되었고, resize handle이 제공되지 않습니다.

- Deep link(App to App): App A에서 App B를 실행할 경우 App A를 덮고 실행되며, App B의 기능 수행이 종료될 때 화면은 App A로 전환됩니다.

- 후방카메라 등 3:0 window를 full screen으로 나타낼 수 있도록 예외케이스를 적용할 예정입니다.
