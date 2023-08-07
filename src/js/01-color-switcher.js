const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let disablesBtnStop = (btnStop.disabled = true);
console.log(disablesBtnStop);

function onBtnStartClick() {
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStart.disabled = true;
  disablesBtnStop = false;
}

function onBtnStopClick() {
  disablesBtnStop = true;
  btnStart.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
