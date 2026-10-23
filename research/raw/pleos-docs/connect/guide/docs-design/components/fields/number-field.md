> 출처: https://document.pleos.ai/docs/connect/guide/docs-design/components/fields/number-field (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# Number Field

#### 숫자 정보를 입력하기 위한 필드입니다.​

1. Root : 텍스트 필드 전체를 감싸는 최상위 컨테이너 영역

2. Label : 사용자가 입력한 요소

3. Cursor : 텍스트를 입력할 수 있는 상태에 제공되는 커서 요소

4. Field : 사용자가 정보를 입력하는 영역

## States​

| | State | Value | Description
| | Value | String | Text Field에 입력된 텍스트 정보
| | Focused | True / False | 터치 또는 보이스오버로 접근시 Text Field영역을 인식하고있는 상태일 때 True로 전환
| | Disabled | True / False | True일 경우, Text Field 입력 및 접근이 불가능한 상태. Focused state가 작동하지 않음
| | Read Only | True / False | True일 경우, Text Field가 입력값에 접근할 순 있지만 변경할 순 없음 Focused state는 작동하는 상태
| | Invalid | True / False | 입력 값이 유효한 값인지 아닌지 여부를 체크하는 상태

## Properties​

| | State | Value | Description
| | Size | Large, Medium | Text field의 사이즈
