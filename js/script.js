const wrapper = document.querySelector(".wrapper");
const songImg = wrapper.querySelector(".image-area img");
const songTitle = wrapper.querySelector(".song-details .title");
const songArtist = wrapper.querySelector(".song-details .artist");
const songAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = wrapper.querySelector(".play-pause i");
const nextBtn = wrapper.querySelector("#next");
const prevBtn = wrapper.querySelector("#prev");
const progressBar = wrapper.querySelector(".progress-bar");
const songCurrentTime = wrapper.querySelector(".timer .current");
const songTotalTime = wrapper.querySelector(".timer .total");
const progressArea = wrapper.querySelector(".progress-area");
const musicList = wrapper.querySelector(".music-list");
const showPlaylist = wrapper.querySelector("#more-music");
const hidePlaylist = musicList.querySelector("#close-list");
const controlIcons = wrapper.querySelectorAll(".controls i");

let musicIndex = 1;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumber) {
  songTitle.innerText = allMusic[indexNumber - 1].title;
  songArtist.innerText = allMusic[indexNumber - 1].artist;
  songImg.src = `images/${allMusic[indexNumber -1].img}.jpg`;
  songAudio.src = `songs/${allMusic[indexNumber -1].src}.mp3`;
}

function playMusic() {
  wrapper.classList.add("playing");
  songAudio.play();
  playPauseBtn.innerText = "pause_circle";
}

function pauseMusic() {
  wrapper.classList.remove("playing");
  songAudio.pause();
  playPauseBtn.innerText = "play_circle";
}

function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicplaying = wrapper.classList.contains("playing");
  isMusicplaying ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", () => {
  nextMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

songAudio.addEventListener('loadeddata', (event) => {
  let duration = event.target.duration;
  let totalMinute = Math.round((duration / 60));
  let totalSeconds = Math.round((duration % 100));
  songTotalTime.innerText = `${totalMinute}:${totalSeconds}`;

  songAudio.addEventListener('timeupdate', (event) => {
    let currentTime = event.target.currentTime;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let currentMinute = Math.floor((currentTime / 60));
    let currentSeconds = Math.floor((currentTime % 60));
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    songCurrentTime.innerText = `${currentMinute}:${currentSeconds}`;
  });
});

progressArea.addEventListener("click", (event) => {
  const progressAreaWidth = progressArea.clientWidth;
  const offsetX = event.offsetX;
  const duration = songAudio.duration;
  songAudio.currentTime = (offsetX / progressAreaWidth) * duration;
});

showPlaylist.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

hidePlaylist.addEventListener("click", () => {
  musicList.classList.remove("show");
});

function backgroundColor(element) {
  let hexChoices = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
  let x = "";

  for(let i = 0; i < 6; i++){
    let hexPick = Math.round(Math.random() * 15);
    let hexItem = hexChoices[hexPick];
    x += hexItem;
  };
  let hexCode = element + x;
  return hexCode;
};

let bgHex = "#";
let color1 = backgroundColor(bgHex);
let color2 = backgroundColor(bgHex);
let gradient = "linear-gradient(" + color1 + ", " + color2 + ")";

document.body.style.background = gradient;

controlIcons.forEach( function (icon) {
  icon.addEventListener("mouseover", function hover() {
    icon.style.color = color1;
  });

  icon.addEventListener("mouseout", function hover() {
    icon.style.color = "black";
  })
});
