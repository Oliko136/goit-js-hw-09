function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    onInterval();
}

function onStop() {
    stopBtn.disabled = true;
    startBtn.disabled = false;

    clearInterval(timerId);
}

function onInterval() {
        document.body.style.backgroundColor = getRandomHexColor();
        
        timerId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000)
    };