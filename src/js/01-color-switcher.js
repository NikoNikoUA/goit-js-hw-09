const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let disabledStopBtn = (btnStop.disabled = true);
let disabledStartBtn = (btnStart.disabled = false);

function onBtnStartClick() {
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  disabledStartBtn = btnStart.disabled = true;
  disabledStopBtn = btnStop.disabled = false;
}

function onBtnStopClick() {
  disabledStartBtn = btnStart.disabled = false;
  disabledStopBtn = btnStop.disabled = true;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
