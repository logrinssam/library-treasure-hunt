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
    buttonText: "낱말 찾으러 출발!",
  },

  routeGuide: {
    title: "사라진 낱말을 찾는 길",
    buttonText: "첫 번째 낱말 찾기",
  },

  finish: {
    title: "부기의 탐험책 완성!",
    message:
      "네 개의 낱말이 모두 돌아와 부기의 탐험책이 다시 반짝여요!",
    buttonText: "설문조사하고 경품 교환하기",
  },
};

const MISSIONS = [
  {
    id: "mission-1",
    order: 1,
    floor: "1층",
    location: "어린이실 입구",
    storyTitle: "드나드는 아이들의 낱말",
    locationGuide: "1층에서 사진 속 어린이실 간판을 찾아보세요.",
    question: "입구의 알록달록한 글자를 찾아 순서대로 눌러 주세요.",
    displayQuestion: "【　】",
    answer: "들락날락",
    answerSyllables: ["들", "락", "날", "락"],
    hintInitials: ["ㄷ", "ㄹ", "ㄴ", "ㄹ"],
    tiles: ["들", "락", "날", "락", "꿈", "책", "놀", "길", "문", "별"],
    hint: "어린이실 입구 유리창의 초록색과 주황색 글자를 왼쪽부터 읽어보세요.",
    recoveredWord: "들락날락",
    correctTitle: "첫 번째 낱말을 찾았어요!",
    correctMessage: "‘들락날락’이 탐험책으로 돌아왔어요.",
    image: "question_image/mission-1.png",
  },
  {
    id: "mission-2",
    order: 2,
    floor: "1층",
    location: "어린이실 안 부기존",
    storyTitle: "부기의 소중한 마음",
    locationGuide: "어린이실 안에서 부기존을 찾아보세요.",
    question: "부기 그림 위에 쓰인 문장을 보고 ‘당신처럼’ 뒤의 낱말을 완성해 주세요.",
    displayQuestion: "당신처럼 【　】",
    answer: "애지중지",
    answerSyllables: ["애", "지", "중", "지"],
    hintInitials: ["ㅇ", "ㅈ", "ㅈ", "ㅈ"],
    tiles: ["애", "지", "중", "지", "사", "랑", "꿈", "별", "책", "꼭"],
    hint: "부기 그림 위쪽의 분홍색 네 글자를 살펴보세요.",
    extraHint: "첫 글자는 ‘애’예요.",
    recoveredWord: "애지중지",
    correctTitle: "부기의 소중한 낱말을 찾았어요!",
    correctMessage: "‘애지중지’가 탐험책으로 돌아왔어요.",
    image: "question_image/mission-2.png",
  },
  {
    id: "mission-3",
    order: 3,
    floor: "1층",
    location: "본관 1층 AI 배움터",
    storyTitle: "미래를 여는 낱말",
    locationGuide: "본관 1층에서 사진 속 AI 체험 공간을 찾아보세요.",
    question: "안내판에서 ‘AI’ 다음에 쓰인 세 글자를 순서대로 눌러 주세요.",
    displayQuestion: "AI 【　】 배움터",
    answer: "디지털",
    answerSyllables: ["디", "지", "털"],
    hintInitials: ["ㄷ", "ㅈ", "ㅌ"],
    tiles: ["디", "지", "털", "로", "봇", "체", "험", "책", "꿈", "별"],
    hint: "안내판 가장 위쪽에서 ‘AI’ 바로 다음에 쓰인 말을 읽어보세요.",
    recoveredWord: "디지털",
    correctTitle: "1층의 낱말을 모두 찾았어요!",
    correctMessage: "‘디지털’이 탐험책으로 돌아왔어요.",
    transitionAfter: "move-to-third-floor",
    image: "question_image/mission-3.png",
  },
  {
    id: "mission-4",
    order: 4,
    floor: "3층",
    location: "실감서재 안",
    storyTitle: "옛이야기가 담긴 마지막 낱말",
    locationGuide: "3층 실감서재 안에서 사진 속 큰 화면을 찾아보세요.",
    question: "큰 화면 가운데 쓰인 그림의 이름을 순서대로 완성해 주세요.",
    displayQuestion: "화면 속 그림의 이름",
    answer: "조선풍속도",
    answerSyllables: ["조", "선", "풍", "속", "도"],
    hintInitials: ["ㅈ", "ㅅ", "ㅍ", "ㅅ", "ㄷ"],
    tiles: ["조", "선", "풍", "속", "도", "옛", "날", "생", "활", "지"],
    hint: "화면 중앙에 가장 크게 쓰인 흰색 다섯 글자를 읽어보세요.",
    recoveredWord: "조선풍속도",
    correctTitle: "마지막 낱말까지 찾았어요!",
    correctMessage: "‘조선풍속도’가 탐험책으로 돌아왔어요.",
    image: "question_image/mission-4.png",
  },
];

