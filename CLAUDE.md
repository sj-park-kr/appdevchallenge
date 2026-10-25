# CLAUDE.md

현대차그룹 차량용 앱 공모전(Pleos Connect) 준비 저장소. 조사·기획 문서만 있음. 개요는 [README.md](README.md).
**앱 코드는 별도 레포 `../appdevchallenge-apk`** (심사 제출용 공개 레포 https://github.com/sj-park-kr/appdevchallenge-apk, 사용자 계정으로 커밋).

## 작업별로 볼 파일
| 작업 | 먼저 볼 파일 |
|---|---|
| 규칙·일정·제출물·심사 기준 | [참가가이드_정리.md](참가가이드_정리.md) |
| 지금까지 한 일·결론 | [진행상황.md](진행상황.md) |
| 지금 할 일 | [TODO.md](TODO.md) |
| 사용자 불편 (원문 근거) | [research/pain-points.md](research/pain-points.md), 원문은 `research/raw/community/` |
| 아이디어 현황·점수 | [research/ideas.md](research/ideas.md) (맨 위 = 선정안) → 상세는 표의 "출처" 열 |
| **선정안 PRD — 차량 반려 캐릭터 (기능·범위·SDK 매핑)** | [PRD.md](PRD.md), 사업성 [research/car-pet-business.md](research/car-pet-business.md) |
| **차마고찌 상세 시나리오·벤치마킹·행동 설계 (확정안)** | [research/carmagotchi-scenarios.md](research/carmagotchi-scenarios.md) |
| 해커톤 탈락 교훈으로 본 위험 점검 (증상 블랙박스는 폐기) | [research/pivot-review.md](research/pivot-review.md) |
| 보류한 이전 안(법인 운행기록부) | `research/archive/`, [research/fleet-health.md](research/fleet-health.md) |
| **기획서(접수양식 02장) 원고** | [기획서.md](기획서.md) → `node scripts/fill-form.js`로 docx 생성 |
| 다른 탈것·공간에서 빌려온 아이디어 | [research/inspiration.md](research/inspiration.md), 원문은 `research/raw/inspiration/` |
| 채점 기준 | [research/idea-scorecard.md](research/idea-scorecard.md) |
| **Pleos 공식 개발 문서(에뮬레이터·주행 규제·심사·디자인·Gleo 연동)** | [research/pleos-dev-guide.md](research/pleos-dev-guide.md), 원문 `research/raw/pleos-docs/` |
| 기능이 SDK로 되는지 | [research/sdk-feasibility.md](research/sdk-feasibility.md), [research/pleos-sdk-api.md](research/pleos-sdk-api.md) |
| 기획서에 인용할 근거 | [research/voices.md](research/voices.md), [research/youtube-creators.md](research/youtube-creators.md) 2·3절 |
| 이미 있는 것·중복 확인 | [research/youtube-creators.md](research/youtube-creators.md) "한눈에 보기", [research/ideas.md](research/ideas.md) "피해야 할 것" |
| 실제 인터뷰 | [research/interviews.md](research/interviews.md) |

## 주의
- `personas.md`, `persona-panel.md`, `brainstorm-panel.md`의 페르소나 응답은 **AI 시뮬레이션**. 기획서 근거로 인용 금지.
- SDK는 Vehicle State · NaviHelper만 사용 가능. 다른 SDK 기능은 로드맵으로만.
- 블라인드 심사: 제출물·README·커밋에 실명·연락처·소속 금지.
- `.env`, `.env.*`는 읽거나 고치지 않는다(`.env.example`만 허용). `block-env` 훅이 막으면 우회하지 않는다.
- 응답은 `caveman` 말투다. 훅(`.claude/hooks/caveman.mjs`)이 세션 시작·매 턴·모든 서브에이전트에 넣고, 사용자가 "normal mode"라고 할 때까지 유지한다. 문서(`.md`, 기획서)는 보통 문체로 쓴다.
- **위임**: 거의 모든 작업(조사·출처 수집·파일 탐색·문서 작성·수정)은 서브에이전트에 맡긴다. 메인은 작업을 나누고, 위임 프롬프트를 쓰고, 결과를 검토·통합해 보고한다. 서로 독립인 작업은 한 메시지에서 병렬로 띄운다. 위임 프롬프트에는 목표, 먼저 읽을 파일, 이미 확인한 것, 산출물 경로·형식, 이 파일의 주의 사항(블라인드, `.env`, AI 페르소나 인용 금지, 문서는 보통 문체)을 적는다. 메인이 직접 하는 것: 한두 줄 수정, 바로 답할 수 있는 질문, 사용자 결정이 필요한 질문.
- 추가 스킬(`mp-*`, `harness`)은 사용자가 `/이름`으로 부를 때만 쓴다. 목록·용도는 [MP-SKILLS.md](MP-SKILLS.md), 업데이트는 `python .claude/scripts/update-mp-skills.py`.
