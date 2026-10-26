export function isAnswerCorrect(selectedOptionId, correctOptionId) {
  return selectedOptionId === correctOptionId;
}

export function finalizeQuestion(answered) {
  if (answered) {
    return { finalized: false, answered: true };
  }

  return { finalized: true, answered: true };
}
