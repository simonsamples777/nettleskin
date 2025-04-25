const textOptions = [
  "text 2",
  "text 3",
  "text 4",
  "text 5",
  "text 6",
];

let currentIndex = 0;

document.getElementById("replaceTextButton").addEventListener("click", function () {
  const textElement = document.getElementById("text");
  if (currentIndex < textOptions.length) {
    textElement.textContent = textOptions[currentIndex];
    currentIndex++;
  }
});