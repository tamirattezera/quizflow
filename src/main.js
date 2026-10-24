import "./style.css";
import { questions } from "./data/questions.js";

document.querySelector("#app").innerHTML = `
  <main class="quiz-app">
    <header class="quiz-header">
      <a class="brand" href="/" aria-label="QuizFlow home">
        QuizFlow
      </a>
      <p class="tagline">Learn something new, one question at a time.</p>
    </header>

    <section
      class="quiz-panel"
      aria-labelledby="quiz-title"
    >
      <div class="quiz-intro">
        <p class="eyebrow">INTERACTIVE QUIZ</p>
        <h1 id="quiz-title">Test your knowledge</h1>
        <p>Read each question carefully and choose your answer.</p>
      </div>

      <div class="quiz-status">
        <p id="question-count">Question 1 of 5</p>
        <p id="timer" aria-live="off">Time: 15s</p>
      </div>

      <div
        class="progress-track"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin="0"
        aria-valuemax="5"
        aria-valuenow="0"
        id="progress-bar"
      >
        <div class="progress-fill" id="progress-fill"></div>
      </div>

      <div class="question-area" id="question-area">
        <h2 id="question-text" tabindex="-1">
          Your first question will appear here.
        </h2>
        <div class="answer-list" id="answer-list"></div>
      </div>

      <p
        id="feedback"
        class="feedback"
        role="status"
        aria-live="polite"
      ></p>

      <div class="quiz-actions">
        <button id="next-button" type="button" disabled>
          Next question
        </button>
      </div>

      <section
        id="results"
        class="results"
        aria-labelledby="results-title"
        hidden
      >
        <h2 id="results-title" tabindex="-1">Quiz complete!</h2>
        <p id="final-score"></p>
        <button id="restart-button" type="button">
          Try again
        </button>
      </section>
    </section>

    <footer class="quiz-footer">
      <p>Every question is an opportunity to learn.</p>
    </footer>
  </main>
`;

const questionText = document.querySelector("#question-text");
const answerList = document.querySelector("#answer-list");
const questionCount = document.querySelector("#question-count");
const timerDisplay = document.querySelector("#timer");
const progressBar = document.querySelector("#progress-bar");
const progressFill = document.querySelector("#progress-fill");

const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const results = document.querySelector("#results");
const resultsTitle = document.querySelector("#results-title");
const finalScore = document.querySelector("#final-score");
const restartButton = document.querySelector("#restart-button");
const questionArea = document.querySelector("#question-area");
const quizStatus = document.querySelector(".quiz-status");
const progressBarContainer = document.querySelector(".progress-track");
const quizIntro = document.querySelector(".quiz-intro");
const quizActions = document.querySelector(".quiz-actions");

const QUESTION_TIME_LIMIT = 15;

let currentQuestionIndex = 0;
let score = 0;

let timerIntervalId = null;
let timerDeadline = null;

function stopTimer() {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }

  timerDeadline = null;
}

function handleTimeExpired() {
  // Prevent the timeout and an answer click from finalizing the same question.
  if (answerList.dataset.answered === "true") {
    return;
  }

  answerList.dataset.answered = "true";

  const question = questions[currentQuestionIndex];
  const answerButtons = answerList.querySelectorAll(".answer-option");

  answerButtons.forEach((button) => {
    button.disabled = true;
    button.setAttribute("aria-pressed", "false");

    if (button.dataset.optionId === question.correctOptionId) {
      button.classList.add("is-correct");
    }
  });

  feedback.className = "feedback is-incorrect";
  feedback.textContent = `Time's up! ${question.explanation}`;

  nextButton.disabled = false;
}

function startTimer() {
  stopTimer();

  timerDeadline = Date.now() + QUESTION_TIME_LIMIT * 1000;

  function updateTimer() {
    const remainingMilliseconds = timerDeadline - Date.now();
    const remainingSeconds = Math.max(
      0,
      Math.ceil(remainingMilliseconds / 1000),
    );

    timerDisplay.textContent = `Time: ${remainingSeconds}s`;

    if (remainingMilliseconds <= 0) {
      stopTimer();
      handleTimeExpired();
    }
  }

  updateTimer();

  timerIntervalId = setInterval(updateTimer, 250);
}

