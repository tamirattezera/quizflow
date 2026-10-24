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
        <h2 id="question-text">Your first question will appear here.</h2>
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
        <h2 id="results-title">Quiz complete!</h2>
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
const progressBar = document.querySelector("#progress-bar");
const progressFill = document.querySelector("#progress-fill");

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
}

const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");

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

  const selectedOptionId = button.dataset.optionId;
  const question = questions[0];
  const isCorrect = selectedOptionId === question.correctOptionId;

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

answerList.addEventListener("click", handleAnswerSelection);

renderQuestion(questions[0], 0);
