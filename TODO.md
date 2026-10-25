# TODO

접수 마감: **2026-11-15(일) 23:59** · 진행 상황: [진행상황.md](진행상황.md)

- [x] ~~전환 검토: 증상 블랙박스~~ → 기록 정보 가치 약해 폐기, **차마고찌 최종 확정** (10/25, [research/pivot-review.md](research/pivot-review.md))

- [ ] **기획서 시나리오를 [research/carmagotchi-scenarios.md](research/carmagotchi-scenarios.md) 기준으로 다시 쓰기** ← 다음 할 일 (기획서 시나리오 3은 주행 중 화면이라 정책 위반, 성장은 km → 함께한 날)
- [ ] 결정: 펫 종족 이름(가칭 '차마'), 그림체 (시나리오 3절)
- [ ] 확인: P단에서 앱 자동 표시 가능 여부, `getCurrentLocationInfo` 지역명, 브레이크 API 형태 (시나리오 10절)

- [ ] **반려 캐릭터 구체화** ([PRD.md](PRD.md) 10절 미결)
  - 결정: 캐릭터 정체(동물? 차 요정? 차종별 성격?)·이름·그림체
  - [x] 앱 이름: 한글 **차마고찌**, 영문 **Carmagotchi** (10/23). 남은 것: KIPRIS 상표 검색("다마고치" 유사 여부), APK 파일명용 영문 표기 확정
  - 앱 레포 `../appdevchallenge-apk` docs(PRD v0.2·architecture·ADR 0001~0012)를 반려 캐릭터 기준으로 다시 쓰기 — 지금은 이전 안(운행기록부) 기준. t2 세션 종료됨 → 이 세션 또는 새 세션에서
  - 기획서 숫자 확인: MAU(신차 10만 대·활성화율 50%는 가정) → Pleos 탑재 차 실제 판매량으로 교체
  - 에뮬레이터 설치 → 브레이크·조향·기어·누적거리·탑승·경고 신호와 Gleo 존재 확인
  - 한국 근거: 차 애착 인터뷰 2~3명, NOMI·EcoGuide와 차별점 문장
  - 접수양식 원고는 [기획서.md](기획서.md)에 반영됨 (MAU 숫자는 가정)

- [x] ~~법인 운행기록부 구체화~~ → 반려 캐릭터로 전환하며 보류 (10/23). 자료 `research/archive/`, [research/fleet-health.md](research/fleet-health.md)

- [x] ~~불편 목록에서 아이디어 다시 발산~~ → 선정 완료 (10/23)
  - 출발점: [research/pain-points.md](research/pain-points.md) 3절(패턴 5개)·4절(차 안 앱 관련성)
  - 기존 후보(위기 가디언·멀미 케어)에 얽매이지 않기
  - 결과는 [research/ideas.md](research/ideas.md)에 추가하고 7개 기준으로 채점
  - 다른 탈것·공간에서 빌려온 후보 6개 추가됨 (10/23, [research/inspiration.md](research/inspiration.md)). 쓰기 전에 [요약] 인용 원문 대조 필요
  - 에뮬레이터 확인 필요: 시트 위치로 운전자 교대 구분, 조회 API 갱신 주기, 제한속도 데이터 유무

- [ ] **불편 조사 보완** (필요하면)
  - 해외(Reddit 차단됨), 맘카페·차종 동호회(로그인 필요), 고령 운전자 본인 목소리

- [ ] **중복 확인**: 현대차 공모전 우수작 16개 내용 (최종 후보가 겹치지 않는지)

- [ ] **온라인 설명회 다시보기 시청 → 요약 → 반영** (다시보기 공개 후)
  - 요약은 `research/briefing-summary.md`에 정리 (심사 기준, 가산점, SDK 제약, Q&A)
  - [research/sdk-feasibility.md](research/sdk-feasibility.md) 6절 질문 4가지 중 답이 나온 것은 반영
  - 답이 안 나온 질문은 appdevchallenge@hyundai-partners.com 으로 이메일 문의

- [ ] **아이디어 확정 후 첫 개발 스파이크**: 에뮬레이터에서 핵심 차량 데이터가 실제로 읽히는지 확인

- [ ] **제출 준비**
  - 접수양식 docx(`contest-application-*.docx`)는 실명·연락처가 들어가므로 커밋 금지 → `.gitignore` 추가 여부 결정
  - 앱 레포 README 4항목(앱 이름·한 줄 소개 / 실행 방법 / 테스트 환경·설정 / APK 위치), `apk/팀명_앱이름_release.apk`
  - 블라인드: 공개 레포 주소·커밋 작성자에 계정명이 보임 → 설명회·문의로 허용 여부 확인
  - 심사용 GitHub 계정은 미공지(공개 레포라 불필요). 공지사항 수시 확인

- [ ] **Pleos 문서 확인 남은 것** ([research/pleos-dev-guide.md](research/pleos-dev-guide.md) 7절)
  - 디자인 가이드 이미지 속 수치(해상도·색·최소 터치 영역)는 원문 페이지 직접 확인
  - Gleo 스키마 승인 절차, 에뮬레이터에 Gleo가 있는지
  - 공모전 제출 앱에도 Pleos 앱 심사 기준을 적용하는지

## 완료
- [x] Pleos Playground SDK 실제 상태 확인 (10/23) — [research/pleos-sdk-api.md](research/pleos-sdk-api.md)
- [x] 실제 인터뷰 → 인터뷰이 부족으로 AI 페르소나 패널로 대체 (10/23)
- [x] 유튜브 영상·댓글 분석 2회 (10/23) — [research/youtube-creators.md](research/youtube-creators.md)
- [x] 커뮤니티 불편 조사 (10/23) — [research/pain-points.md](research/pain-points.md)
- [x] ~~패널 가설을 실제 근거로 바꾸기~~ — 업무 운행 기록(A) 제외로 불필요
