/**
 * 부기의 사라진 낱말을 찾아라!
 * — 부산도서관 탐험책 완성 대작전
 *
 * 정답 입력: 글자 조각을 순서대로 눌러 빈칸을 채운 뒤
 * 「낱말 확인하기」로 제출합니다.
 *
 * 설계 원칙 두 가지
 * 1. 이동 안내·발문·사진 alt 어디에도 정답 낱말을 쓰지 않는다.
 *    현장에 가서 직접 읽게 하는 것이 이 게임의 목적이다.
 * 2. localStorage·이미지·음악은 언제든 실패한다고 보고 감싼다.
 *    행사장에서는 사생활 모드, 약전파, 차단된 스토리지가 반드시 나온다.
 */

const CHARACTER_IMAGES = {
  guideDuri: "character_image/01_start/02_duri_hi.png",
  guideSeoi: "character_image/02_question/03_seoi_pointing.png",
  correctDuri: "character_image/03_feedback/04_duri_correct_singing.png",
  retrySeoi: "character_image/03_feedback/05_seoi_retry_question.png",
};

const GAME_CONFIG = {
  title: "부기의 사라진 낱말을 찾아라!",
  subtitle: "부산도서관 탐험책 완성 대작전",

  // TODO(행사 전 필수): 설문조사 주소를 채워야 경품 교환 동선이 이어집니다.
  surveyUrl: "",

  musicStorageKey: "boogiMusicOn",

  // 완료 화면을 열어 둔 채 방치된 기기는 다음 참가자를 위해 처음으로 되돌린다.
  finishResetAfterMs: 30 * 60 * 1000,
};

