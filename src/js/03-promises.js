import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
// const inputDelay = document.querySelector('input[name="delay"]');
// const inputStep = document.querySelector('input[name="step"]');
// const inputAmount = document.querySelector('input[name="amount"]');

const arr = [];

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delayValue = event.target.elements.delay.value;
  const stepValue = event.target.elements.step.value;
  const amountValue = event.target.elements.amount.value;

  // const delayValue = inputDelay.value;
  // const stepValue = inputStep.value;
  // const amountValue = inputAmount.value;

  for (let i = 1; i <= amountValue; i += 1) {
    const position = i;
    const delay = delayValue + (i - 1) * stepValue;
    console.log(delay);
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
