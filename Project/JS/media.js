//-------------ITW23/24 - Grupo 39 -------------//
//------------- Iolanda Leal 48069 -------------//
//------------- José Medeiros 58607 ------------//
//-------------Rita Wang 57143 -----------------//
//---------------------------------------------//


//const myAudio = document.getElementById("music")
const volumeSlider = document.getElementById("volume-slider")
const playPauseButton = document.getElementById("play");
//const buttonImg = document.getElementById("img-music-btn")

var source = "../Audio/Cute Cat-[AudioTrimmer.com].mp3"
myAudio.src = source;

var should_play = true
    window.onclick = () => {
        if (should_play){
            should_play=!should_play
            myAudio.play();
            buttonImg.src = "../Imagens/jogo/pausa.png";
        }
    }

playPauseButton.addEventListener("click", ()=>{
    myAudio.autoplay = true;
    if (myAudio.paused) {
        myAudio.play();
        buttonImg.src = "../Imagens/jogo/pausa.png";
        
    } else {
        myAudio.pause(); // Pause the audio
        buttonImg.src = "../Imagens/jogo/jogar.png";
    }
  });

volumeSlider.addEventListener("input", () => {
    myAudio.volume = volumeSlider.value;
    updateVolumeDisplay();
});
