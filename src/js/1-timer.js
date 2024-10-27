import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const startButton = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector("#datetime-picker");

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();

    if (userSelectedDate <= now) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
      });
      startButton.disabled = true; 
    } else {
      startButton.disabled = false; 
    }

    console.log(userSelectedDate);
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
  if (!userSelectedDate) {
    iziToast.error({
      title: "Error",
      message: "Please select a date first",
    });
    return;
  }

  startButton.disabled = true;
  dateTimePicker.disabled = true; 

  const timerId = setInterval(() => {
    const now = new Date();
    const ms = userSelectedDate - now;

    if (ms <= 0) {
      clearInterval(timerId);
      iziToast.success({
        title: "Time's up!",
        message: "The countdown has ended.",
      });

      dateTimePicker.disabled = false; 
      startButton.disabled = true; 
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
