/**
 * 부기의 사라진 낱말을 찾아라!
 * — 부산도서관 탐험책 완성 대작전
 *
 * 정답 입력: 10개 글자 조각을 순서대로 눌러 빈칸을 채운 뒤
 * 「낱말 확인하기」로 제출합니다.
 */

const CHARACTER_IMAGES = {
  startBoogi: "character_image/01_start/01_boogi_reading.png",
  startDuri: "character_image/01_start/02_duri_hi.png",
  startSeoi: "character_image/01_start/03_seoi_hi.png",
  guideSeoi: "character_image/02_question/03_seoi_pointing.png",
  correctDuri: "character_image/03_feedback/04_duri_correct_singing.png",
  retrySeoi: "character_image/03_feedback/05_seoi_retry_question.png",
  finishCharacters: "character_image/04_finish/06_duri_seoi_highfive.png",
  researchLogo: "character_image/05_branding/08_research_group_logo.png",
};

const GAME_CONFIG = {
  id: "boogi-lost-words",
  title: "부기의 사라진 낱말을 찾아라!",
  subtitle: "부산도서관 탐험책 완성 대작전",
  totalMissions: 4,
  surveyUrl: "",
  musicStorageKey: "boogiMusicOn",

  opening: {
    title: "부기의 사라진 낱말을 찾아라!",
    message:
      "부기가 만든 도서관 탐험책에서 중요한 낱말 네 개가 사라졌어요! 두리, 서이와 함께 낱말을 찾아주세요.",
    buttonText: "탐험 시작!",
  },

  finish: {
    title: "부기의 탐험책 완성!",
    message:
      "네 개의 낱말이 제자리로 돌아왔어요!",
    buttonText: "설문조사하고 경품 교환하기",
  },
};

const MISSIONS = [
  {
    id: "mission-1",
    order: 1,
    placeLabel: "꿈뜨락 어린이실",
    moveGuide: "1층 꿈뜨락 어린이실로 이동하세요!",
    storyTitle: "드나드는 아이들의 낱말",
    question: "입구의 알록달록한 글자를 찾아 순서대로 눌러 주세요.",
    displayQuestion: "【　】",
    answer: "들락날락",
    answerSyllables: ["들", "락", "날", "락"],
    hintInitials: ["ㄷ", "ㄹ", "ㄴ", "ㄹ"],
    tiles: ["들", "락", "날", "락", "꿈", "책", "문", "놀", "길", "별"],
    hint: "어린이실 입구 유리창의 초록색과 주황색 글자를 왼쪽부터 읽어보세요.",
    recoveredWord: "들락날락",
    correctTitle: "첫 번째 낱말을 찾았어요!",
    correctMessage: "‘들락날락’이 탐험책으로 돌아왔어요.",
    image: "question_image/mission-1.png",
    guideName: "duri",
    guideText: "1층 꿈뜨락 어린이실로 가볼까요?",
  },
  {
    id: "mission-2",
    order: 2,
    placeLabel: "부기존",
    moveGuide: "꿈뜨락 어린이실 안 부기존으로 이동하세요!",
    storyTitle: "부기의 소중한 마음",
    question: "부기 그림 위에 쓰인 문장을 보고 ‘당신처럼’ 뒤의 낱말을 완성해 주세요.",
    displayQuestion: "당신처럼 【　】",
    answer: "애지중지",
    answerSyllables: ["애", "지", "중", "지"],
    hintInitials: ["ㅇ", "ㅈ", "ㅈ", "ㅈ"],
    tiles: ["애", "지", "중", "지", "사", "랑", "책", "꿈", "별", "꼭"],
    hint: "부기 그림 위쪽의 분홍색 네 글자를 살펴보세요.",
    extraHint: "첫 글자는 ‘애’예요.",
    recoveredWord: "애지중지",
    correctTitle: "부기의 소중한 낱말을 찾았어요!",
    correctMessage: "‘애지중지’가 탐험책으로 돌아왔어요.",
    image: "question_image/mission-2.png",
    guideName: "seoi",
    guideText: "천천히 이동해요!",
  },
  {
    id: "mission-3",
    order: 3,
    placeLabel: "AI디지털배움터",
    moveGuide: "본관 1층 AI디지털배움터로 이동하세요!",
    storyTitle: "미래를 여는 낱말",
    question: "안내판에서 ‘AI’ 다음에 쓰인 세 글자를 순서대로 눌러 주세요.",
    displayQuestion: "AI 【　】 배움터",
    answer: "디지털",
    answerSyllables: ["디", "지", "털"],
    hintInitials: ["ㄷ", "ㅈ", "ㅌ"],
    tiles: ["디", "지", "털", "로", "봇", "체", "험", "책", "꿈", "별"],
    hint: "안내판 가장 위쪽에서 ‘AI’ 바로 다음에 쓰인 말을 읽어보세요.",
    recoveredWord: "디지털",
    correctTitle: "세 번째 낱말을 찾았어요!",
    correctMessage: "‘디지털’이 탐험책으로 돌아왔어요.",
    image: "question_image/mission-3.png",
    guideName: "duri",
    guideText: "이번에는 AI디지털배움터예요!",
  },
  {
    id: "mission-4",
    order: 4,
    placeLabel: "실감서재",
    moveGuide: "도서관 3층 실감서재로 이동하세요!",
    storyTitle: "마지막 탐험 장소",
    question: "이곳의 이름을 순서대로 완성해 주세요.",
    displayQuestion: "【　】",
    answer: "실감서재",
    answerSyllables: ["실", "감", "서", "재"],
    hintInitials: ["ㅅ", "ㄱ", "ㅅ", "ㅈ"],
    tiles: ["실", "감", "서", "재", "책", "길", "관", "체", "험", "도"],
    hint: "3층 실감서재 안내판이나 입구에 쓰인 글자를 읽어보세요.",
    recoveredWord: "실감서재",
    correctTitle: "마지막 낱말까지 찾았어요!",
    correctMessage: "‘실감서재’가 탐험책으로 돌아왔어요.",
    image: "question_image/quiz4.png",
    guideName: "seoi",
    guideText: "마지막은 3층 실감서재예요!",
  },
];

