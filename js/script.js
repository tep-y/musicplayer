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
const nowPlaying = wrapper.querySelector(".top-bar .playing");
const repeatBtn = wrapper.querySelector("#repeat-plist");

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
  nowPlaying.innerText = "Now Playing";
}

function pauseMusic() {
  wrapper.classList.remove("playing");
  songAudio.pause();
  playPauseBtn.innerText = "play_circle";
  nowPlaying.innerText = "Music Paused";
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
  let playlistBtn = repeatBtn.innerText;

  switch(playlistBtn) {
    case "repeat":
      nextMusic();
    break;
    case "shuffle":
      randomSong();
    break;
    case "repeat_one":
      repeatOneSong();
    break;
  };
});

prevBtn.addEventListener("click", () => {
  let playlistBtn = repeatBtn.innerText;

  switch(playlistBtn) {
    case "repeat":
      prevMusic();
    break;
    case "shuffle":
      prevMusic();
    break;
    case "repeat_one":
      repeatOneSong();
    break;
  };
});

function randomSong() {
  let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);

  do {
    randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
  } while (musicIndex == randomIndex);

  musicIndex = randomIndex;
  loadMusic(randomIndex);
  playMusic();
};

function repeatOneSong() {
  songAudio.currentTime = 0;
  loadMusic(musicIndex);
  playMusic();
};

//song current time & duration, and progress bar
songAudio.addEventListener('loadeddata', (event) => {
  let duration = event.target.duration;
  let totalMinute = Math.round((duration / 60));
  let totalSeconds = Math.round((duration % 60));
  if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;

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

//random background & progress bar gradient color
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
let progressBarGradient = "linear-gradient(45deg, " + color1 + ", 50%, " + color2 + ")";

document.body.style.background = gradient;
progressBar.style.background = progressBarGradient;

//control icons color change on hover
controlIcons.forEach( function (icon) {
  icon.addEventListener("mouseover", function hover() {
    icon.style.color = color1;
  });

  icon.addEventListener("mouseout", function hover() {
    const smokyBlackColor = getComputedStyle(document.documentElement).getPropertyValue('--smokyblack');
    icon.style.color = smokyBlackColor;
  })
});

//TODO: Repeat one song, suffle playlist, repeat playlist button
repeatBtn.addEventListener("click", () => {
  let playlistBtn = repeatBtn.innerText;

  switch(playlistBtn) {
    case "repeat":
      repeatBtn.innerText = "shuffle";
    break;
    case "shuffle":
      repeatBtn.innerText = "repeat_one";
    break;
    case "repeat_one":
      repeatBtn.innerText = "repeat";
    break;
  };
});

songAudio.addEventListener("ended", () => {
  let playlistBtn = repeatBtn.innerText;

  switch(playlistBtn) {
    case "repeat":
      nextMusic();
    break;
    case "shuffle":
      randomSong();
    break;
    case "repeat_one":
      repeatOneSong();
    break;
  };
});


//TODO: Music playlist, clickable list


const ulTag = musicList.querySelector('ul');

for(let i = 0; i < allMusic.length; i ++) {
  const liTag = `<li>
                  <div class="row">
                    <span>${allMusic[i].title}</span>
                    <p>${allMusic[i].artist}</p>
                  </div>
                  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                  <span id="${allMusic[i].src}" class="audio-duration"></span>
                </li>`; 
  
  ulTag.insertAdjacentHTML("beforeend", liTag);
  let liAudioDuration = ulTag.querySelector(`.${allMusic[i].src}`);
  let liShowAudio = ulTag.querySelector(`#${allMusic[i].src}`);

  liAudioDuration.addEventListener("loadeddata", () => {
    let duration = liAudioDuration.duration;
    let totalMinute = Math.round((duration / 60));
    let totalSeconds = Math.round((duration % 60));
    if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;
    
    liShowAudio.innerText = `${totalMinute}:${totalSeconds}`;
  });
};