function formatInput(field) {
  let input = document.getElementById(field);
  let val = parseInt(input.value) || 0;

  let max = field === 'hours' ? 99 : 59;
  if (val > max) val = max;
  if (val < 0) val = 0;

  input.value = val.toString().padStart(2, '0');
}

let timer = null;
let isRunning = false;
let bell = new Audio('./../../asset/alarm-sound.wav');
let popUp = document.getElementsByClassName('pop-up-notification');

function timeSet(unit, amount) {
  const input = document.getElementById(unit);
  let value = parseInt(input.value) || 0;

  value += amount;

  if (unit !== 'hours') {
    value = Math.max(0, Math.min(59, value)); 
  } else {
    value = Math.max(0, Math.min(99, value)); 
  }

  input.value = String(value).padStart(2, '0');
}

function formatInput(unit) {
  const input = document.getElementById(unit);
  let value = parseInt(input.value) || 0;

  if (unit !== 'hours') {
    value = Math.max(0, Math.min(59, value));
  } else {
    value = Math.max(0, Math.min(99, value));
  }

  input.value = String(value).padStart(2, '0');
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  let h = parseInt(document.getElementById("hours").value) || 0;
  let m = parseInt(document.getElementById("minutes").value) || 0;
  let s = parseInt(document.getElementById("seconds").value) || 0;
  let arrowUp = document.getElementsByClassName("arrow-up");
  let arrowDown = document.getElementsByClassName("arrow-down");

  timer = setInterval(() => {
    if (s > 0) {
      s--;
    } else if (m > 0) {
      m--;
      s = 59;
    } else if (h > 0) {
      h--;
      m = 59;
      s = 59;
    } else {
      bell.play();
      clearInterval(timer);
      isRunning = false;
      popUp[0].style.display = 'flex';
    }

    document.getElementById("hours").value = String(h).padStart(2, '0');
    document.getElementById("minutes").value = String(m).padStart(2, '0');
    document.getElementById("seconds").value = String(s).padStart(2, '0');
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  document.getElementById("hours").value = "00";
  document.getElementById("minutes").value = "00";
  document.getElementById("seconds").value = "00";
}

function closePopUp() {
  bell.pause();
  popUp[0].style.display = 'none';
}