const MISSIONS = [
  {
    placeLabel: "꿈뜨락 어린이실",
    moveGuide: "1층 꿈뜨락 어린이실로 이동하세요!",
    question: "입구의 알록달록한 글자를 찾아 순서대로 눌러 주세요.",
    displayQuestion: "꿈뜨락 어린이실 [　　　　]",
    answer: "들락날락",
    answerSyllables: ["들", "락", "날", "락"],
    hintInitials: ["ㄷ", "ㄹ", "ㄴ", "ㄹ"],
    tiles: ["들", "락", "날", "락", "꿈", "책", "문", "놀", "길", "별"],
    hint: "어린이실 입구 유리창의 초록색과 주황색 글자를 왼쪽부터 읽어보세요.",
    recoveredWord: "들락날락",
    correctTitle: "첫 번째 낱말을 찾았어요!",
    correctMessage: "‘들락날락’이 탐험책으로 돌아왔어요.",
    image: "question_image/mission-1.png",
    imageAlt: "꿈뜨락 어린이실 입구 사진, 간판 아래 글자가 가려져 있어요",
    guideName: "duri",
  },
  {
    placeLabel: "부기존",
    moveGuide: "꿈뜨락 어린이실 안 부기존으로 이동하세요!",
    question: "부기 그림 위에 쓰인 문장을 보고 ‘당신처럼’ 뒤의 낱말을 완성해 주세요.",
    displayQuestion: "당신처럼 [　　　　]",
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
    imageAlt: "부기존 그림 사진, 글자 일부가 가려져 있어요",
    guideName: "seoi",
  },
  {
    placeLabel: "AI디지털배움터",
    // 이동 안내에 정답('디지털')을 쓰지 않는다 — 현장 안내판에서 직접 읽게 한다.
    moveGuide: "본관 1층 AI 배움터를 찾아가 보세요!",
    question: "안내판에서 ‘AI’ 다음에 쓰인 세 글자를 순서대로 눌러 주세요.",
    displayQuestion: "AI [　　　] 배움터",
    answer: "디지털",
    answerSyllables: ["디", "지", "털"],
    hintInitials: ["ㄷ", "ㅈ", "ㅌ"],
    tiles: ["디", "지", "털", "로", "봇", "체", "험", "책", "꿈", "별"],
    hint: "안내판 가장 위쪽에서 ‘AI’ 바로 다음에 쓰인 말을 읽어보세요.",
    recoveredWord: "디지털",
    correctTitle: "세 번째 낱말을 찾았어요!",
    correctMessage: "‘디지털’이 탐험책으로 돌아왔어요.",
    image: "question_image/mission-3.png",
    imageAlt: "AI 배움터 안내판 사진, 글자 일부가 가려져 있어요",
    guideName: "duri",
  },
  {
    placeLabel: "실감서재",
    // 정답이 곧 장소 이름이므로, 같은 간판의 다른 글자로 목적지를 가리킨다.
    moveGuide: "도서관 3층 고도서·고지도 체험관 간판을 찾아가 보세요!",
    question: "간판에서 사라진 네 글자를 찾아 순서대로 눌러 주세요.",
    displayQuestion: "고도서·고지도 [　　　　] 체험관",
    answer: "실감서재",
    answerSyllables: ["실", "감", "서", "재"],
    hintInitials: ["ㅅ", "ㄱ", "ㅅ", "ㅈ"],
    tiles: ["실", "감", "서", "재", "책", "길", "관", "체", "험", "도"],
    hint: "간판 가운데, ‘고도서·고지도’와 ‘체험관’ 사이에 쓰인 네 글자를 읽어보세요.",
    recoveredWord: "실감서재",
    correctTitle: "마지막 낱말까지 찾았어요!",
    correctMessage: "‘실감서재’가 탐험책으로 돌아왔어요.",
    image: "question_image/quiz4.png",
    imageAlt: "3층 고도서·고지도 체험관 입구 간판 사진, 가운데 글자가 가려져 있어요",
    guideName: "seoi",
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
  finishedAt: "boogiFinishedAt",
};

/* ================================================================
 * 안전 장치
 * ============================================================= */

/**
 * iOS 사생활 모드나 스토리지 차단 환경에서는 localStorage 접근 자체가 예외를 던진다.
 * 진행 저장은 포기하더라도 게임은 끝까지 돌아가야 한다.
 */
const safeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* 저장 실패는 무시 — 이번 세션 동안 메모리로만 진행한다. */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* 위와 같음 */
    }
  },
};

function showFatalError(message) {
  if (document.querySelector(".fatal-error")) return;

  const box = document.createElement("div");
  box.className = "fatal-error";
  box.setAttribute("role", "alert");

  const text = document.createElement("p");
  text.textContent = message;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "primary-button";
  button.textContent = "새로고침";
  button.addEventListener("click", () => window.location.reload());

  box.append(text, button);
  document.body.append(box);
}

window.addEventListener("error", (event) => {
  console.error("예상치 못한 오류:", event.error ?? event.message);
  showFatalError("문제가 생겼어요. 새로고침하면 이어서 할 수 있어요.");
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("처리되지 않은 오류:", event.reason);
});

/* ================================================================
 * DOM 참조
 * ============================================================= */

const REQUIRED_IDS = [
  "startScreen",
  "questionScreen",
  "finishScreen",
  "startButton",
  "missionLabel",
  "progressDots",
  "wordTray",
  "displayQuestion",
  "missionQuestion",
  "answerSlots",
  "tileBoard",
  "checkAnswerButton",
  "hintButton",
  "feedbackModal",
  "feedbackButton",
  "confirmModal",
];

const screens = {
  start: document.getElementById("startScreen"),
  question: document.getElementById("questionScreen"),
  finish: document.getElementById("finishScreen"),
};

