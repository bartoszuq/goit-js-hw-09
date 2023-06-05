import Notiflix from 'notiflix';
Notiflix.Notify.init({
  pauseOnHover: false,
});

const formEl = document.querySelector('.form');
function getinputValues(e) {
  const {
    elements: {
      delay: { value: delayValue },
      step: { value: stepValue },
      amount: { value: amountValue },
    },
  } = formEl;

  return {
    delay: +delayValue,
    step: +stepValue,
    amount: +amountValue,
  };
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const data = {
    position,
    delay,
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(data) : reject(data);
    }, delay);
  });
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const input = getinputValues();

  for (let i = 1; i <= input.amount; i++) {
    createPromise(i, input.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    input.delay += input.step;
  }
});
