let timer;
let isRunning = false;
let isWorkSession = true;
let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      isWorkSession = !isWorkSession;
      timeLeft = isWorkSession ? workTime : breakTime;
      modeDisplay.textContent = isWorkSession ? "Work Session" : "Break Time";
      startTimer(); // auto-start next session
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkSession = true;
  timeLeft = workTime;
  updateDisplay();
  modeDisplay.textContent = "Work Session";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay(); // Initial display