const els = {
  missionLabel: document.getElementById("missionLabel"),
  progressDots: document.getElementById("progressDots"),
  wordTray: document.getElementById("wordTray"),
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
  liveRegion: document.getElementById("liveRegion"),
  finishBadge: document.getElementById("finishBadge"),
  finishHero: document.getElementById("finishHero"),
  recoveredWords: document.getElementById("recoveredWords"),
  feedbackModal: document.getElementById("feedbackModal"),
  feedbackImage: document.getElementById("feedbackImage"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackMessage: document.getElementById("feedbackMessage"),
  feedbackButton: document.getElementById("feedbackButton"),
  confirmModal: document.getElementById("confirmModal"),
  confirmOk: document.getElementById("confirmOk"),
  confirmCancel: document.getElementById("confirmCancel"),
};

/* ================================================================
 * 상태
 * ============================================================= */

/** @type {number} 현재 미션 번호 (0부터) */
let currentIndex = 0;
/** @type {number} 오답 횟수 — 힌트 단계 판단에만 쓰고 화면에는 표시하지 않는다 */
let wrongCount = 0;
/** @type {boolean} 초성이 한 번이라도 공개되었는지 */
let initialsRevealed = false;
/** @type {boolean} 텍스트 힌트 패널 표시 여부 */
let hintPanelOpen = false;
/** @type {boolean} 정답 처리 후 입력 잠금 */
let inputLocked = false;
/** @type {"start"|"question"|"finish"} */
let currentScreen = "start";
/** @type {null | (() => void)} */
let feedbackAction = null;
/** @type {null | HTMLElement} 모달을 열기 직전 포커스가 있던 요소 */
let focusBeforeModal = null;

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

/* ================================================================
 * 화면 전환 · 진행 저장
 * ============================================================= */

function announce(message) {
  if (els.liveRegion) els.liveRegion.textContent = message;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle("active", key === name);
  });
  currentScreen = name;

  if (name === "finish") {
    renderFinishScreen();
    safeStorage.set(STORAGE.finishedAt, String(Date.now()));
  }

  saveProgress();

  // iOS에서 레이아웃 반영 후 스크롤 초기화
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function saveProgress() {
  safeStorage.set(STORAGE.index, String(currentIndex));
  safeStorage.set(STORAGE.screen, currentScreen);
}

function loadProgress() {
  const savedScreen = safeStorage.get(STORAGE.screen);
  const savedIndex = parseInt(safeStorage.get(STORAGE.index) ?? "0", 10);

  if (savedScreen === "question" || savedScreen === "finish" || savedScreen === "start") {
    currentScreen = savedScreen;
  } else if (savedScreen === "route" || savedScreen === "transition") {
    // 예전 중간 화면 저장값은 문제 화면으로 이어가기
    currentScreen = "question";
  }

  if (!Number.isNaN(savedIndex) && savedIndex >= 0 && savedIndex < MISSIONS.length) {
    currentIndex = savedIndex;
  }

  // 완료 화면인 채로 오래 방치된 기기는 다음 참가자를 위해 처음으로 되돌린다.
  if (currentScreen === "finish") {
    const finishedAt = parseInt(safeStorage.get(STORAGE.finishedAt) ?? "0", 10);
    const elapsed = Date.now() - finishedAt;
    if (!finishedAt || elapsed > GAME_CONFIG.finishResetAfterMs) {
      currentScreen = "start";
      currentIndex = 0;
    }
  }
}

function resetGame() {
  safeStorage.remove(STORAGE.index);
  safeStorage.remove(STORAGE.screen);
  safeStorage.remove(STORAGE.finishedAt);
  currentIndex = 0;
  wrongCount = 0;
  initialsRevealed = false;
  hintPanelOpen = false;
  inputLocked = false;
  boardTiles = [];
  slotTileIds = [];
  hideFeedback();
  hideConfirm();
  showScreen("start");
}

/* ================================================================
 * 진행 표시
 * ============================================================= */

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

const RECOVERED_CHIP_TONES = ["tone-yellow", "tone-pink", "tone-sky", "tone-beige"];

