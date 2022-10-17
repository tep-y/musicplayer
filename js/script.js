const wrapper = document.querySelector(".wrapper");
const songImg = wrapper.querySelector(".image-area img");
const songTitle = wrapper.querySelector(".song-details .title");
const songArtist = wrapper.querySelector(".song-details .artist");

let musicIndex = 1;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumber) {
  songTitle.innerText = allMusic[indexNumber - 1].title;
  songArtist.innerText = allMusic[indexNumber - 1].artist;
  songImg.src = `images/${allMusic[indexNumber -1].img}.jpg`;
}

//TODO: add play music function
//TODO: add pause music function

//TODO: play or pause music onClick button event
// must change class to : play or pause