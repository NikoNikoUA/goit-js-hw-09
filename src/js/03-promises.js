import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const arr = [];

  const delayValue = event.target.elements.delay.value;
  const stepValue = event.target.elements.step.value;
  const amountValue = event.target.elements.amount.value;

  for (let i = 1; i <= amountValue; i += 1) {
    const position = i;
    const delay = Number(delayValue) + (i - 1) * Number(stepValue);
    arr.push(createPromise(position, delay));
  }
  arr.forEach(promise => {
    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          width: '320px',
          borderRadius: '8px',
          position: 'center-center',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          width: '320px',
          borderRadius: '8px',
          position: 'center-center',
        });
      });
  });
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
