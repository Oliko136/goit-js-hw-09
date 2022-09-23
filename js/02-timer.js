import Notiflix from "notiflix";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    datetimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('.value[data-days]'),
    hoursEl: document.querySelector('.value[data-hours]'),
    minutesEl: document.querySelector('.value[data-minutes]'),
    secondsEl: document.querySelector('.value[data-seconds]'),
}

const { datetimePicker, startBtn, daysEl, hoursEl, minutesEl, secondsEl } = refs;

startBtn.disabled = true;

let endtime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= Date.now()) {
          Notiflix.Notify.failure('Please choose a date in the future');
          startBtn.disabled = true;
      } else {
          startBtn.disabled = false;
          return endtime = selectedDates[0];
      }
  },
};

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', onTimerStart);

function onTimerStart(evt) {
    startBtn.disabled = true;
    datetimePicker.disabled = true;

    let timerId = setInterval(() => {
        const startTime = Date.now();
        const delta = endtime - startTime;
        const convertedDelta = convertMs(delta);
        console.log(convertedDelta);
        onIntrerfaceUpdate(convertedDelta);

        if (delta < 1000) {
            clearInterval(timerId);
        }

    }, 1000);
}

function onIntrerfaceUpdate({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}