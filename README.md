# QuizFlow — Interactive Quiz Application

QuizFlow is a responsive, browser-based quiz application built with HTML, CSS, and vanilla JavaScript. It helps users practice web development fundamentals through timed multiple-choice questions, immediate feedback, and score tracking.

**Live Demo:** [https://quizflow-learn.vercel.app/](https://quizflow-learn.vercel.app/)

## Features

- **Interactive quizzes** — Answer one question at a time.
- **Multiple-choice questions** — Select from clearly presented answer options.
- **Instant feedback** — See whether your answer is correct and read an explanation.
- **Countdown timer** — Each question has a 15-second time limit.
- **Automatic timeout handling** — Unanswered questions are finalized when time expires.
- **Score tracking** — Earn points for correct answers.
- **Progress indicators** — Track your current question and overall progress.
- **Results screen** — View your final score when the quiz is complete.
- **Restart functionality** — Retake the quiz with a reset score and timer.
- **Responsive dashboard** — Use the application across desktop, tablet, and mobile screen sizes.
- **Accessibility considerations** — Semantic HTML, keyboard-focus management, accessible status messages, and disabled answer controls after finalization.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic application structure |
| CSS3 | Responsive layout, styling, and visual feedback |
| JavaScript (ES modules) | Quiz logic, state, timers, and DOM interactions |
| Vite | Development server and production build |
| Vitest | Unit testing |
| Git and GitHub | Version control and source-code hosting |
| Vercel | Deployment and hosting |

## How It Works

QuizFlow follows a simple client-side architecture:

1. **Question data** — Questions, answer options, correct answers, and explanations are defined in a dedicated data module.
2. **Application state** — JavaScript tracks the current question, score, timer, and whether the current question has already been finalized.
3. **Rendering** — DOM APIs display the current question, answer buttons, progress, and feedback.
4. **Answer evaluation** — The application compares the selected option with the correct option and updates the score when appropriate.
5. **Timer management** — A deadline-based countdown handles expiration and prevents the same question from being finalized twice.
6. **Results and restart** — The application displays the final score and allows users to start again.

The application uses vanilla JavaScript rather than a frontend framework, providing practical experience with DOM manipulation, events, state management, and application lifecycle logic.

## Getting Started

### Prerequisites

- Node.js compatible with the installed Vite version
- npm
- Git

### Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
cd quizflow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

### Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run test` | Run the Vitest unit tests |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

## Testing

QuizFlow uses Vitest to verify important quiz logic and question-data requirements.

The current test suite covers:

- Correct and incorrect answer evaluation
- Option ID comparisons
- Question-data availability
- Unique question IDs
- Unique option IDs and valid correct-answer references
- Finalization of unanswered questions
- Prevention of repeated question finalization
- Non-empty question text and explanations

**Latest verified test result:** 10 tests passed.

**Latest verified build result:** The Vite production build completed successfully.

These checks validate the tested logic and build process; they do not imply that every possible browser interaction or edge case has been exhaustively tested.

## Project Structure

```text
quizflow/
├── index.html
├── package.json
├── package-lock.json
├── public/
│   └── favicon.svg
└── src/
    ├── data/
    │   └── questions.js
    ├── tests/
    │   └── quiz.test.js
    ├── quiz-logic.js
    ├── main.js
    └── style.css
```

The structure above highlights the main application files; additional scaffold or configuration files may also exist in the repository.

## Design and Engineering Principles

QuizFlow is being developed through an incremental, testable workflow:

- Separate question data from quiz logic and UI rendering.
- Keep application state as the source of truth.
- Prevent duplicate scoring and repeated finalization.
- Clean up timers when questions change or the quiz ends.
- Validate important behavior with automated tests.
- Review staged changes before committing.
- Keep Git history organized around focused changes.

## Deployment

QuizFlow is deployed on Vercel.

**Try the application:** [https://quizflow-learn.vercel.app/](https://quizflow-learn.vercel.app/)

The deployment is available for trying the current version of the application. Features and behavior may evolve as development continues.

## Future Improvements

Potential next steps include:

- Expand the question bank and introduce difficulty levels.
- Improve keyboard interaction and accessibility testing.
- Add broader automated tests for application interactions and timer edge cases.
- Add more detailed result summaries.
- Document the application with screenshots and a demonstration GIF.
- Refine the project based on testing and user feedback.

## About This Project

QuizFlow is a hands-on web development project created as part of my learning journey through the Pynexia Virtual Training & Internship Program.

My goal is not only to build a working interface, but also to understand the engineering principles behind it: application state, event-driven behavior, timer lifecycle management, testing, debugging, and maintainable code.

**Built by Tamirat Tezera** — Software Engineering student focused on learning by building and developing practical web applications.

---

*This project is a work in progress and a learning project. Its features and testing status are described according to the current implementation.*