const FEEDBACK_MESSAGES = {
  wrong: {
    title: "다시 살펴볼까요?",
    message:
      "글자 순서가 조금 다른 것 같아요. 현장에 쓰인 낱말을 다시 살펴볼까요?",
    buttonText: "다시 골라 보기",
  },
};

const STORAGE = {
  index: "boogiCurrentMission",
  screen: "boogiCurrentScreen",
};

const screens = {
  start: document.getElementById("startScreen"),
  question: document.getElementById("questionScreen"),
  finish: document.getElementById("finishScreen"),
};

const els = {
  missionLabel: document.getElementById("missionLabel"),
  progressDots: document.getElementById("progressDots"),
  wordTray: document.getElementById("wordTray"),
  moveGuideBox: document.getElementById("moveGuideBox"),
  placeLabel: document.getElementById("placeLabel"),
  missionTitle: document.getElementById("missionTitle"),
  displayQuestion: document.getElementById("displayQuestion"),
  missionQuestion: document.getElementById("missionQuestion"),
  missionImageWrap: document.getElementById("missionImageWrap"),
  missionImage: document.getElementById("missionImage"),
  answerSlots: document.getElementById("answerSlots"),
  tileBoard: document.getElementById("tileBoard"),
  checkAnswerButton: document.getElementById("checkAnswerButton"),
  clearTileButton: document.getElementById("clearTileButton"),
  placeHint: document.getElementById("placeHint"),
  hintButton: document.getElementById("hintButton"),
  guideCharacter: document.getElementById("guideCharacter"),
  guideBubble: document.getElementById("guideBubble"),
  feedbackModal: document.getElementById("feedbackModal"),
  feedbackImage: document.getElementById("feedbackImage"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackMessage: document.getElementById("feedbackMessage"),
  feedbackButton: document.getElementById("feedbackButton"),
  confirmModal: document.getElementById("confirmModal"),
};

/** @type {number} */
let currentIndex = 0;
/** @type {number} 오답 횟수 (실패 횟수는 UI에 표시하지 않음) */
let wrongCount = 0;
/** @type {boolean} 초성이 한 번이라도 공개되었는지 */
let initialsRevealed = false;
/** @type {boolean} 텍스트 힌트 패널 표시 여부 */
let hintPanelOpen = false;
/** @type {"start"|"question"|"finish"} */
let currentScreen = "start";
/** @type {null | (() => void)} */
let feedbackAction = null;

/**
 * 섞인 타일 목록. 동일 글자도 별도 인스턴스(id)로 관리.
 * @type {{ id: number, letter: string }[]}
 */
let boardTiles = [];
/**
 * 슬롯에 채워진 타일 id (비어 있으면 null)
 * @type {(number|null)[]}
 */
let slotTileIds = [];

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });
  currentScreen = name;
  saveProgress();
  // iOS에서 레이아웃 반영 후 스크롤 초기화
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function saveProgress() {
  localStorage.setItem(STORAGE.index, String(currentIndex));
  localStorage.setItem(STORAGE.screen, currentScreen);
}