/** 완료 화면은 MISSIONS에서 만든다 — 문제를 바꿔도 따로 손볼 곳이 없도록. */
function renderFinishScreen() {
  loadFinishHero();

  if (els.finishBadge) {
    els.finishBadge.textContent = `미션 ${MISSIONS.length}/${MISSIONS.length} 성공`;
  }
  if (!els.recoveredWords) return;

  els.recoveredWords.replaceChildren();
  MISSIONS.forEach((mission, i) => {
    const chip = document.createElement("span");
    chip.className = `recovered-chip ${RECOVERED_CHIP_TONES[i % RECOVERED_CHIP_TONES.length]}`;
    chip.textContent = `✓ ${mission.recoveredWord}`;
    els.recoveredWords.append(chip);
  });
}

/* ================================================================
 * 글자 조각 · 정답 칸
 * ============================================================= */

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

  els.checkAnswerButton.disabled = inputLocked || !allFilled;
  if (els.clearTileButton) {
    els.clearTileButton.disabled = inputLocked || filledCount === 0;
  }
}

/** 마지막으로 채운 글자 한 칸만 지우기 */
function clearLastTile() {
  for (let i = slotTileIds.length - 1; i >= 0; i--) {
    if (slotTileIds[i] !== null) {
      clearFromSlot(i);
      return;
    }
  }
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

    const tileId = slotTileIds[index];
    const tile = tileId === null || tileId === undefined
      ? null
      : boardTiles.find((t) => t.id === tileId);

    if (tile) {
      slot.textContent = tile.letter;
      slot.classList.add("filled");
      // 채워진 글자를 aria-label에도 넣어야 스크린리더가 읽는다.
      slot.setAttribute("aria-label", `${index + 1}번째 글자 ${tile.letter}, 누르면 지웁니다`);
      slot.disabled = inputLocked;
      // 채워진 칸을 누르면 그 칸부터 뒤까지 비우고 타일 반환
      slot.addEventListener("click", () => clearFromSlot(index));
    } else {
      // 빈 칸은 눌러도 하는 일이 없다 — 포커스가 머물지 않도록 잠근다.
      slot.setAttribute("aria-label", `${index + 1}번째 글자 칸, 비어 있음`);
      slot.disabled = true;
    }

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
      btn.setAttribute("aria-label", `${tile.letter}, 이미 사용함`);
    } else {
      btn.disabled = inputLocked;
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
  if (inputLocked) return;

  const emptyIndex = slotTileIds.findIndex((id) => id === null);
  if (emptyIndex === -1) return;
  if (getUsedTileIds().has(tileId)) return;

  slotTileIds[emptyIndex] = tileId;
  refreshAnswerUi();

  if (slotTileIds.every((id) => id !== null)) {
    announce("글자를 모두 골랐어요. 낱말 확인하기를 눌러 주세요.");
  }
}

/**
 * 해당 슬롯부터 뒤쪽 슬롯을 모두 비우고 타일을 풀로 되돌림
 * (앞에서부터 다시 고를 수 있도록)
 */
