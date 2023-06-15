const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles/names
const songs = ["Laila" , "Behti-Hawa" , "Khamosiyan" , "ManikeMageHithe" , "Tomake-Chai" , "JaiRadhe-JaiRadhe"];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.png`;
}

function playsong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    
    audio.play();
}

function pausesong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    
    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    
    loadSong(songs[songIndex]);
    
    playsong();
}

function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playsong();
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pausesong();
    }else{
        playsong();
    }
});

function updateProgress(){
    const {duration , currentTime} = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    // Calculate the current time of the song based on where    
    // the user clicks on the progress bar
    audio.currentTime = (clickX / width) * duration;
}
// Previous song
prevBtn.addEventListener('click' ,prevSong);
nextBtn.addEventListener('click' ,nextSong);
audio.addEventListener('timeupdate' , updateProgress);
audio.addEventListener('ended' , nextSong);
progressContainer.addEventListener('click', setProgress);
