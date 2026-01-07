// Audio player functionality
const audio = document.getElementById('audioPlayer');
const audioTime = document.getElementById('audioTime');

audio.ontimeupdate = function() {
    audioTime.textContent = `Current time: ${audio.currentTime.toFixed(1)}s`;
};

// Video player functionality
const video = document.getElementById('videoPlayer');
const videoTime = document.getElementById('videoTime');

video.ontimeupdate = function() {
    videoTime.textContent = `Current time: ${video.currentTime.toFixed(1)}s`;
};
