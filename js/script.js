const wrapper = document.querySelector(".wrapper");
const songImg = wrapper.querySelector(".image-area img");
const songTitle = wrapper.querySelector(".song-details .title");
const songArtist = wrapper.querySelector(".song-details .artist");
const songAudio = wrapper.querySelector("#main-audio");
const playPauseBtn = wrapper.querySelector(".play-pause i");

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

//TODO: add play music function
function playMusic() {
  wrapper.classList.add("paused");
  songAudio.play();
  console.log("playing");
}

//TODO: add pause music function
function pauseMusic() {
  wrapper.classList.remove("paused");
  songAudio.pause();
  console.log("paused");
}

playPauseBtn.addEventListener("click", () => {
  //TODO: play or pause music onClick button event
  // must change class to : play or pause
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});