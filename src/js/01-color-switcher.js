const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

stopButton.disabled = true;
let delay;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function buttonStateChanger({ enableable = true } = {}) {
  startButton.disabled = enableable;
  stopButton.disabled = !enableable;
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', () => {
  buttonStateChanger();
  changeBgColor();
  delay = setInterval(changeBgColor, 1000);
});

stopButton.addEventListener('click', () => {
  buttonStateChanger({ enableable: false });
  clearInterval(delay);
});
