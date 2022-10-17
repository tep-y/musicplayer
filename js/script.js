const wrapper = document.querySelector(".wrapper");
const songImg = wrapper.querySelector(".image-area img");
const songTitle = wrapper.querySelector(".song-details .title");
const songArtist = wrapper.querySelector(".song-details .artist");
const songAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = wrapper.querySelector(".play-pause i");
const nextBtn = wrapper.querySelector("#next");
const prevBtn = wrapper.querySelector("#prev");

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