console.log("PLAYER.JS LOADED");

// ---------------- Audio Player ----------------
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

function updateTime(audioId, timeId) {
  const audio = document.getElementById(audioId);
  const timeSpan = document.getElementById(timeId);
  timeSpan.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration || 0);
}

function toggleAudio(audioId, btn) {
  const audio = document.getElementById(audioId);
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

audio1.addEventListener('timeupdate', () => updateTime('audio1', 'time1'));
audio1.addEventListener('loadedmetadata', () => updateTime('audio1', 'time1'));
audio2.addEventListener('timeupdate', () => updateTime('audio2', 'time2'));
audio2.addEventListener('loadedmetadata', () => updateTime('audio2', 'time2'));

// ---------------- Drag Scroll ----------------
const capture = document.getElementById('drag-capture');
const scroller = document.querySelector('.albums-scroll');
const bodyWrapper = document.body; // for pinch zoom

let dragging = false;
let startX = 0, startY = 0;
let startScrollLeft = 0, startScrollTop = 0;
let moved = false;

// Pinch zoom
let initialDistance = 0;
let currentScale = 1;

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx*dx + dy*dy);
}

function applyScale(scale) {
  currentScale = Math.max(0.5, Math.min(scale, 2)); // clamp 0.5x - 2x
  bodyWrapper.style.transform = `scale(${currentScale})`;
  bodyWrapper.style.transformOrigin = 'top left';
}

// Drag helpers
function startDrag(x, y) {
  dragging = true;
  moved = false;
  startX = x;
  startY = y;
  startScrollLeft = scroller.scrollLeft;
  startScrollTop = window.scrollY;

  capture.classList.add('dragging');
  scroller.classList.add('dragging');
}

function moveDrag(x, y) {
  if (!dragging) return;
  const dx = x - startX;
  const dy = y - startY;

  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;

  scroller.scrollLeft = startScrollLeft - dx;
  window.scrollTo(window.scrollX, startScrollTop - dy);
}

function stopDrag() {
  dragging = false;
  capture.classList.remove('dragging');
  scroller.classList.remove('dragging');
}

// ---------------- Mouse Events ----------------
capture.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  if (e.target.closest('button, a, iframe, audio')) return;
  e.preventDefault();
  startDrag(e.clientX, e.clientY);
});

window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
window.addEventListener('mouseup', stopDrag);

// ---------------- Touch Events ----------------
capture.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches);
  } else if (e.touches.length === 1) {
    const touch = e.touches[0];
    if (touch.target.closest('button, a, iframe, audio')) return;
    startDrag(touch.clientX, touch.clientY);
  }
});

window.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    const newDistance = getDistance(e.touches);
    const scale = (newDistance / initialDistance) * currentScale;
    applyScale(scale);
    e.preventDefault();
  } else if (e.touches.length === 1) {
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  }
}, { passive: false });

window.addEventListener('touchend', stopDrag);

