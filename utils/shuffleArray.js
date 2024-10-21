export function shuffleArray(array) {
  // Create a copy of the array to avoid mutating the original array

  const firstElement = array[0];
  const shuffledArrayElements = [...array.slice(1)];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArrayElements.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements
    [shuffledArrayElements[i], shuffledArrayElements[j]] = [
      shuffledArrayElements[j],
      shuffledArrayElements[i],
    ];
  }

  return [firstElement, ...shuffledArrayElements.slice(1, 6)];
}