function clearFromSlot(startIndex) {
  if (inputLocked) return;
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

/* ================================================================
 * 힌트
 * ============================================================= */

/** 지금 보여 줄 수 있는 텍스트 힌트 줄들 */
function getHintLines() {
  const mission = MISSIONS[currentIndex];
  const lines = [];

  // 초성을 열면 미션별 추가 힌트도 함께
  if (initialsRevealed && mission.extraHint) lines.push(mission.extraHint);
  // 2회 이상 오답이면 장소 힌트까지
  if (wrongCount >= 2 && mission.hint) lines.push(mission.hint);

  return lines;
}

function updateHintUi() {
  const lines = getHintLines();
  const showPanel = lines.length > 0 && hintPanelOpen;

  els.placeHint.replaceChildren();
  els.placeHint.hidden = !showPanel;
  if (showPanel) {
    lines.forEach((text) => {
      const p = document.createElement("p");
      p.className = "place-hint-line";
      p.textContent = text;
      els.placeHint.append(p);
    });
  }

  if (!initialsRevealed) {
    els.hintButton.textContent = "초성 힌트 보기";
    els.hintButton.disabled = inputLocked;
    els.hintButton.setAttribute("aria-expanded", "false");
    return;
  }

  if (lines.length > 0) {
    els.hintButton.textContent = hintPanelOpen ? "힌트 닫기" : "힌트 더 보기";
    els.hintButton.disabled = inputLocked;
    els.hintButton.setAttribute("aria-expanded", String(hintPanelOpen));
    return;
  }

  // 초성까지 봤고 더 줄 힌트가 없는 상태 — 눌러도 아무 일이 없으니 잠근다.
  els.hintButton.textContent = "힌트를 모두 봤어요";
  els.hintButton.disabled = true;
  els.hintButton.setAttribute("aria-expanded", "false");
}

function revealInitials() {
  initialsRevealed = true;
  els.answerSlots.classList.add("hint-open");
  els.answerSlots
    .querySelectorAll(".initial-hint")
    .forEach((el) => el.setAttribute("aria-hidden", "false"));
}

function onHintButtonClick() {
  if (!initialsRevealed) {
    revealInitials();
    hintPanelOpen = true;
    announce("초성 힌트를 보여 드릴게요.");
  } else {
    hintPanelOpen = !hintPanelOpen;
  }
  updateHintUi();
}

/* ================================================================
 * 미션 렌더링
 * ============================================================= */

/** 완료 화면 사진은 실제로 볼 때만 받는다 (첫 화면에서 같이 받지 않도록). */
function loadFinishHero() {
  const hero = els.finishHero;
  if (!hero || hero.getAttribute("src")) return;
  const src = hero.dataset.src;
  if (src) hero.src = src;
}

/** 다음 화면에서 쓸 사진을 미리 받아 둔다 — 팝업을 닫는 순간 빈 자리가 보이지 않도록. */
function preloadNextImage() {
  const next = MISSIONS[currentIndex + 1];
  if (next?.image) {
    const img = new Image();
    img.src = next.image;
    return;
  }
  // 마지막 문제라면 다음은 완료 화면이다.
  loadFinishHero();
}

function renderMission() {
  const mission = MISSIONS[currentIndex];
  wrongCount = 0;
  initialsRevealed = false;
  hintPanelOpen = false;
  inputLocked = false;

  els.displayQuestion.textContent = mission.displayQuestion;
  els.missionQuestion.textContent = mission.question;

  if (els.guideBubble) {
    els.guideBubble.textContent = mission.moveGuide;
    els.guideBubble.classList.toggle("duri", mission.guideName === "duri");
    els.guideBubble.classList.toggle("seoi", mission.guideName === "seoi");
  }
  if (els.guideCharacter) {
    const isDuri = mission.guideName === "duri";
    els.guideCharacter.src = isDuri ? CHARACTER_IMAGES.guideDuri : CHARACTER_IMAGES.guideSeoi;
    els.guideCharacter.alt = isDuri ? "두리" : "서이";
  }

  if (els.missionImage && els.missionImageWrap) {
    if (mission.image) {
      // 사진이 없어도 문제는 풀 수 있어야 한다 — 깨진 아이콘 대신 영역을 접는다.
      els.missionImage.onerror = () => {
        els.missionImageWrap.hidden = true;
      };
      els.missionImage.alt = mission.imageAlt ?? "이번 장소의 단서 사진";
      els.missionImage.src = mission.image;
      els.missionImageWrap.hidden = false;
    } else {
      els.missionImage.onerror = null;
      els.missionImage.removeAttribute("src");
      els.missionImageWrap.hidden = true;
    }
  }

  // 타일 섞기 + 빈 슬롯 준비
  boardTiles = createBoardTiles(mission);
  slotTileIds = mission.answerSyllables.map(() => null);

  renderProgress();
  refreshAnswerUi();
  updateHintUi();
  preloadNextImage();
}

/* ================================================================
 * 정답 확인
 * ============================================================= */

function lockInput() {
  inputLocked = true;
  refreshAnswerUi();
  updateHintUi();
}

function checkAnswer() {
  if (inputLocked) return;

  const mission = MISSIONS[currentIndex];
  const selected = getSelectedWord();

  if (selected.length !== mission.answerSyllables.length) return;

  if (selected === mission.answer) {
    lockInput();
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

/**
 * 오답 확인 후: 고른 글자만 비운다.
 * 타일 위치는 그대로 둔다 — 매번 다시 섞으면 저학년이 방금 찾은 글자를
 * 처음부터 다시 찾아야 해서 난이도가 아니라 피로도만 올라간다.
 */
function handleWrongRetry() {
  clearAllSlots();
  refreshAnswerUi();

  // 2회 이상 오답 → 장소 힌트 패널 열기
  if (wrongCount >= 2) hintPanelOpen = true;

  updateHintUi();
}

/* ================================================================
 * 설문조사
 * ============================================================= */

function showSurveyPending() {
  els.feedbackImage.src = CHARACTER_IMAGES.retrySeoi;
  els.feedbackImage.alt = "";
  els.feedbackTitle.textContent = "잠시만요!";
  els.feedbackMessage.textContent = "설문조사 주소를 준비 중입니다.";
  els.feedbackButton.textContent = "확인";

  feedbackAction = hideFeedback;
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

/* ================================================================
 * 모달 (정답·오답 팝업 / 초기화 확인)
 * ============================================================= */

function getFocusable(container) {
  return [
    ...container.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"),
  ].filter((el) => !el.disabled && el.getClientRects().length > 0);
}

function openModal(backdrop, focusTarget) {
  focusBeforeModal = document.activeElement;
  backdrop.hidden = false;
  document.body.classList.add("modal-open");
  (focusTarget ?? getFocusable(backdrop)[0])?.focus();
}

function closeModal(backdrop) {
  backdrop.hidden = true;

  if (!document.querySelector(".modal-backdrop:not([hidden])")) {
    document.body.classList.remove("modal-open");
  }
  if (focusBeforeModal && document.contains(focusBeforeModal)) {
    focusBeforeModal.focus();
  }
  focusBeforeModal = null;
}

function showFeedback() {
  openModal(els.feedbackModal, els.feedbackButton);
}

function hideFeedback() {
  closeModal(els.feedbackModal);
  feedbackAction = null;
}

function runFeedbackAction() {
  if (typeof feedbackAction === "function") {
    feedbackAction();
  } else {
    hideFeedback();
  }
}

function showConfirm() {
  openModal(els.confirmModal, els.confirmCancel);
}

function hideConfirm() {
  closeModal(els.confirmModal);
}

/** 열린 모달 안에서 Esc·Tab 처리 (포커스가 뒤 화면으로 새지 않도록) */
function onModalKeydown(event) {
  const backdrop = document.querySelector(".modal-backdrop:not([hidden])");
  if (!backdrop) return;

  if (event.key === "Escape") {
    event.preventDefault();
    if (backdrop === els.confirmModal) hideConfirm();
    else runFeedbackAction();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = getFocusable(backdrop);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ================================================================
 * 배경음악
 * ============================================================= */

/**
 * 저장값을 유일한 기준으로 삼는다.
 * audio.paused는 자동재생 차단·백그라운드 전환으로 수시로 바뀌기 때문에
 * ON/OFF 판단에 쓰면 "끄기를 눌렀는데 켜지는" 상황이 생긴다.
 */
function initMusic() {
  const audio = document.getElementById("bgm");
  const toggle = document.getElementById("musicToggle");
  if (!audio || !toggle) return null;

  const textEl = toggle.querySelector(".music-toggle-text");
  const iconEl = toggle.querySelector(".music-toggle-icon");
  const hintEl = document.querySelector(".start-music-hint");

  const isOn = () => safeStorage.get(GAME_CONFIG.musicStorageKey) === "1";
  const hasChoice = () => safeStorage.get(GAME_CONFIG.musicStorageKey) !== null;

  function updateUi() {
    const on = isOn();
    toggle.setAttribute("aria-pressed", String(on));
    toggle.setAttribute("aria-label", on ? "배경음악 끄기" : "배경음악 켜기");
    if (textEl) textEl.textContent = on ? "음악 끄기" : "음악 켜기";
    if (iconEl) iconEl.textContent = on ? "♫" : "♪";
    if (hintEl) hintEl.hidden = hasChoice();
  }

  async function play() {
    audio.loop = true;
    audio.muted = false;
    audio.volume = 1;
    try {
      if (audio.paused) await audio.play();
      return true;
    } catch (err) {
      // 자동재생 차단 등 — 조용히 OFF로 되돌린다.
      console.warn("배경음악 재생 실패:", err);
      return false;
    }
  }

  async function setOn(on) {
    safeStorage.set(GAME_CONFIG.musicStorageKey, on ? "1" : "0");
    if (on) {
      const played = await play();
      if (!played) safeStorage.set(GAME_CONFIG.musicStorageKey, "0");
    } else {
      audio.pause();
    }
    updateUi();
  }

  /** 시작 버튼 등 사용자 제스처에서 호출. 사용자가 직접 끈 경우엔 켜지 않는다. */
  function startFromGesture() {
    if (hasChoice() && !isOn()) {
      updateUi();
      return;
    }
    setOn(true);
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOn(!isOn());
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      audio.pause();
    } else if (isOn()) {
      play();
    }
  });

  updateUi();
  return { startFromGesture };
}

/* ================================================================
 * 시작
 * ============================================================= */

/**
 * 운영용 점프. 행사 당일 스테이션별 점검에 쓴다.
 *   ?m=3       → 3번 문제부터
 *   ?m=finish  → 완료 화면
 */
function applyStaffJump() {
  const raw = new URLSearchParams(window.location.search).get("m");
  if (!raw) return false;

  if (raw === "finish") {
    currentIndex = MISSIONS.length - 1;
    showScreen("finish");
    return true;
  }

  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1 || n > MISSIONS.length) return false;

  currentIndex = n - 1;
  showScreen("question");
  renderMission();
  return true;
}

function resumeFromStorage() {
  if (applyStaffJump()) return;

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

function bindEvents(music) {
  document.getElementById("startButton").addEventListener("click", () => {
    music?.startFromGesture();
    currentIndex = 0;
    showScreen("question");
    renderMission();
  });

  els.hintButton.addEventListener("click", onHintButtonClick);
  els.checkAnswerButton.addEventListener("click", checkAnswer);
  if (els.clearTileButton) {
    els.clearTileButton.addEventListener("click", clearLastTile);
  }

  const surveyButton = document.getElementById("surveyButton");
  if (surveyButton) surveyButton.addEventListener("click", openSurvey);

  ["startResetButton", "questionResetButton", "finishResetButton"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", showConfirm);
  });

  els.confirmCancel.addEventListener("click", hideConfirm);
  els.confirmOk.addEventListener("click", resetGame);

  els.feedbackButton.addEventListener("click", runFeedbackAction);

  document.addEventListener("keydown", onModalKeydown);
}

function init() {
  const missing = REQUIRED_IDS.filter((id) => !document.getElementById(id));
  if (missing.length > 0) {
    console.error("필수 요소를 찾지 못했습니다:", missing.join(", "));
    showFatalError("화면을 불러오지 못했어요. 새로고침해 주세요.");
    return;
  }

  const music = initMusic();
  bindEvents(music);
  resumeFromStorage();
}

init();