const TRANSITIONS = {
  "move-to-third-floor": {
    title: "마지막 낱말은 3층에 있어요!",
    message:
      "1층의 낱말 세 개를 모두 찾았어요. 이제 보호자와 함께 계단이나 엘리베이터를 이용해 3층으로 이동해 주세요.",
    safetyMessage: "천천히 이동하고, 계단에서는 특히 조심해요!",
    buttonText: "3층 마지막 미션 보기",
  },
};

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
  route: document.getElementById("routeScreen"),
  question: document.getElementById("questionScreen"),
  transition: document.getElementById("transitionScreen"),
  finish: document.getElementById("finishScreen"),
};

const els = {
  missionLabel: document.getElementById("missionLabel"),
  progressDots: document.getElementById("progressDots"),
  wordTray: document.getElementById("wordTray"),
  missionFloor: document.getElementById("missionFloor"),
  missionLocation: document.getElementById("missionLocation"),
  missionTitle: document.getElementById("missionTitle"),
  missionGuide: document.getElementById("missionGuide"),
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
  guideBubble: document.getElementById("guideBubble"),
  transitionTitle: document.getElementById("transitionTitle"),
  transitionMessage: document.getElementById("transitionMessage"),
  transitionSafety: document.getElementById("transitionSafety"),
  transitionButton: document.getElementById("transitionButton"),
  transitionWords: document.getElementById("transitionWords"),
  recoveredWords: document.getElementById("recoveredWords"),
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
/** @type {"start"|"route"|"question"|"transition"|"finish"} */
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

  if (
    savedScreen === "route" ||
    savedScreen === "question" ||
    savedScreen === "transition" ||
    savedScreen === "finish"
  ) {
    currentScreen = savedScreen;
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
  els.missionLabel.textContent = `미션 ${currentIndex + 1} / ${total}`;
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
    // 장소 힌트만 먼저 열린 경우에도 「힌트 보기」로 초성 단계 유도
    els.hintButton.textContent = "힌트 보기";
    els.hintButton.disabled = false;
    els.hintButton.setAttribute(
      "aria-expanded",
      String(hintPanelOpen && wrongCount >= 2)
    );
    return;
  }

  // 초성은 이미 공개됨 — 텍스트 힌트가 있으면 패널 토글
  if (hasTextHint) {
    els.hintButton.textContent = hintPanelOpen ? "힌트 닫기" : "힌트 보기";
    els.hintButton.disabled = false;
    els.hintButton.setAttribute("aria-expanded", String(hintPanelOpen));
  } else {
    // 초성만 공개된 상태 (텍스트 힌트 없음)
    els.hintButton.textContent = "힌트 보기";
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

  els.missionFloor.textContent = mission.floor;
  els.missionLocation.textContent = mission.location;
  els.missionTitle.textContent = mission.storyTitle;
  els.missionGuide.textContent = mission.locationGuide;
  els.displayQuestion.textContent = mission.displayQuestion;
  els.missionQuestion.textContent = mission.question;
  els.guideBubble.innerHTML =
    "현장에서 낱말을 찾아<br />글자 조각을 순서대로 눌러 보세요!";

  if (mission.image) {
    els.missionImage.src = mission.image;
    els.missionImage.alt = `${mission.location} 단서 사진`;
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

function renderTransition(key) {
  const data = TRANSITIONS[key];

  if (key === "move-to-third-floor") {
    els.transitionTitle.innerHTML = "마지막 낱말은<br />3층에 있어요!";
    els.transitionMessage.innerHTML =
      "1층의 낱말 세 개를 모두 찾았어요.<br />이제 보호자와 함께 계단이나 엘리베이터를 이용해<br /><strong>3층으로 이동해 주세요.</strong>";
  } else {
    els.transitionTitle.textContent = data.title;
    els.transitionMessage.textContent = data.message;
  }

  els.transitionSafety.textContent = data.safetyMessage;
  els.transitionButton.textContent = data.buttonText;
  renderWordTray(els.transitionWords, 3);
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
  const hasTransition = Boolean(mission.transitionAfter);

  els.feedbackImage.src = CHARACTER_IMAGES.correctDuri;
  els.feedbackImage.alt = "정답을 축하하는 두리";
  els.feedbackTitle.textContent = mission.correctTitle;
  els.feedbackMessage.textContent = mission.correctMessage;

  if (isLast) {
    els.feedbackButton.textContent = "탐험책 확인하기";
  } else if (hasTransition) {
    els.feedbackButton.textContent = "다음으로";
  } else {
    els.feedbackButton.textContent = "다음 낱말 찾기";
  }

  feedbackAction = () => {
    hideFeedback();

    if (isLast) {
      showScreen("finish");
      return;
    }

    if (hasTransition) {
      renderTransition(mission.transitionAfter);
      showScreen("transition");
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
 * 모바일/QR은 자동재생이 막히므로
 * 「낱말 찾으러 출발!」을 누를 때 재생합니다.
 */
function initMusicToggle() {
  const audio = document.getElementById("bgm");
  const toggle = document.getElementById("musicToggle");
  if (!audio || !toggle) return;

  const textEl = toggle.querySelector(".music-toggle-text");
  const iconEl = toggle.querySelector(".music-toggle-icon");
  const hintEl = document.querySelector(".start-music-hint");

  function wantsMusicOn() {
    return localStorage.getItem(GAME_CONFIG.musicStorageKey) !== "0";
  }

  function updateMusicUi(isOn) {
    toggle.setAttribute("aria-pressed", String(isOn));
    toggle.setAttribute("aria-label", isOn ? "배경음악 끄기" : "배경음악 켜기");
    if (textEl) textEl.textContent = isOn ? "음악 끄기" : "음악 켜기";
    if (iconEl) iconEl.textContent = isOn ? "♫" : "♪";
    if (hintEl) {
      hintEl.hidden = isOn || !wantsMusicOn();
    }
  }

  async function setMusicOn(isOn, { fromToggle = false } = {}) {
    if (isOn) {
      try {
        audio.loop = true;
        audio.volume = 1;
        // play()는 클릭 핸들러 스택에서 바로 호출되어야 iOS가 허용함
        await audio.play();
        localStorage.setItem(GAME_CONFIG.musicStorageKey, "1");
        updateMusicUi(true);
        return true;
      } catch (err) {
        updateMusicUi(false);
        if (fromToggle) {
          localStorage.setItem(GAME_CONFIG.musicStorageKey, "0");
        }
        return false;
      }
    }

    audio.pause();
    localStorage.setItem(GAME_CONFIG.musicStorageKey, "0");
    updateMusicUi(false);
    return true;
  }

  /** 출발 버튼 등 사용자 제스처에서 음악 시작 */
  function startMusicFromUserGesture() {
    if (!wantsMusicOn()) return;
    if (!audio.paused) return;
    // await 없이 바로 play 호출 (제스처 컨텍스트 유지)
    audio.loop = true;
    audio.volume = 1;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          localStorage.setItem(GAME_CONFIG.musicStorageKey, "1");
          updateMusicUi(true);
        })
        .catch(() => {
          updateMusicUi(false);
        });
    }
  }

  // 외부(bindEvents의 출발 버튼)에서 호출할 수 있게 노출
  window.__startBgmFromGesture = startMusicFromUserGesture;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentlyOn = !audio.paused && toggle.getAttribute("aria-pressed") === "true";
    setMusicOn(!currentlyOn, { fromToggle: true });
  });

  // 이어서 진행 중이면, 주요 진행 버튼을 누를 때도 시작
  ["routeButton", "transitionButton"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", startMusicFromUserGesture);
  });

  // 기본은 대기(꺼짐 UI). 출발 버튼을 눌러야 재생.
  updateMusicUi(false);
}

