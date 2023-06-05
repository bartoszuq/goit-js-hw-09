import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');

const timerSpaces = document.querySelectorAll('div.field>.value');

startButton.disabled = true;
let timer = null;

const calendar = flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startButton.disabled = false;
    const dateNow = new Date();
    this.config.defaultDate = dateNow;
    const past = selectedDates[0] <= dateNow;
    // console.log(dateNow);
    if (past) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
});
let {
  config: { defaultDate: calendarPresentDate },
} = calendar;
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
  if (value < 10) {
    return value.padStart(2, '0');
  }
  return value;
}

function timerEnding(timeArray) {
  const finished = timeArray.every(el => el === 0);
  if (finished) {
    window.alert('timecount done');
    clearInterval(timer);
    calendar.element.disabled = false;
  }
}

function renderArray(arrayOfElements, arrayToRender) {
  arrayOfElements.forEach((el, idx) => {
    const stringifyArray = arrayToRender.map(unit => unit.toString());
    el.textContent = addLeadingZero(stringifyArray[idx]);
  });
  timerEnding(arrayToRender);
}

function getTimeValuesFormMs(timeInMs) {
  let timeObject = convertMs(timeInMs);

  return Object.values(timeObject);
}

function handleTimeRender() {
  calendarPresentDate = new Date();

  startButton.disabled = true;
  calendar.element.disabled = true;

  let TimeUntilNowInMs =
    calendar.selectedDates[0].getTime() - calendarPresentDate.getTime();

  renderArray(timerSpaces, getTimeValuesFormMs(TimeUntilNowInMs));

  timer = setInterval(() => {
    renderArray(timerSpaces, getTimeValuesFormMs(TimeUntilNowInMs));
    TimeUntilNowInMs -= 1000;
  }, 1000);
}

startButton.addEventListener('click', handleTimeRender);
