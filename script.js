let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function timeToString(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);
}

function stop() {
  clearInterval(timerInterval);
}

startStopBtn.onclick = function () {
  if (!isRunning) {
    start();
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    stop();
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
};

resetBtn.onclick = function () {
  stop();
  elapsedTime = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  isRunning = false;
  laps.innerHTML = "";
};

lapBtn.onclick = function () {
  if (isRunning) {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap: ${lapTime}`;
    laps.appendChild(li);
  }
};
