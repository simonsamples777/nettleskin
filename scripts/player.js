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
    //btn.textContent = "Pause Album " + (audioId === "audio1" ? "1" : "2");
  } else {
    audio.pause();
    //btn.textContent = "Play Album " + (audioId === "audio1" ? "1" : "2");
        }
  }

    // Update playtime display for both audio elements
const audio1 = document.getElementById('audio1');
const audio2 = document.getElementById('audio2');

audio1.addEventListener('timeupdate', function() {
  updateTime('audio1', 'time1');
});
audio1.addEventListener('loadedmetadata', function() {
  updateTime('audio1', 'time1');
});

audio2.addEventListener('timeupdate', function() {
  updateTime('audio2', 'time2');
});
audio2.addEventListener('loadedmetadata', function() {
  updateTime('audio2', 'time2');
});
 