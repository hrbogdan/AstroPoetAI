const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const textInput = document.getElementById("text");
let currentCharacter;

playButton.addEventListener("click", () => {
  playText(textInput.innerText);
});

stopButton.addEventListener("click", stopText);

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

function playText(text) {
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  speechSynthesis.speak(utterance);
}

function stopText() {
  speechSynthesis.cancel();
}