import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
console.log(spanDays);

let timerId = null;

btnStart.addEventListener('click', onBtnStartClick);

btnStart.disabled = true;

function onBtnStartClick() {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    let timeDifference = fp.selectedDates[0] - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    spanActualization({ days, hours, minutes, seconds });
  }, 1000);
}

function spanActualization({ days, hours, minutes, seconds }) {
  spanDays.textContent = `${days}`;
  spanHours.textContent = `${hours}`;
  spanMinutes.textContent = `${minutes}`;
  spanSeconds.textContent = `${seconds}`;
}

const fp = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future', {
        width: '320px',
        borderRadius: '8px',
        position: 'center-center',
      });
    } else {
      btnStart.disabled = false;
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