function renderQuestion(question, index) {
  questionText.textContent = question.text;

  answerList.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    const marker = document.createElement("span");
    const label = document.createElement("span");

    button.type = "button";
    button.className = "answer-option";
    button.dataset.optionId = option.id;
    button.setAttribute("aria-pressed", "false");

    marker.className = "answer-marker";
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = String.fromCharCode(65 + optionIndex);

    label.textContent = option.text;

    button.append(marker, label);
    answerList.append(button);
  });

  questionCount.textContent = `Question ${index + 1} of ${questions.length}`;

  progressBar.setAttribute("aria-valuemax", questions.length);
  progressBar.setAttribute("aria-valuenow", index + 1);

  const progressPercentage = ((index + 1) / questions.length) * 100;
  progressFill.style.width = `${progressPercentage}%`;

  nextButton.textContent =
    index === questions.length - 1 ? "See results" : "Next question";

  startTimer();
}

function handleAnswerSelection(event) {
  const button = event.target.closest(".answer-option");

  if (!button || !answerList.contains(button)) {
    return;
  }

  // Ignore further answers after the question has been answered.
  if (answerList.dataset.answered === "true") {
    return;
  }

  answerList.dataset.answered = "true";
  stopTimer();

  const selectedOptionId = button.dataset.optionId;
  const question = questions[currentQuestionIndex];
  const isCorrect = selectedOptionId === question.correctOptionId;

  if (isCorrect) {
    score += 1;
  }

  const answerButtons = answerList.querySelectorAll(".answer-option");

  answerButtons.forEach((answerButton) => {
    answerButton.disabled = true;

    const isSelected = answerButton === button;
    answerButton.setAttribute("aria-pressed", String(isSelected));

    if (answerButton.dataset.optionId === question.correctOptionId) {
      answerButton.classList.add("is-correct");
    }
  });

  if (!isCorrect) {
    button.classList.add("is-incorrect");
  }

  feedback.className = `feedback ${isCorrect ? "is-correct" : "is-incorrect"}`;
  feedback.textContent = `${isCorrect ? "Correct!" : "Not quite."} ${question.explanation}`;

  nextButton.disabled = false;
}

function handleNextQuestion() {
  // Do not advance until the current question is answered.
  if (answerList.dataset.answered !== "true") {
    return;
  }

  // Show results after the final question has been answered.
  if (currentQuestionIndex === questions.length - 1) {
    finalScore.textContent = `You scored ${score} out of ${questions.length}.`;

    quizIntro.hidden = true;
    quizStatus.hidden = true;
    progressBarContainer.hidden = true;
    questionArea.hidden = true;
    feedback.hidden = true;
    quizActions.hidden = true;
    results.hidden = false;

    resultsTitle.focus();

    return;
  }

  currentQuestionIndex += 1;

  feedback.textContent = "";
  feedback.className = "feedback";

  answerList.dataset.answered = "false";
  nextButton.disabled = true;

  renderQuestion(questions[currentQuestionIndex], currentQuestionIndex);

  // Move keyboard focus to the newly displayed question.
  questionText.focus();
}

function handleRestart() {
  currentQuestionIndex = 0;
  score = 0;

  results.hidden = true;
  quizIntro.hidden = false;
  quizStatus.hidden = false;
  progressBarContainer.hidden = false;
  questionArea.hidden = false;
  feedback.hidden = false;
  quizActions.hidden = false;

  feedback.textContent = "";
  feedback.className = "feedback";

  answerList.dataset.answered = "false";
  nextButton.disabled = true;

  renderQuestion(questions[currentQuestionIndex], currentQuestionIndex);

  // Return focus to the first question after restarting.
  questionText.focus();
}

answerList.addEventListener("click", handleAnswerSelection);
nextButton.addEventListener("click", handleNextQuestion);
restartButton.addEventListener("click", handleRestart);

renderQuestion(questions[0], 0);