function loadProgress() {
  const savedScreen = localStorage.getItem(STORAGE.screen);
  const savedIndex = parseInt(localStorage.getItem(STORAGE.index) ?? "0", 10);

  if (savedScreen === "question" || savedScreen === "finish" || savedScreen === "start") {
    currentScreen = savedScreen;
  } else if (savedScreen === "route" || savedScreen === "transition") {
    // 예전 중간 화면 저장값은 문제 화면으로 이어가기
    currentScreen = "question";
  }

  if (!Number.isNaN(savedIndex) && savedIndex >= 0 && savedIndex < MISSIONS.length) {
    currentIndex = savedIndex;
  }
}

function resetGame() {
  localStorage.removeItem(STORAGE.index);
  localStorage.removeItem(STORAGE.screen);
  currentIndex = 0;
  wrongCount = 0;
  initialsRevealed = false;
  hintPanelOpen = false;
  boardTiles = [];
  slotTileIds = [];
  hideFeedback();
  hideConfirm();
  showScreen("start");
}

function renderWordTray(targetEl, foundCount) {
  targetEl.replaceChildren();

  MISSIONS.forEach((mission, i) => {
    const chip = document.createElement("span");
    chip.className = "word-chip";

    if (i < foundCount) {
      // 이미 찾은 낱말만 공개
      chip.classList.add("found");
      chip.textContent = `${mission.recoveredWord} ✓`;
    } else if (i === foundCount) {
      // 진행 중 — 정답 글자는 숨김
      chip.classList.add("current-word");
      chip.textContent = `낱말 ${i + 1} ○`;
    } else {
      chip.textContent = `낱말 ${i + 1} ○`;
    }

    targetEl.append(chip);
  });
}

function renderProgress() {
  const total = MISSIONS.length;
  els.missionLabel.textContent = `${currentIndex + 1} / ${total}`;
  els.progressDots.replaceChildren();

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.className = "progress-dot";
    if (i < currentIndex) dot.classList.add("done");
    if (i === currentIndex) dot.classList.add("current");
    els.progressDots.append(dot);
  }

  renderWordTray(els.wordTray, currentIndex);
}

