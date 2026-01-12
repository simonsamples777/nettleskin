console.log("PLAYER.JS LOADED");



// ---------------- Audio Utilities ----------------
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
}

function parseTime(str) {
  const parts = str.split(":").map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

// ---------------- Play/Pause ----------------
function toggleAudio(audioId, btn) {
  const audio = document.getElementById(audioId);
  if (!audio) return;

  if (audio.paused) audio.play();
  else audio.pause();
}

// ---------------- Audio Initialization ----------------
const audios = [
  { id: "audio1", inputId: "time1" },
  { id: "audio2", inputId: "time2" }
];

audios.forEach(({ id, inputId }) => {
  const audio = document.getElementById(id);
  const input = document.getElementById(inputId);
  if (!audio || !input) return;

  // Wait for metadata to load to show full duration
  audio.addEventListener("loadedmetadata", () => {
    input.value = `0:00 / ${formatTime(audio.duration)}`;
  });

  // Update live current time while playing
  audio.addEventListener("timeupdate", () => {
    const parts = input.value.split("/");
    const durationPart = parts[1] ? parts[1].trim() : formatTime(audio.duration);
    input.value = `${formatTime(audio.currentTime)} / ${durationPart}`;
  });

  // Make input editable: user can type new current time
  input.addEventListener("change", () => {
    const parts = input.value.split("/");
    const newTime = parseTime(parts[0].trim());
    if (!isNaN(newTime) && newTime <= audio.duration) {
      audio.currentTime = newTime;
    }
  });
});
 
// ---------------- Drag Scroll ----------------
// ---------------- Drag Scroll ----------------
const capture = document.getElementById('drag-capture');
const scroller = document.querySelector('.albums-scroll');
const bodyWrapper = document.body;

let dragging = false;
let startX = 0, startY = 0;
let startScrollLeft = 0, startScrollTop = 0;
let moved = false;

const DRAG_THRESHOLD = 6;

// Pinch zoom
let initialDistance = 0;
let currentScale = 1;

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx*dx + dy*dy);
}

function applyScale(scale) {
  currentScale = Math.max(0.5, Math.min(scale, 2));
  bodyWrapper.style.transform = `scale(${currentScale})`;
  bodyWrapper.style.transformOrigin = 'top left';
}

function startDrag(x, y) {
  dragging = true;
  moved = false;
  startX = x;
  startY = y;
  startScrollLeft = scroller.scrollLeft;
  startScrollTop = window.scrollY;
}

function moveDrag(x, y) {
  if (!dragging) return;

  const dx = x - startX;
  const dy = y - startY;

  if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
    moved = true;
    capture.style.pointerEvents = 'auto';
    document.body.classList.add('dragging');
  }

  if (!moved) return;

  scroller.scrollLeft = startScrollLeft - dx;
  window.scrollTo(window.scrollX, startScrollTop - dy);
}

function stopDrag() {
  dragging = false;
  moved = false;
  capture.style.pointerEvents = 'none';
  document.body.classList.remove('dragging');
}

// ---------------- Mouse ----------------
document.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return;
  startDrag(e.clientX, e.clientY);
});

document.addEventListener('mousemove', (e) => {
  moveDrag(e.clientX, e.clientY);
});

document.addEventListener('mouseup', stopDrag);

// ---------------- Touch ----------------
document.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches);
  } else if (e.touches.length === 1) {
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
  }
});

document.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    const newDistance = getDistance(e.touches);
    const scale = (newDistance / initialDistance) * currentScale;
    applyScale(scale);
    e.preventDefault();
  } else if (e.touches.length === 1) {
    const t = e.touches[0];
    moveDrag(t.clientX, t.clientY);
  }
}, { passive: false });

document.addEventListener('touchend', stopDrag);

