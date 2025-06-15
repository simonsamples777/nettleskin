const textOptions = [
  "text 2",
  "text 3",
  "text 4",
  "text 5",
  "text 6",
];

let currentIndex = 0;
let isOriginalImage = true;

document.getElementById("replaceTextButton").addEventListener("click", function () {
  const textElement = document.getElementById("text");
  const imageElement = document.querySelector(".image img");

  // Update text
  if (currentIndex < textOptions.length) {
    textElement.textContent = textOptions[currentIndex];
    currentIndex++;
  }

  // Alternate image only if not at the last text
  if (currentIndex < textOptions.length) {
    if (isOriginalImage) {
      imageElement.src = "images/cd1omslagbak.png";
    } else {
      imageElement.src = "images/cd1ver8.jpg";
    }
    isOriginalImage = !isOriginalImage; // Toggle the image state
  }
});