import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  delayField: document.querySelector('input[name="delay"]'),
  stateRadioButtons: document.querySelectorAll('input[name="state"]'),
  buttonEl: document.querySelector('button[type="submit"]'),
};

refs.buttonEl.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();

  const { delayField, stateRadioButtons } = refs;
  const selectedState = Array.from(stateRadioButtons).find(radio => radio.checked)?.value;

  if (!delayField.value || !selectedState) {
    iziToast.error({
      title: 'Error',
      message: 'All fields must be filled in!',
    });
    return;
  }

  const delay = +delayField.value;

  createPromise(selectedState, delay)
    .then(({ state, delay }) => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
      });
      console.log(`Fulfilled promise in ${delay}ms`);
    })
    .catch(({ state, delay }) => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
      });
      console.log(`Rejected promise in ${delay}ms`);
    });
}

function createPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve({ state, delay });
      } else {
        reject({ state, delay });
      }
    }, delay);
  });
}
