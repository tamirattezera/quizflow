import { describe, expect, it } from "vitest";
import { questions } from "../data/questions.js";
import { finalizeQuestion, isAnswerCorrect } from "../quiz-logic.js";

describe("isAnswerCorrect", () => {
  it("returns true when the selected option is correct", () => {
    expect(isAnswerCorrect("b", "b")).toBe(true);
  });

  it("returns false when the selected option is incorrect", () => {
    expect(isAnswerCorrect("a", "b")).toBe(false);
  });

  it("returns false when option IDs differ", () => {
    expect(isAnswerCorrect("c", "d")).toBe(false);
  });
});

describe("quiz question data", () => {
  it("contains at least one question", () => {
    expect(questions.length).toBeGreaterThan(0);
  });

  it("gives each question a unique ID", () => {
    const ids = questions.map((question) => question.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives each question unique option IDs and a valid correct answer", () => {
    for (const question of questions) {
      const optionIds = question.options.map((option) => option.id);

      expect(new Set(optionIds).size).toBe(optionIds.length);
      expect(optionIds).toContain(question.correctOptionId);
    }
  });
});
describe("finalizeQuestion", () => {
  it("finalizes an unanswered question", () => {
    expect(finalizeQuestion(false)).toEqual({
      finalized: true,
      answered: true,
    });
  });

  it("rejects a second finalization attempt", () => {
    expect(finalizeQuestion(true)).toEqual({
      finalized: false,
      answered: true,
    });
  });
});
