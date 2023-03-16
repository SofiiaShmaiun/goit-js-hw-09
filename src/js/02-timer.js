import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerInput = document.querySelector('input#datetime-picker');
const startTimerButton = document.querySelector('button[data-start]');
const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minutesTimer = document.querySelector('span[data-minutes]');
const secondsTimer = document.querySelector('span[data-seconds]');

startTimerButton.disabled = true;
let ms;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startTimerButton.addEventListener('click', handleStartTimerClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    } else if (selectedDates[0] > new Date()) {
      startTimerButton.disabled = false;
    }
    let intervalDateId = setInterval(() => {
      ms = selectedDates[0] - new Date();
      if (ms < 0) {
        clearInterval(intervalDateId);
        return;
      }
    }, 1000);
  },
};

function handleStartTimerClick() {
  timerInput.disabled = true;
  startTimerButton.disabled = true;
  let intervalTimerId = setInterval(() => {
    if (ms <= 0) {
      clearInterval(intervalTimerId);
      return;
    } else {
      daysTimer.textContent = convertMs(ms).days;
      hoursTimer.textContent = convertMs(ms).hours;
      minutesTimer.textContent = convertMs(ms).minutes;
      secondsTimer.textContent = convertMs(ms).seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

flatpickr(timerInput, options);