/** Fisher–Yates 섞기 (데이터 순서 그대로 보여 주지 않음) */
function shuffleTiles(tiles) {
  const shuffled = [...tiles];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** 미션 tiles 배열을 id가 붙은 타일 객체로 만들고 섞기 */
function createBoardTiles(mission) {
  const withIds = mission.tiles.map((letter, id) => ({ id, letter }));
  return shuffleTiles(withIds);
}

function getUsedTileIds() {
  return new Set(slotTileIds.filter((id) => id !== null));
}

function getSelectedWord() {
  return slotTileIds
    .map((id) => {
      if (id === null) return "";
      const tile = boardTiles.find((t) => t.id === id);
      return tile ? tile.letter : "";
    })
    .join("");
}

function updateCheckButton() {
  const filledCount = slotTileIds.filter((id) => id !== null).length;
  const allFilled = slotTileIds.length > 0 && filledCount === slotTileIds.length;
  els.checkAnswerButton.disabled = !allFilled;
  if (els.clearTileButton) {
    els.clearTileButton.disabled = filledCount === 0;
  }
}

/** 마지막으로 채운 글자 한 칸만 지우기 */
function clearLastTile() {
  let lastFilled = -1;
  for (let i = slotTileIds.length - 1; i >= 0; i--) {
    if (slotTileIds[i] !== null) {
      lastFilled = i;
      break;
    }
  }
  if (lastFilled === -1) return;
  clearFromSlot(lastFilled);
}

function renderAnswerSlots(mission) {
  els.answerSlots.replaceChildren();
  els.answerSlots.classList.toggle("hint-open", initialsRevealed);

  mission.answerSyllables.forEach((_, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "answer-slot-wrap";

    const initial = document.createElement("span");
    initial.className = "initial-hint";
    initial.textContent = mission.hintInitials[index];
    initial.setAttribute("aria-hidden", initialsRevealed ? "false" : "true");

    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "answer-slot";
    slot.dataset.slotIndex = String(index);
    slot.setAttribute("aria-label", `${index + 1}번째 글자 칸`);

    const tileId = slotTileIds[index];
    if (tileId !== null && tileId !== undefined) {
      const tile = boardTiles.find((t) => t.id === tileId);
      slot.textContent = tile ? tile.letter : "";
      slot.classList.add("filled");
    }

    // 채워진 칸을 누르면 그 칸부터 뒤까지 비우고 타일 반환
    slot.addEventListener("click", () => clearFromSlot(index));

    wrapper.append(initial, slot);
    els.answerSlots.append(wrapper);
  });
}

function renderTileBoard() {
  if (!els.tileBoard) return;

  els.tileBoard.replaceChildren();
  const used = getUsedTileIds();

  boardTiles.forEach((tile) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile-button";
    btn.textContent = tile.letter;
    btn.dataset.tileId = String(tile.id);

    if (used.has(tile.id)) {
      btn.classList.add("used");
      btn.disabled = true;
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => selectTile(tile.id));
    }

    els.tileBoard.append(btn);
  });
}

function refreshAnswerUi() {
  const mission = MISSIONS[currentIndex];
  renderAnswerSlots(mission);
  renderTileBoard();
  updateCheckButton();
}

/** 다음 빈 칸에 타일 채우기 */
function selectTile(tileId) {
  const emptyIndex = slotTileIds.findIndex((id) => id === null);
  if (emptyIndex === -1) return;
  if (getUsedTileIds().has(tileId)) return;

  slotTileIds[emptyIndex] = tileId;
  refreshAnswerUi();
}

/**
 * 해당 슬롯부터 뒤쪽 슬롯을 모두 비우고 타일을 풀로 되돌림
 * (앞에서부터 다시 고를 수 있도록)
 */
function clearFromSlot(startIndex) {
  if (slotTileIds[startIndex] === null) return;

  for (let i = startIndex; i < slotTileIds.length; i++) {
    slotTileIds[i] = null;
  }
  refreshAnswerUi();
}

/** 선택 전부 초기화 (오답 후) */
function clearAllSlots() {
  slotTileIds = slotTileIds.map(() => null);
}

/** 텍스트 힌트 패널(장소 힌트·미션2 추가 힌트) 갱신 */
function updatePlaceHint() {
  const mission = MISSIONS[currentIndex];
  const lines = [];

  // 미션 2: 힌트 열면 초성과 함께 extraHint 즉시 표시
  if (initialsRevealed && mission.extraHint) {
    lines.push(mission.extraHint);
  }

  // 2회 이상 오답 시 장소 힌트 추가
  if (wrongCount >= 2 && mission.hint) {
    lines.push(mission.hint);
  }

  const hasText = lines.length > 0;
  const showPanel = hasText && hintPanelOpen;

  if (showPanel) {
    els.placeHint.hidden = false;
    els.placeHint.replaceChildren();
    lines.forEach((text) => {
      const p = document.createElement("p");
      p.className = "place-hint-line";
      p.textContent = text;
      els.placeHint.append(p);
    });
  } else {
    els.placeHint.hidden = true;
    els.placeHint.replaceChildren();
  }
}

