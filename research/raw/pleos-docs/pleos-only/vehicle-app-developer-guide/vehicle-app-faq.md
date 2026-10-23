> 출처: https://document.pleos.ai/docs/pleos-only/vehicle-app-developer-guide/vehicle-app-faq (수집 2026-10-23, 원문 HTML에서 본문만 추출)

# FAQ - 앱 실행 환경 및 플랫폼 리소스

## 실행 플랫폼 확인​

앱이 어떤 기기 또는 환경에서 실행 중인지 확인하려면 디바이스 식별 값을 읽어야 합니다.

`android.os.Build.DEVICE`를 사용하여 `ro.product.device`에 해당하는 값을 확인합니다.

이 값은 실차에서만 유효하게 제공되므로, 에뮬레이터에서는 플랫폼을 구분하는 용도로 사용할 수 없습니다.

플랫폼별 반환 값은 다음과 같습니다.

- Connect-S: `CONNECT_S`

- Connect-L: `CONNECT_L`

- Connect-W: `CONNECT_W`

## 지역 코드 확인​

앱은 `product.sw.target_region`으로 지역을 구분하고, 지역별 UX 정책을 적용해야 합니다. 지역별 값은 다음과 같습니다.

- 한국 지역: `KOR`

- 유럽 지역: `EUR`

- 북미 지역: `USA`, `CAN` (미국, 캐나다)

## 내비게이션 탑재 여부 확인​

차량의 내비게이션 탑재 여부를 확인하는 방법은 현재 퍼블릭 오픈하지 않고 있습니다. 자세한 사항은 partnership@pleos.ai로 문의하시기 바랍니다.

## 클러스터 속도 조회 방법​

Pleos Connect 클러스터에 보이는 속도와 앱에 표시하는 속도는 데이터 출처가 다르면 달라질 수 있습니다. 예를 들어 앱이 GPS로 속도를 계산하면, 클러스터가 쓰는 차량 신호 기반 속도와 어긋날 수 있습니다.

Pleos Connect 클러스터는 구글 `PERF_VEHICLE_SPEED` 프로퍼티로 차량 속도를 표시하므로, 클러스터와 동일한 속도를 쓰려면 `CarPropertyManager`로 `PERF_VEHICLE_SPEED`를 읽습니다.

앱에서 클러스터와 동일한 차량 속도를 사용하려면 AAOS의 `CarPropertyManager`를 통해 `PERF_VEHICLE_SPEED` 프로퍼티를 조회합니다. 필요한 권한을 선언한 후 `CarPropertyManager`를 획득하고, 현재 값 조회 또는 변경 이벤트 구독 API를 사용합니다.

API 사용 방법과 버전별 상세 내용은 구글의 CarPropertyManager 공식 문서와 `PERF_VEHICLE_SPEED` 프로퍼티 문서를 참조합니다.

## 배터리 정보 확인 방법​

차량의 배터리 충전 상태를 확인하려면 Vehicle SDK의 `getEvBatteryStateOfCharge` API 문서를 참조합니다.

## 미디어 코덱 지원 정보​

실차 환경에서 지원되는 미디어 코덱은 플랫폼에 따라 다르므로, 자세한 내용은 이 섹션의 플랫폼별 정보를 확인하시기 바랍니다.
Pleos Connect Emulator에서 지원되는 미디어 코덱은 실차 환경과 다를 수 있으므로, 에뮬레이터의 지원 결과를 실차 환경에 그대로 적용하지 마시기 바랍니다.

### 플랫폼별 미디어 코덱 정보​

#### Connect-S/L 코덱 정보​

| | 미디어 유형 | 지원 코덱
| | 오디오 | FLAC, AC3+, ALAC, APE, PCM, TTA, AIFF, WMA, OGG, DSD, DFF/DSF, DTS, WAV, MP2, MP3, BSAC, ADPCM, HE-AAC, HE-AAC+, AAC, EAC3, EAC3+JOC, OPUS, AMR 등
| | 비디오 | MPEG-1, MPEG-2, VC-1, WMV, H.263, MP42, MP43, MPEG4 Part2, Xvid, VP6, VP7, VP8, VP9, H.264, HEVC(H.265) – main 10 profile(기타 포함), x265, AV1 등

### Connect-W 코덱 정보​

| | 미디어 유형 | 지원 코덱
| | 오디오 | PCM, AAC, MPEG, AMR, WMA, Opus, Vorbis, FLAC, ALAC, APE, Dolby, DTS, ADPCM, AIFF, TTA, BSAC
| | 비디오 | MPEG-1, MPEG-2, MPEG-4 Part 2, H.263, H.264 (AVC), H.265 (HEVC), AV1, VP8, VP9

### Pleos Connect Emulator 코덱 정보​

| | 미디어 유형 | 지원 코덱
| | 오디오 디코더 | AMR-NB: c2.android.amrnb.decoder
 AMR-WB: c2.android.amrwb.decoder
 FLAC: c2.android.flac.decoder
 G.711 A-law: c2.android.g711.alaw.decoder
 G.711 μ-law: c2.android.g711.mlaw.decoder
 AAC: c2.android.aac.decoder
 MP3: c2.android.mp3.decoder
 Opus: c2.android.opus.decoder
 PCM Raw: c2.android.raw.decoder
 Vorbis: c2.android.vorbis.decoder
| | 비디오 디코더 | H.263: c2.android.h263.decoder
 AV1: c2.android.av1.decoder
 AVC/H.264: c2.android.avc.decoder
 HEVC/H.265: c2.android.hevc.decoder
 MPEG-4 Part 2: c2.android.mpeg4.decoder
 VP8: c2.android.vp8.decoder
 VP9: c2.android.vp9.decoder
| | 오디오 인코더 | AMR-NB: c2.android.amrnb.encoder
 AMR-WB: c2.android.amrwb.encoder
 FLAC: c2.android.flac.encoder
 AAC: c2.android.aac.encoder
 Opus: c2.android.opus.encoder
| | 비디오 인코더 | H.263: c2.android.h263.encoder
 AV1: c2.android.av1.encoder
 AVC/H.264: c2.android.avc.encoder
 HEVC/H.265: c2.android.hevc.encoder
 MPEG-4 Part 2: c2.android.mpeg4.encoder
 VP8: c2.android.vp8.encoder
 VP9: c2.android.vp9.encoder
