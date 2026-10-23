> 출처: https://document.pleos.ai/docs/connect/guide/docs-design/foundations/contents-creation/3d-contents (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# 3D Assets
Pleos Connect는 직관적인 사용성을 위해 3D model data를 활용하는 것을 권장합니다.

Go to Sample(https://www.figma.com/design/FYc6zTha14GLPvqsb1zmkD/%5BInternal%5D-Connect-2.0-Design-Kit(WIP)?node-id=29874-25562)

## 3D Model​

-
Lowpoly 상태의 차량 데이터 필요

- 내외장 포함 3Ds Max 기준 30 MB, FBX 기준 6 MB

- Catia, Alias 같은 도면 데이터에서 추출된 Highpoly 데이터일 경우, Retopology 진행

- Material, object 최적화 하여 Drawcall 최소화 작업

-
3D Data Format

- glTF(gl Transmission Format)

- 개발사: Khronos group 3D formats working group(Rhino3D)

- 3D 모델 정보를 JSON 형식으로 저장하는 3D 파일 형식

## Engine​

- Google Filament(link Filament google, Filament git)

- PBR 엔진으로써 모바일 우선이지만 멀티 플랫폼을 지원

## Properties​

-
glTF animation : Naming, 속성 값으로 컨트롤 되며 해당 naming은 차량 특성에 따라 변경 가능

- 3D Tool에서 animation key setting 후 export

- glTF의 animation 값을 control하거나, glTF의 rotation 값 변경으로 animation 가능

-
Part namaing rule : 각 Part 별 컨트롤에 영향이 없도록 정확한 naming을 부여

## Use cases​

### Climate​

공조를 버튼이 아닌 실내 환경 모델링 이미지를 통해 좌석별 편리한 공조 조작 경험을 제공할 수 있습니다.

Light

Dark

### Steering wheel​

3D 소스 직관적으로 인지될 수 있도록 필요한 영역을 클로즈업하여 사용할 수 있습니다.

### Seat Position​

3D 소스와 함께 버튼을 활용한 조작을 연동할 때 사용할 수 있습니다.

## Appendix​

glTF Part Naming_Exterior

Connect 모델링별 조작 가능한 요소에 대해 안내합니다.

| | 구분 | Exterior 구성요소 | Partname
| | Base | Static Object | Body
| | Door | Door Front Left | Door_F_L
| | Door Front Right | Door_F_R
| | Door Rear Left | Door_R_L
| | Door Rear Right | Door_R_R
| | Sidemirror Right | Door_Sidemirror_L
| | Sidemirror Left | Door_Sidemirror_R
| | Door Front Left Window | Door_F_L_Window
| | Door Front Right Window | Door_F_R_Window
| | Door Rear Left Window | Door_R_L_Window
| | Door Rear Right Window | Door_R_R_Window
| | Trunk | Trunk | Trunk
| | Trunk shock absorber | Trunk_shock_absorber
| | Frunk | Frunk | Frunk
| | Frunk shock absorber | Frunk_shock_absorber
| | Wheel | Wheel Front Right | Wheel_F_R
| | Wheel Front Light | Wheel_F_L
| | Wheel Rear All | Wheel_R_RL
| | Charge | Charging Port | Charging_Port
| | Roof | Sun roof | Sunroof_Glass
| | Sunroof_Shade
| | Roof glass | Roofglass_Shade
| | Wiper | Wiper Front | Wiper_F_R
| | Wiper_F_L
| | Wiper Rear | Wiper_R

glTF Part Naming_Interior(Connect기준)

| | 구분 | Interior 구성요소 | Partname
| | Base | Static Object | Body
| | Steering Wheel | Steering Wheel | Steering_Wheel
| | Seat_Front | Seat Front Left Top | Seat_F_L_Top
| | Seat Front Left Low | Seat_F_L_Low
| | Seat Front Right Top | Seat_F_R_Top
| | Seat Front Right Low | Seat_F_R_Low
| | Seat_Rear | Seat Rear Top | Seat_R_Top
| | Seat Rear Low | Seat_R_Low

glTF Part Naming_Lamp(Connect기준)

| | Lamp | Material name | Emissive | Alpha | etc
| | Head lamp All Off(Default) | Head_L_All | 0 | 1 | Head_L_Light glTF Hide
| | Head lamp All On | Head_L_All | 10 | 1 | Head_L_Light glTF Show
| | Rear lamp Positioning Off(Default) | Rear_L_Pos | 0 | 1 | cell
| | Rear lamp Positioning On | Rear_L_Pos | 2 | 1 | cell
| | Rear lamp Stop Off(Default) | Rear_L_Stop | 0 | 0.5 | cell
| | Rear lamp Stop On | Rear_L_Stop | 5 | 1 | cell
| | Turn signal All Off(Default) | Turn_S_All | 0 | 0 | cell
| | Turn signal All On | Turn_S_All | 5 | 1 | cell