function updateHintButton() {
  const mission = MISSIONS[currentIndex];
  const hasTextHint =
    (initialsRevealed && Boolean(mission.extraHint)) ||
    (wrongCount >= 2 && Boolean(mission.hint));

  if (!initialsRevealed) {
    els.hintButton.textContent = "초성 힌트 보기";
    els.hintButton.disabled = false;
    els.hintButton.setAttribute(
      "aria-expanded",
      String(hintPanelOpen && wrongCount >= 2)
    );
    return;
  }

  if (hasTextHint) {
    els.hintButton.textContent = hintPanelOpen ? "힌트 닫기" : "초성 힌트 보기";
    els.hintButton.disabled = false;
    els.hintButton.setAttribute("aria-expanded", String(hintPanelOpen));
  } else {
    els.hintButton.textContent = "초성 힌트 보기";
    els.hintButton.disabled = false;
    els.hintButton.setAttribute("aria-expanded", "true");
  }
}

function revealInitials() {
  initialsRevealed = true;
  els.answerSlots.classList.add("hint-open");
  els.answerSlots
    .querySelectorAll(".initial-hint")
    .forEach((el) => el.setAttribute("aria-hidden", "false"));
}

function onHintButtonClick() {
  const mission = MISSIONS[currentIndex];

  if (!initialsRevealed) {
    // 1단계: 초성 공개 (+ 미션2는 extraHint도 바로)
    revealInitials();
    hintPanelOpen = Boolean(mission.extraHint) || wrongCount >= 2;
    updatePlaceHint();
    updateHintButton();
    return;
  }

  // 초성 공개 후: 텍스트 힌트 패널만 토글 (초성은 유지)
  const hasTextHint =
    Boolean(mission.extraHint) || (wrongCount >= 2 && Boolean(mission.hint));

  if (hasTextHint) {
    hintPanelOpen = !hintPanelOpen;
    updatePlaceHint();
    updateHintButton();
  }
}

function renderMission() {
  const mission = MISSIONS[currentIndex];
  wrongCount = 0;
  initialsRevealed = false;
  hintPanelOpen = false;

  if (els.moveGuideBox) {
    els.moveGuideBox.textContent = mission.moveGuide;
  }
  if (els.placeLabel) {
    els.placeLabel.textContent = `[${mission.placeLabel}]`;
  }
  els.missionTitle.textContent = mission.storyTitle;
  els.displayQuestion.textContent = mission.displayQuestion;
  els.missionQuestion.textContent = mission.question;

  if (els.guideBubble) {
    els.guideBubble.textContent = mission.guideText;
    els.guideBubble.classList.toggle("duri", mission.guideName === "duri");
    els.guideBubble.classList.toggle("seoi", mission.guideName === "seoi");
  }
  if (els.guideCharacter) {
    if (mission.guideName === "duri") {
      els.guideCharacter.src = CHARACTER_IMAGES.startDuri;
      els.guideCharacter.alt = "두리";
    } else {
      els.guideCharacter.src = CHARACTER_IMAGES.guideSeoi;
      els.guideCharacter.alt = "서이";
    }
  }

  if (mission.image) {
    els.missionImage.src = mission.image;
    els.missionImage.alt = `${mission.placeLabel} 단서 사진`;
    els.missionImageWrap.hidden = false;
  } else {
    els.missionImage.removeAttribute("src");
    els.missionImageWrap.hidden = true;
  }

  // 타일 섞기 + 빈 슬롯 준비
  boardTiles = createBoardTiles(mission);
  slotTileIds = mission.answerSyllables.map(() => null);

  renderProgress();
  refreshAnswerUi();
  updatePlaceHint();
  updateHintButton();
}

function setTilesDisabled(disabled) {
  els.tileBoard.querySelectorAll(".tile-button").forEach((btn) => {
    if (disabled) {
      btn.disabled = true;
    }
  });
  els.checkAnswerButton.disabled = true;
  if (els.clearTileButton) els.clearTileButton.disabled = true;
  els.answerSlots.querySelectorAll(".answer-slot").forEach((btn) => {
    btn.disabled = disabled;
  });
}

function checkAnswer() {
  const mission = MISSIONS[currentIndex];
  const selected = getSelectedWord();

  if (selected.length !== mission.answerSyllables.length) return;

  if (selected === mission.answer) {
    setTilesDisabled(true);
    showCorrectFeedback(mission);
    return;
  }

  // 오답: 횟수는 세지만 화면에 표시하지 않음
  wrongCount += 1;
  showWrongFeedback();
}

