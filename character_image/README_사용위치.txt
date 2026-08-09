도서관 방탈출 웹앱 캐릭터 이미지 세트
(2026-08-09 기준 — 실제 코드 참조 현황에 맞춰 갱신)

■ 현재 앱에서 쓰는 이미지

[01_start]
01_boogi_reading.png
- 시작 화면 가운데 부기
- 브라우저 탭 파비콘으로도 사용 (index.html의 link rel="icon")

02_duri_hi.png
- 시작 화면 왼쪽 두리
- 문제 화면에서 두리가 안내할 때 말풍선 옆 캐릭터로도 재사용
  (script.js의 CHARACTER_IMAGES.guideDuri)

03_seoi_hi.png
- 시작 화면 오른쪽 서이

[02_question]
03_seoi_pointing.png
- 문제 화면에서 서이가 안내할 때 말풍선 옆 캐릭터
  (script.js의 CHARACTER_IMAGES.guideSeoi)

[03_feedback]
04_duri_correct_singing.png
- 정답 팝업

05_seoi_retry_question.png
- 오답 팝업, 설문 준비 중 팝업

[04_finish]
finish-celebration.png
- 완료 화면 메인 이미지
- 첫 화면에서 같이 받지 않도록 index.html에서는 data-src로 두고
  script.js(loadFinishHero)가 완료 화면에 도달할 때 붙인다


■ 현재 앱에서 쓰지 않는 이미지 (삭제 후보)

04_finish/06_duri_seoi_highfive.png   582KB
04_finish/07_duri_seoi_basic.png      528KB
05_branding/08_research_group_logo.png 791KB
  → 하단 주최 로고는 images/ 폴더의 3종(logo-busan-library / logo-future-edu /
    logo-gamification)을 쓴다.

지우면 약 1.9MB를 줄일 수 있다. git에 커밋되어 있으므로
git checkout -- <경로> 로 언제든 되돌릴 수 있다.


■ 배치 원칙
- 문제 4개는 안내 캐릭터(두리/서이)를 번갈아 쓴다
- 정답·오답 이미지는 팝업에서만 표시
- 한 화면에 큰 캐릭터는 최대 2개


■ 출처
- 부기: 부산시 소통캐릭터 부기 공식 가이드북 이미지
- 두리·서이: 부산게이미피케이션교육연구회 캐릭터 이미지
