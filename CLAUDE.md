# CLAUDE.md

현대차그룹 차량용 앱 공모전(Pleos Connect) 준비 저장소. 아직 코드 없음, 조사 문서만 있음. 개요는 [README.md](README.md).

## 작업별로 볼 파일
| 작업 | 먼저 볼 파일 |
|---|---|
| 규칙·일정·제출물·심사 기준 | [참가가이드_정리.md](참가가이드_정리.md) |
| 지금까지 한 일·결론 | [진행상황.md](진행상황.md) |
| 지금 할 일 | [TODO.md](TODO.md) |
| 사용자 불편 (원문 근거) | [research/pain-points.md](research/pain-points.md), 원문은 `research/raw/community/` |
| 아이디어 현황·점수 | [research/ideas.md](research/ideas.md) (맨 위 = 선정안) → 상세는 표의 "출처" 열 |
| 선정안(법인 차량 건강 기록부) 근거·경쟁·구체화 | [research/fleet-health.md](research/fleet-health.md), 원문은 `research/raw/fleet/` |
| 다른 탈것·공간에서 빌려온 아이디어 | [research/inspiration.md](research/inspiration.md), 원문은 `research/raw/inspiration/` |
| 채점 기준 | [research/idea-scorecard.md](research/idea-scorecard.md) |
| 기능이 SDK로 되는지 | [research/sdk-feasibility.md](research/sdk-feasibility.md), [research/pleos-sdk-api.md](research/pleos-sdk-api.md) |
| 기획서에 인용할 근거 | [research/voices.md](research/voices.md), [research/youtube-creators.md](research/youtube-creators.md) 2·3절 |
| 이미 있는 것·중복 확인 | [research/youtube-creators.md](research/youtube-creators.md) "한눈에 보기", [research/ideas.md](research/ideas.md) "피해야 할 것" |
| 실제 인터뷰 | [research/interviews.md](research/interviews.md) |

## 주의
- `personas.md`, `persona-panel.md`, `brainstorm-panel.md`의 페르소나 응답은 **AI 시뮬레이션**. 기획서 근거로 인용 금지.
- SDK는 Vehicle State · NaviHelper만 사용 가능. 다른 SDK 기능은 로드맵으로만.
- 블라인드 심사: 제출물·README·커밋에 실명·연락처·소속 금지.
- `.env`, `.env.*`는 읽거나 고치지 않는다(`.env.example`만 허용). `block-env` 훅이 막으면 우회하지 않는다.
- 추가 스킬(`mp-*`, `harness`)은 사용자가 `/이름`으로 부를 때만 쓴다. 목록·용도는 [MP-SKILLS.md](MP-SKILLS.md), 업데이트는 `python .claude/scripts/update-mp-skills.py`.
