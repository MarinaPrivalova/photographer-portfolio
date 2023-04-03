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
  playControl.style.backgroundImage = 'url("../images/svg/pause.svg")';
  isPlay = true;

  video.play();
}

function pauseVideo() {
  playBtn.classList.remove('video__start-btn_hide');
  playControl.style.backgroundImage = 'url("../images/svg/play.svg")';
  isPlay = false;

  video.pause();
}






playBtn.addEventListener('click', playVideo);
video.addEventListener('click', pauseVideo);
playControl.addEventListener('click', () => {
  if(isPlay) {
    pauseVideo()
  } else {
    playVideo()
  }
})