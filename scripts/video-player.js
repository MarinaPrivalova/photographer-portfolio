const player = document.querySelector('.video__clip');
const videoPoster = document.querySelector('.video__poster');
const playBtn = document.querySelector('.video__start-btn');
const playControl = document.querySelector('.controls__play-btn');
const progressBar = document.querySelector('.controls__progress-bar');
const volumeBtn = document.querySelector('.controls__volume-btn');
const progressVolume = document.querySelector('.controls__volume-bar');

let isPlay = false;
let prevVolume = player.volume;
let value;

