# Pleos Connect SDK API 목록 (Playground 콘솔 기준)

- 확인일: 2026-10-23, 프로젝트 `DriveLog`의 SDK 탭
- SDK 6개 · 권한 그룹 24개 · API 172개
- **[제한]** = 주행 중 호출 제한. Vehicle Control에만 있음 (나머지 SDK는 제한 없음)

## 요약

| SDK | 상태 | 권한 그룹 | API 수 | DriveLog 사용 |
|---|---|---|---|---|
| **Vehicle State** (조회) | ✅ 사용 가능 | 11 | 98 | **핵심** |
| **NaviHelper** | ✅ 사용 가능 | 2 | 16 | **핵심** |
| FusedLocation | ⏳ 준비 중 | 1 | 4 | 불필요 (NaviHelper `getCurrentLocationInfo`로 대체) |
| TextToSpeech | ⏳ 준비 중 | 1 | 3 | 선택 (나오면 추가) |
| SpeechToText | ⏳ 준비 중 | 1 | 4 | 선택 (나오면 추가) |
| Vehicle Control (제어) | ⏳ 준비 중 | 8 | 47 | 불필요 |

---

## 1. Vehicle State — ✅ 사용 가능 (조회 전용)

### CAR_INFO · 차량 제원 (2)
| API | 내용 |
|---|---|
| `getVINInfo` | 차량 식별 번호(VIN) |
| `getCurrentTemperatureDisplayUnit` | 온도 표시 단위 |

### CAR_DRIVE · 주행 정보 (13)
| API | 내용 |
|---|---|
| `getCurrentDistanceDriven` | **누적 주행거리(km, 계기판)** |
| `getTripCurrentDrivingDistance` / `getTripCurrentDrivingTime` | **현재 트립 주행거리 / 시간** |
| `getTripCumulativeDrivingDistance` / `getTripCumulativeDrivingTime` | 누적 트립 주행거리 / 시간 |
| `getTripInstantaneousDrivingDistance` | 현재 트립 순간 주행거리 |
| `getTripSinceRefillDrivingDistance` / `getTripSinceRefillDrivingTime` | 마지막 주유 이후 주행거리 / 시간 |
| `getCurrentDrivingModeState` | 드라이브 모드 (에코·스포츠 등, **기어 아님**) |
| `getCruiseControlState` / `getCruiseControlTargetSpeed` | 크루즈 상태 / 목표 속도 |
| `getCurrentBrakePedalStatus` | 브레이크 페달 (true = 밟음) |
| `getCurrentSteeringWheelAngle` | 전륜 조향각 |

### CAR_DOORS · 도어 (3)
`getCurrentDoorPosition`(열림/닫힘), `getDoorLockState`(잠금), `getCurrentGloveBoxLockState`(글로브박스)

### CAR_ENERGY · EV·연료 (12)
| API | 내용 |
|---|---|
| `getEvBatteryStateOfCharge` | **EV 배터리 충전율(SOC)** |
| `getFuelPercent` | 연료 잔량 % |
| `getCumulativeEvEfficiency` / `getCurrentEvEfficiency` / `getInstantaneousEvEfficiency` / `getSinceChargeEvEfficiency` | **전비** (누적 / 현재 / 순간 / 충전 이후) |
| `getCumulativeFuelEconomy` / `getCurrentFuelEconomy` / `getInstantaneousFuelEconomy` / `getSinceChargeFuelEconomy` | **연비** (누적 / 현재 / 순간 / 주유 이후) |
| `getEvChargeCurrentDrawLimit` | 충전 전류 상한 |
| `getEvChargeSwitchState` | 충전 중 여부 |

### CAR_CLIMATE · 공조 (15)
`getHvacPowerState`, `getHvacAutoState`, `getHvacAcState`, `getHvacMaxAcState`, `getHvacDefrosterState`, `getHvacMaxDefrostState`, `getHvacRecirculationState`, `getHvacAutoRecirculationState`, `getHvacAirCleanerState`, `getHvacDualState`, `getHvacFanDirection`, `getHvacFanSpeed`, `getHvacTemperature`(설정 온도), `getHvacTemperatureCurrent`(현재 온도 °C), `getHvacSteeringWheelHeatState`

