const video = document.querySelector('.video__clip');
const videoPoster = document.querySelector('.video__poster');
const playBtn = document.querySelector('.video__start-btn');
const playControl = document.querySelector('.controls__play-btn');
const progressBar = document.querySelector('.controls__progress-bar');
const volumeBtn = document.querySelector('.controls__volume-btn');
const progressVolume = document.querySelector('.controls__volume-bar');

let isPlay = false;
let prevVolume = video.volume;
let value;

function playVideo() {
  playBtn.classList.add('video__start-btn_hide');
  videoPoster.classList.add('video__poster_hide');
  playControl.style.backgroundImage = 'url("../../images/svg/pause.svg")';
  isPlay = true;

  video.play();
}
function pauseVideo() {
  playBtn.classList.remove('video__start-btn_hide');
  playControl.style.backgroundImage = 'url("../../images/svg/play.svg")';
  isPlay = false;

  video.pause();
}

function showProgress() {
  let current = (video.currentTime / video.duration) * 100;
  progressBar.value = current;
  progressBar.setAttribute('style', `background: -webkit-linear-gradient(0deg, #BDAE82 0%, #BDAE82 ${current}%, #FFFFFF ${current}%, #FFFFFF 100%);`);
}

function rewindVideo(time) {
  if(isPlay) {
    pauseVideo();
    video.currentTime = video.duration * time;
    playVideo();
  } else {
    pauseVideo();
    video.currentTime = video.duration * time;
  }
}

function muteVideo() {
  video.volume = 0;
  volumeBtn.style.backgroundImage = 'url("../../images/svg/mute.svg")';
}
function unMuteVideo() {
  video.volume = prevVolume;
  volumeBtn.style.backgroundImage = 'url("../../images/svg/volume.svg")';
}
function volumeVideo() {
  value = progressVolume.value;
  progressVolume.setAttribute('style', `background: -webkit-linear-gradient(0deg, #BDAE82 0%, #BDAE82 ${value}%, #FFFFFF ${value}%, #FFFFFF 100%);`);
  video.volume = value / 100;

  if(value == 0) {
    prevVolume = 0.1;
    volumeBtn.style.backgroundImage = 'url("../../images/svg/mute.svg")';
  } else {
    volumeBtn.style.backgroundImage = 'url("../../images/svg/volume.svg")';
  }
}

playBtn.addEventListener('click', playVideo);
video.addEventListener('click', pauseVideo);
playControl.addEventListener('click', () => {
  if(isPlay) {
    pauseVideo()
  } else {
    playVideo()
  }
});
video.addEventListener('timeupdate', showProgress);
progressBar.addEventListener('click', (event) => {
  let point = event.clientX - progressBar.offsetLeft;
  let time =  point / progressBar.offsetWidth;

  rewindVideo(time);
});
volumeBtn.addEventListener('click', () => {
  if(video.volume == 0) {
    unMuteVideo()
  } else {
    muteVideo()
  }
});
progressVolume.addEventListener('input', volumeVideo);