function resumeFromStorage() {
  loadProgress();

  if (currentScreen === "route") {
    showScreen("route");
  } else if (currentScreen === "question") {
    showScreen("question");
    renderMission();
  } else if (currentScreen === "transition") {
    // After mission 3, index is still 2 until user continues
    renderTransition("move-to-third-floor");
    showScreen("transition");
  } else if (currentScreen === "finish") {
    showScreen("finish");
  } else {
    showScreen("start");
  }
}

function bindEvents() {
  // 필수 DOM이 없으면 타일 렌더가 조용히 실패하므로 초기에 확인
  if (!els.tileBoard || !els.checkAnswerButton || !els.answerSlots) {
    console.error("문제 화면 필수 요소를 찾지 못했습니다. index.html의 tileBoard / checkAnswerButton / answerSlots를 확인하세요.");
  }

  document.getElementById("startButton").addEventListener("click", () => {
    // QR/모바일: 출발 제스처에서 배경음악 시작
    if (typeof window.__startBgmFromGesture === "function") {
      window.__startBgmFromGesture();
    }
    showScreen("route");
  });

  document.getElementById("routeButton").addEventListener("click", () => {
    currentIndex = 0;
    showScreen("question");
    renderMission();
  });

  document.getElementById("transitionButton").addEventListener("click", () => {
    currentIndex = 3;
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
