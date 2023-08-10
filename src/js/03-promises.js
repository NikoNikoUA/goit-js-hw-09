import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const input = document.querySelector('input');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit() {
  createPromise();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
      width: '320px',
      borderRadius: '8px',
      position: 'center-center',
    });
    // Fulfill
  } else {
    // Reject
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
      width: '320px',
      borderRadius: '8px',
      position: 'center-center',
    });
  }
}

createPromise(3, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