function showCorrectFeedback(mission) {
  const isLast = currentIndex >= MISSIONS.length - 1;

  els.feedbackImage.src = CHARACTER_IMAGES.correctDuri;
  els.feedbackImage.alt = "정답을 축하하는 두리";
  els.feedbackTitle.textContent = mission.correctTitle;
  els.feedbackMessage.textContent = mission.correctMessage;
  els.feedbackButton.textContent = isLast ? "탐험책 확인하기" : "다음 낱말 찾기";

  feedbackAction = () => {
    hideFeedback();

    if (isLast) {
      showScreen("finish");
      return;
    }

    currentIndex += 1;
    saveProgress();
    renderMission();
  };

  showFeedback();
}

function showWrongFeedback() {
  const wrong = FEEDBACK_MESSAGES.wrong;

  els.feedbackImage.src = CHARACTER_IMAGES.retrySeoi;
  els.feedbackImage.alt = "다시 살펴보자는 서이";
  els.feedbackTitle.textContent = wrong.title;
  els.feedbackMessage.textContent = wrong.message;
  els.feedbackButton.textContent = wrong.buttonText;

  feedbackAction = () => {
    hideFeedback();
    handleWrongRetry();
  };

  showFeedback();
}

/** 오답 확인 후: 선택 초기화 · 타일 재배치 · 초성 유지 · 2회 이상이면 장소 힌트 */
function handleWrongRetry() {
  const mission = MISSIONS[currentIndex];

  clearAllSlots();
  boardTiles = createBoardTiles(mission);
  refreshAnswerUi();

  // 초성이 열려 있었으면 유지
  if (initialsRevealed) {
    els.answerSlots.classList.add("hint-open");
  }

  // 2회 이상 오답 → 장소 힌트 패널 열기
  if (wrongCount >= 2) {
    hintPanelOpen = true;
  }

  updatePlaceHint();
  updateHintButton();
}

function showSurveyPending() {
  els.feedbackImage.src = CHARACTER_IMAGES.retrySeoi;
  els.feedbackImage.alt = "";
  els.feedbackTitle.textContent = "잠시만요!";
  els.feedbackMessage.textContent = "설문조사 주소를 준비 중입니다.";
  els.feedbackButton.textContent = "확인";

  feedbackAction = () => {
    hideFeedback();
  };

  showFeedback();
}

function openSurvey() {
  const url = GAME_CONFIG.surveyUrl;
  if (!url || !url.trim()) {
    showSurveyPending();
    return;
  }
  window.location.href = url;
}

function showFeedback() {
  els.feedbackModal.hidden = false;
  els.feedbackButton.focus();
}

function hideFeedback() {
  els.feedbackModal.hidden = true;
  feedbackAction = null;
}

function showConfirm() {
  els.confirmModal.hidden = false;
  document.getElementById("confirmOk").focus();
}

function hideConfirm() {
  els.confirmModal.hidden = true;
}

/* ----- 배경음악 -----
 * OFF 상태는 화면 전환·새로고침 후에도 유지됩니다.
 * ON일 때만 재생하며, 중복 play()를 피합니다.
 */