### CAR_LIGHTS · 조명 (20)
- 앰비언트: `getAmbientColorAutoByDriveModeEnabled`, `getAmbientLightBrightness`, `getAmbientLightBrightnessColor`(ARGB), `getAmbientLightState`, `getAmbientLightSwitch`
- 실내등·독서등: `getCurrentCabinLightState`, `getCabinLightSwitch`, `getCurrentReadingLightState`, `getReadingLightSwitch`
- 외부등 상태: `getCurrentFrontFogLightState`, `getCurrentRearFogLightState`, `getCurrentHighBeamLightState`, `getCurrentLowBeamLightState`, `getCurrentTailLampLightState`
- 외부등 스위치: `getFrontFogLightSwitch`, `getRearFogLightSwitch`, `getHighBeamLightSwitch`, `getLowBeamLightSwitch`, `getTailLampLightSwitch`
- `getCurrentTurnSignalState`: 방향지시등

### CAR_SAFETY · 안전 (9)
| API | 내용 |
|---|---|
| `getLowTirePressure` | 타이어 저압 (값 없이 경고 여부만) |
| `getEngineOilLevelState` / `getBrakeFluidLevelState` / `getTransmissionOilLevelState` | 엔진오일 / 브레이크액 / 미션오일 경고 |
| `hasLowWasherFluidWarning` | 워셔액 부족 |
| `hasPowerDownWarningIndicator` | 전원 차단 경고 (true = 엔진 문제) |
| `hasSeatBeltNotBuckledWarning` | 안전벨트 미착용 경고 |
| `hasSeatAirbagEnabled` / `hasSeatAirbagBeenDeployed` | 에어백 이상 / 전개 여부 |

### CAR_SEATS · 좌석 (15)
- `getCurrentSeatOccupancy`: **좌석 탑승 여부**
- `getCurrentSeatBeltBuckledState`, `getCurrentSeatBeltHeightPosition`: 벨트 체결 / 높이
- 시트 위치: `getCurrentSeatForeAftPosition`(앞뒤), `getCurrentSeatHeightPosition`(높이), `getCurrentSeatDepthPosition`(깊이), `getCurrentSeatTiltPosition`(기울기), `getCurrentSeatBackrestAnglePosition`(등받이)
- 머리받침: `getCurrentSeatHeadrestAnglePosition`, `getCurrentSeatHeadrestForeAftPosition`, `getCurrentSeatHeadrestHeightAftPosition`
- 허리받침: `getCurrentSeatLumbarForeAftPosition`, `getCurrentSeatLumbarSideSupportPosition`
- `getHvacSeatTemperature`, `getHvacSeatVentilationState`: 열선 / 통풍

### 기타
- CAR_MIRROR (1): `getHvacSideMirrorHeatState`
- CAR_TOLL (1): `getCurrentEtcsVoiceGuidanceVolume` — 하이패스 안내 음량만 (통행 기록·요금은 없음)
- CAR_WINDOWS (7): `getCurrentWindowPosition`, `getCurrentWindowLockState`, `getCurrentWiperState`, `getCurrentWiperSwitch`, `getCurrentSmartGlassState`, `getCurrentSmartGlassLevel`, `getCurrentWindowBlindPosition`

## 2. NaviHelper — ✅ 사용 가능

### NAVI_ROUTE · 경로 정보 조회 (8)
| API | 내용 |
|---|---|
| `getCurrentLocationInfo` | **현재 위치** (FusedLocation 대체) |
| `getDestinationInfo` | **현재 목적지** (남은 거리·시간, 예상 통행료 포함) |
| `getWaypointInfo` | 현재 경유지 |
| `getRouteStateInfo` | 주행 경로 상태 |
| `getTBTInfo` | 턴바이턴 안내 |
| `getRecentDestinationInfo` | **최근 목적지** |
| `getBookmarkInfo` | **즐겨찾기** (거래처 프리셋으로 활용) |
| `getChargerOperatorInfo` | 충전소 사업자 |

