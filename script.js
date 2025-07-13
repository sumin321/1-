let totalSeconds = 7200; // 2시간
let elapsed = 0;
let timerInterval = null;
let running = false;

const timerDisplay = document.getElementById("timer");
const toggleBtn = document.getElementById("toggle-btn");

const sound1min = document.getElementById("sound-1min");
const sound30min = document.getElementById("sound-30min");
const sound2hr = document.getElementById("sound-2hr");

const checkpoints = {
  60: false,
  1800: false,
  7200: false,
};

function updateDisplay(secondsLeft) {
  const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${h}:${m}:${s}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (!running) return;

    elapsed += 1;
    const remaining = totalSeconds - elapsed;
    updateDisplay(remaining);

    if (elapsed in checkpoints && !checkpoints[elapsed]) {
      if (elapsed === 60) sound1min.play();
      if (elapsed === 1800) sound30min.play();
      if (elapsed === 7200) sound2hr.play();
      checkpoints[elapsed] = true;
    }

    if (elapsed >= totalSeconds) {
      clearInterval(timerInterval);
      toggleBtn.textContent = "다시 시작";
      running = false;
    }
  }, 1000);
}

toggleBtn.addEventListener("click", () => {
  if (!running && elapsed === 7200) {
    // Reset for a new round
    elapsed = 0;
    for (let key in checkpoints) checkpoints[key] = false;
    updateDisplay(totalSeconds);
  }

  running = !running;

  if (running) {
    toggleBtn.textContent = "일시정지";
    if (!timerInterval) startTimer();
  } else {
    toggleBtn.textContent = "재생";
  }
});

updateDisplay(totalSeconds);