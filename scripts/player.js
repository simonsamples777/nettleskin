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

// Attach event listeners to audio elements
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

audio1.addEventListener('timeupdate', () => updateTime('audio1', 'time1'));
audio1.addEventListener('loadedmetadata', () => updateTime('audio1', 'time1'));

audio2.addEventListener('timeupdate', () => updateTime('audio2', 'time2'));
audio2.addEventListener('loadedmetadata', () => updateTime('audio2', 'time2'));

// ---------------- Drag Scroll ----------------
const capture = document.getElementById('drag-capture');
const scroller = document.querySelector('.albums-scroll');

let dragging = false;
let startX, startY;
let startScrollLeft, startScrollTop;

capture.addEventListener('mousedown', (e) => {
  if (e.button !== 0) return; // left click only
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startScrollLeft = scroller.scrollLeft;
  startScrollTop = window.scrollY; // vertical drag scrolls the page

  capture.classList.add('dragging');
  scroller.classList.add('dragging');
});

window.addEventListener('mouseup', () => {
  dragging = false;
  capture.classList.remove('dragging');
  scroller.classList.remove('dragging');
});

window.addEventListener('mousemove', (e) => {
  if (!dragging) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  // Horizontal drag scroll on albums
  scroller.scrollLeft = startScrollLeft - dx;

  // Vertical drag scroll on the whole page
  window.scrollTo(window.scrollX, startScrollTop - dy);
});

console.log("JS is running");
