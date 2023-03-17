import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const submitButton = document.querySelector('.form');

let step;
let amount;
let delay;

delayInput.addEventListener('input', event => {
  delay = Number(event.target.value);
});
stepInput.addEventListener('input', event => {
  step = Number(event.target.value);
});
amountInput.addEventListener('input', event => {
  amount = Number(event.target.value);
});
submitButton.addEventListener('submit', handleSubmitData);

function handleSubmitData(event) {
  event.preventDefault();
  let position = 0;
  for (let i = 0; i < amount; i++) {
    position += 1;
    createPromise(position, delay)
      .then(result => {
        Notify.success(result);
      })
      .catch(result => {
        Notify.failure(result);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay} ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay} ms`);
      }
    }, delay);
  });
}