### NAVI_ROUTE_SEARCH · 경로 탐색 (8)
`requestRoute` / `cancelRoute`(목적지 설정·취소), `findRoute`(탐색), `startRouteGuiding`(안내 시작), `requestReRoute`(재탐색), `addWaypoint` / `removeWaypoint`(경유지), `changeRouteOption`(경로 옵션)

## 3. 준비 중 SDK

| SDK | 그룹 | API |
|---|---|---|
| FusedLocation | FUSED_LOCATION (4) | `initialize`, `release`, `registerFusedLocationCallback`, `unregisterFusedLocationCallback` |
| TextToSpeech | TTS_SERVICE (3) | `setAudioAttributes`, `speak`, `stop` |
| SpeechToText | STT_SERVICE (4) | `request`, `sendAudio`(PCM → 텍스트), `completeAudioSend`, `stop` |

### Vehicle Control (47) — 준비 중
| 그룹 | API | 주행 중 제한 |
|---|---|---|
| CONTROL_CAR_DOORS (3) | `setDoorPosition`, `setDoorLock` / `setGloveBoxLock` | 앞 2개 [제한] |
| CONTROL_CAR_CLIMATE (14) | `setHvacPower`, `setHvacAuto`, `setHvacAc`, `setHvacMaxAc`, `setHvacDefroster`, `setHvacMaxDefrost`, `setHvacRecirculation`, `setHvacAutoRecirculation`, `setHvacAirCleaner`, `setHvacDual`, `setHvacFanDirection`, `setHvacFanSpeed`, `setHvacTemperature`, `setHvacSteeringWheelHeat` | 없음 |
| CONTROL_CAR_DRIVE (1) | `setRangeRemainingDistance` | [제한] |
| CONTROL_CAR_ENERGY (4) | `setEvChargeCurrentDrawLimit`, `setEvChargePercentLimit` / `setEvChargePortOpen`, `setEvChargeSwitch` | 뒤 2개 [제한] |
| CONTROL_CAR_WINDOWS (3) | `setWindowPosition`, `setWindowLock`, `setWiperMode` | 없음 |
| CONTROL_CAR_SEATS (14) | 시트·벨트·머리받침·허리받침 `moveSeat*` 11개, `selectSeatMemory` / `setHvacSeatTemperature`, `setHvacSeatVentilation` | 앞 12개 [제한] |
| CONTROL_CAR_MIRROR (1) | `setHvacSideMirrorHeat` | 없음 |
| CONTROL_CAR_LIGHTS (7) | `setFrontFogLightSwitch`, `setRearFogLightSwitch`, `setHighBeamLightSwitch`, `setLowBeamLightSwitch`, `setTailLampLightSwitch`, `setCabinLightSwitch`, `setReadingLightSwitch` | 전부 [제한] |

## 4. 주의할 점
- **기어(P/R/N/D) 조회 API가 Vehicle State에 없음.** `getCurrentDrivingModeState`는 에코·스포츠 같은 드라이브 모드임. 주차 판단은 AAOS 표준 `CarPropertyManager`의 `GEAR_SELECTION`·`PARKING_BRAKE_ON`으로 해야 함 → 에뮬레이터에서 확인 필요.
- **차량 속도 API도 없음.** AAOS `PERF_VEHICLE_SPEED`로 읽음 (Pleos FAQ 안내).
- 앰비언트 라이트는 조회만 되고 제어 API는 없음.
- 콘솔 설명과 API 이름이 어긋나는 항목 2개 (이름 기준으로 표기함):
  - `moveSeatBackrestAngle`: 이름은 등받이 각도, 설명은 "허리 받침 각도"
  - `setEvChargePercentLimit`: 이름은 충전 한도, 설명은 "배터리 충전 상태를 설정"
