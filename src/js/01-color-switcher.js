function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId;
const bodySheet = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', handleStartColorChanging);
stopBtn.addEventListener('click', handleStopColorChanging);

function handleStartColorChanging() {
  intervalId = setInterval(() => {
    bodySheet.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function handleStopColorChanging() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
