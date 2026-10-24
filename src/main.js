import "./style.css";

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
