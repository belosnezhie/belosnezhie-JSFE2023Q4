export function checkSentence(
  currentSentence: string[],
  userSentence: string[],
): boolean {
  if (currentSentence.length !== userSentence.length) {
    return false;
  }
  const currentLine: string = currentSentence.join('');
  const userLine: string = userSentence.join('');

  if (currentLine !== userLine) {
    return false;
  }

  return true;
}