function initMusicToggle() {
  const audio = document.getElementById("bgm");
  const toggle = document.getElementById("musicToggle");
  if (!audio || !toggle) return;

  const textEl = toggle.querySelector(".music-toggle-text");
  const iconEl = toggle.querySelector(".music-toggle-icon");
  const hintEl = document.querySelector(".start-music-hint");

  function isMusicEnabled() {
    return localStorage.getItem(GAME_CONFIG.musicStorageKey) === "1";
  }

  function updateMusicUi(isOn) {
    toggle.setAttribute("aria-pressed", String(isOn));
    toggle.setAttribute("aria-label", isOn ? "배경음악 끄기" : "배경음악 켜기");
    if (textEl) textEl.textContent = isOn ? "음악 끄기" : "음악 켜기";
    if (iconEl) iconEl.textContent = isOn ? "♫" : "♪";
    if (hintEl) hintEl.hidden = isOn;
  }

  async function setMusicOn(isOn) {
    if (isOn) {
      try {
        audio.muted = false;
        audio.loop = true;
        audio.volume = 1;
        if (audio.paused) {
          await audio.play();
        }
        localStorage.setItem(GAME_CONFIG.musicStorageKey, "1");
        updateMusicUi(true);
        return true;
      } catch (err) {
        console.warn("BGM play failed:", err);
        updateMusicUi(false);
        return false;
      }
    }

    audio.pause();
    localStorage.setItem(GAME_CONFIG.musicStorageKey, "0");
    updateMusicUi(false);
    return true;
  }

  /**
   * 사용자 제스처에서 호출.
   * 사용자가 OFF로 저장한 경우 강제 재생하지 않음.
   */
  function startMusicFromUserGesture() {
    if (!isMusicEnabled() && localStorage.getItem(GAME_CONFIG.musicStorageKey) === "0") {
      updateMusicUi(false);
      return;
    }

    // 첫 방문(값 없음)이거나 ON이면 재생
    if (!audio.paused && !audio.muted) {
      localStorage.setItem(GAME_CONFIG.musicStorageKey, "1");
      updateMusicUi(true);
      return;
    }

    audio.muted = false;
    audio.loop = true;
    audio.volume = 1;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          localStorage.setItem(GAME_CONFIG.musicStorageKey, "1");
          updateMusicUi(true);
        })
        .catch((err) => {
          console.warn("BGM play failed:", err);
          updateMusicUi(false);
        });
    } else {
      localStorage.setItem(GAME_CONFIG.musicStorageKey, "1");
      updateMusicUi(true);
    }
  }

  window.__startBgmFromGesture = startMusicFromUserGesture;
  window.__setBgmOn = setMusicOn;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentlyOn =
      !audio.paused && toggle.getAttribute("aria-pressed") === "true";
    setMusicOn(!currentlyOn);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (!audio.paused) audio.pause();
    } else if (isMusicEnabled()) {
      audio.play().catch(() => {});
    }
  });

  // 저장된 OFF는 OFF 유지. ON이면 UI만 ON으로 두고 제스처 후 재생.
  if (isMusicEnabled()) {
    updateMusicUi(true);
  } else {
    updateMusicUi(false);
  }
}

function resumeFromStorage() {
  loadProgress();

  if (currentScreen === "question") {
    showScreen("question");
    renderMission();
  } else if (currentScreen === "finish") {
    showScreen("finish");
  } else {
    showScreen("start");
  }
}

function bindEvents() {
  if (!els.tileBoard || !els.checkAnswerButton || !els.answerSlots) {
    console.error("문제 화면 필수 요소를 찾지 못했습니다. index.html의 tileBoard / checkAnswerButton / answerSlots를 확인하세요.");
  }

  document.getElementById("startButton").addEventListener("click", () => {
    if (typeof window.__startBgmFromGesture === "function") {
      window.__startBgmFromGesture();
    }
    currentIndex = 0;
    showScreen("question");
    renderMission();
  });

  els.hintButton.addEventListener("click", onHintButtonClick);
  els.checkAnswerButton.addEventListener("click", checkAnswer);
  if (els.clearTileButton) {
    els.clearTileButton.addEventListener("click", clearLastTile);
  }
  document.getElementById("surveyButton").addEventListener("click", openSurvey);

  document.getElementById("startResetButton").addEventListener("click", showConfirm);
  document.getElementById("questionResetButton").addEventListener("click", showConfirm);
  document.getElementById("finishResetButton").addEventListener("click", showConfirm);

  document.getElementById("confirmCancel").addEventListener("click", hideConfirm);
  document.getElementById("confirmOk").addEventListener("click", resetGame);

  els.feedbackButton.addEventListener("click", () => {
    if (typeof feedbackAction === "function") {
      feedbackAction();
    } else {
      hideFeedback();
    }
  });
}

bindEvents();
initMusicToggle();
resumeFromStorage();

// 출발 버튼에 음악을 한 번 더 직접 연결 (캐시된 옛 핸들러 대비)
(function reinforceStartBgm() {
  const startButton = document.getElementById("startButton");
  const audio = document.getElementById("bgm");
  if (!startButton || !audio) return;
  startButton.addEventListener(
    "click",
    () => {
      if (typeof window.__startBgmFromGesture === "function") {
        window.__startBgmFromGesture();
      }
    },
    true
  );
})();
