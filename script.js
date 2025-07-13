let totalSeconds = 7200; // 2시간
let elapsed = 0;
let timerInterval = null;
let running = false;

const timerDisplay = document.getElementById("timer");
const toggleBtn = document.getElementById("toggle-btn");

const sound1min = document.getElementById("sound-1min");
const sound30min = document.getElementById("sound-30min");
const sound2hr = document.getElementById("sound-2hr");

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

    // 매 1분마다
    if (elapsed % 60 === 0 && elapsed < totalSeconds) {
      sound1min.play();
    }

    // 매 30분마다
    if (elapsed % 1800 === 0 && elapsed < totalSeconds) {
      sound30min.play();
    }

    // 2시간(종료 시)
    if (elapsed === totalSeconds) {
      sound2hr.play();
      clearInterval(timerInterval);
      toggleBtn.textContent = "다시 시작";
      running = false;
    }
  }, 1000);
}

toggleBtn.addEventListener("click", () => {
  if (!running && elapsed === totalSeconds) {
    // Reset
    elapsed = 0;
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
