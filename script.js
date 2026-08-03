/**
 * 부기의 사라진 낱말을 찾아라!
 * — 부산도서관 탐험책 완성 대작전
 */

const CHARACTER_IMAGES = {
  startBoogi: "character_image/01_start/01_boogi_reading.png",
  startDuri: "character_image/01_start/02_duri_hi.png",
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
    question: "간판 아래에 쓰인 말은 무엇일까요?",
    displayQuestion: "【　】",
    options: ["들락날락", "오락가락", "알락달락"],
    answer: "들락날락",
    hint: "‘꿈뜨락어린이실’ 글자 바로 아래를 읽어보세요.",
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
    question: "부기존 벽의 문장을 완성해 보세요.",
    displayQuestion: "당신처럼 【　】",
    options: ["애지중지", "알콩달콩", "반짝반짝"],
    answer: "애지중지",
    hint: "부기 그림 위쪽의 분홍색 문장을 살펴보세요.",
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
    question: "안내판에서 ‘AI’ 다음에 쓰인 낱말은 무엇일까요?",
    displayQuestion: "AI 【　】 배움터",
    options: ["디지털", "과학", "독서"],
    answer: "디지털",
    hint: "안내판 가장 위쪽의 큰 글자를 읽어보세요.",
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
    location: "부산학당 안",
    storyTitle: "옛이야기가 담긴 마지막 낱말",
    locationGuide: "3층 부산학당 안에서 사진 속 큰 화면을 찾아보세요.",
    question: "화면 가운데 쓰인 그림의 이름은 무엇일까요?",
    displayQuestion: "화면 속 그림의 이름",
    options: ["조선풍속도", "대동여지도", "세계지도"],
    answer: "조선풍속도",
    hint: "화면 중앙의 가장 큰 흰색 글자를 읽어보세요.",
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
      "앗, 조금 다른 것 같아요.\n현장에 쓰인 글자와 같은 답을 다시 골라보세요.",
    buttonText: "다시 선택하기",
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
  options: document.getElementById("options"),
  hintButton: document.getElementById("hintButton"),
  hintText: document.getElementById("hintText"),
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
/** @type {number} */
let wrongCount = 0;
/** @type {"start"|"route"|"question"|"transition"|"finish"} */
let currentScreen = "start";
/** @type {null | (() => void)} */
let feedbackAction = null;

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

function shuffleOptions(options) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderOptions(mission) {
  els.options.replaceChildren();

  shuffleOptions(mission.options).forEach((optionText) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = optionText;
    button.addEventListener("click", () => checkAnswer(optionText));
    els.options.append(button);
  });
}

function renderMission() {
  const mission = MISSIONS[currentIndex];
  wrongCount = 0;

  els.missionFloor.textContent = mission.floor;
  els.missionLocation.textContent = mission.location;
  els.missionTitle.textContent = mission.storyTitle;
  els.missionGuide.textContent = mission.locationGuide;
  els.displayQuestion.textContent = mission.displayQuestion;
  els.missionQuestion.textContent = mission.question;
  els.hintText.textContent = `힌트: ${mission.hint}`;
  els.hintText.hidden = true;
  els.hintButton.setAttribute("aria-expanded", "false");
  els.hintButton.textContent = "힌트 보기";
  els.guideBubble.innerHTML = "현장에서 단서를 찾아<br />알맞은 답을 골라 보세요!";

  if (mission.image) {
    els.missionImage.src = mission.image;
    els.missionImage.alt = `${mission.location} 단서 사진`;
    els.missionImageWrap.hidden = false;
  } else {
    els.missionImage.removeAttribute("src");
    els.missionImageWrap.hidden = true;
  }

  renderProgress();
  renderOptions(mission);
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

function setOptionsDisabled(disabled) {
  els.options.querySelectorAll(".option-button").forEach((btn) => {
    btn.disabled = disabled;
  });
}

function checkAnswer(selected) {
  const mission = MISSIONS[currentIndex];

  if (selected === mission.answer) {
    setOptionsDisabled(true);
    showCorrectFeedback(mission);
    return;
  }

  wrongCount += 1;
  showWrongFeedback();
  if (wrongCount >= 2) {
    openHint(true);
  }
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
  };

  showFeedback();
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

function openHint(forceOpen) {
  const willOpen = forceOpen || els.hintText.hidden;
  els.hintText.hidden = !willOpen;
  els.hintButton.setAttribute("aria-expanded", String(willOpen));
  els.hintButton.textContent = willOpen ? "힌트 닫기" : "힌트 보기";
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
  document.getElementById("startButton").addEventListener("click", () => {
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

  els.hintButton.addEventListener("click", () => openHint(false));
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
resumeFromStorage();
