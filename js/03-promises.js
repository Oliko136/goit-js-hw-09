import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
}

const { form, delayEl, stepEl, amountEl } = refs;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  let { delay, step, amount } = getValues();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
    console.log(delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(({ position, delay }));
    } else {
        reject(({ position, delay }));
    }}, delay)
  });
}

function getValues() {
  return {
    delay: Number(delayEl.value),
    step: Number(stepEl.value),
    amount: Number(amountEl.value),
  }
}