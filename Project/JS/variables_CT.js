//-------------ITW23/24 - Grupo 39 -------------//
//------------- Iolanda Leal 48069 -------------//
//------------- José Medeiros 58607 ------------//
//-------------Rita Wang 57143 -----------------//
//---------------------------------------------//

const cardContainer = document.getElementById('tabuleiro'); 
const okButton = document.getElementById('okButton');
const startPauseButton = document.getElementById('start_pause');
const tempo = document.getElementById('tempo1');
const pontos = document.getElementById('pontos1');
const max_pontos = document.getElementById('max');
const trys = document.getElementById('trys1');
const countdown = document.getElementById('countdown');
const baralho = document.querySelectorAll('#baralho-1, #baralho-2, #baralho-3');
const tabuleiro = document.querySelector('.tabuleiro');
const okDecks = document.getElementById('ok_deck');
let numbColunas = Number(document.getElementById('val_col').value);
let numbCards = Number(document.getElementById('val_cartas').value);
let numbLinhas = Math.ceil(numbCards / numbColunas);
let alertRaised = false;
const myAudio = document.getElementById("music");
const buttonImg = document.getElementById("img-music-btn");
let cards = document.querySelectorAll('.jogo-carta-container');
let allElements = document.getElementsByTagName('*');


const oneMinBtn = document.getElementById('one-min-btn');
const twoMinBtn = document.getElementById('two-min-btn');
const threeMinBtn = document.getElementById('three-min-btn');

const minutes = 'minutes';
const seconds = 'seconds';
const milliseconds = 'milliseconds';
const timer = 'timer';



let backImages_1 = [
    "../Imagens/inicial/gato%20(1).png",
    "../Imagens/inicial/gato%20(2).png",
    "../Imagens/inicial/gato%20(3).png",
    "../Imagens/inicial/gato%20(4).png",
    "../Imagens/jogo/gato (5).png",
    "../Imagens/jogo/gato (6).png",
    "../Imagens/jogo/gato (7).png",
    "../Imagens/jogo/gato (8).png",
    "../Imagens/jogo/gato (9).png",
    "../Imagens/jogo/gato (10).png",
    "../Imagens/jogo/gato (10).png",
    "../Imagens/jogo/catto2.png",
    "../Imagens/jogo/catto1.png"
];

let backImages1 = backImages_1.slice(0, numbCards/2).concat(backImages_1.slice(0, numbCards/2)); 

let newbackImages_1 = backImages_1   //guarda as orginais
let newbackImages1 = backImages1.slice(0, numbCards/2).concat(newbackImages_1.slice(0, numbCards/2));     //guarda as orginais


let backImages_2 = [
    "../Imagens/jogo/deck2/cara1.jpg",
    "../Imagens/jogo/deck2/cara2.jpg",
    "../Imagens/jogo/deck2/cara3.jpg",
    "../Imagens/jogo/deck2/cara4.jpg",
    "../Imagens/jogo/deck2/cara5.jpg",
    "../Imagens/jogo/deck2/cara6.jpg",
    "../Imagens/jogo/deck2/cara7.jpg",
    "../Imagens/jogo/deck2/cara8.jpg",
    "../Imagens/jogo/deck2/cara9.jpg",
    "../Imagens/jogo/deck2/cara10.jpg",
    "../Imagens/jogo/deck2/cara11.jpg",
    "../Imagens/jogo/deck2/cara12.jpg"
];

let backImages_3 = [
    "../Imagens/jogo/deck3/pingu (1).jpg",
    "../Imagens/jogo/deck3/pingu (2).jpg",
    "../Imagens/jogo/deck3/pingu (3).jpg",
    "../Imagens/jogo/deck3/pingu (4).jpg",
    "../Imagens/jogo/deck3/pingu (5).jpg",
    "../Imagens/jogo/deck3/pingu (6).jpg",
    "../Imagens/jogo/deck3/pingu (7).jpg",
    "../Imagens/jogo/deck3/pingu (8).jpg",
    "../Imagens/jogo/deck3/pingu (9).jpg",
    "../Imagens/jogo/deck3/pingu (10).jpg",
    "../Imagens/jogo/deck3/pingu (11).jpg",
    "../Imagens/jogo/deck3/pingu (12).jpg",
];

let frontImages1 = [
    "../Imagens/jogo/pata_nr_1.jpg",
    "../Imagens/jogo/pata_nr_2.jpg",
    "../Imagens/jogo/pata_nr_3.jpg",
    "../Imagens/jogo/pata_nr_4.jpg",
    "../Imagens/jogo/pata_nr_5.jpg",
    "../Imagens/jogo/pata_nr_6.jpg",
    "../Imagens/jogo/pata_nr_7.jpg",
    "../Imagens/jogo/pata_nr_8.jpg",
    "../Imagens/jogo/pata_nr_9.jpg",
    "../Imagens/jogo/pata_nr_10.jpg",
    "../Imagens/jogo/pata_nr_11.jpg",
    "../Imagens/jogo/pata_nr_12.jpg",
    "../Imagens/jogo/pata_nr_13.jpg",
    "../Imagens/jogo/pata_nr_14.jpg",
    "../Imagens/jogo/pata_nr_15.jpg",
    "../Imagens/jogo/pata_nr_16.jpg",
    "../Imagens/jogo/pata_nr_17.jpg",
    "../Imagens/jogo/pata_nr_18.jpg",
    "../Imagens/jogo/pata_nr_19.jpg",
    "../Imagens/jogo/pata_nr_20.jpg",
    "../Imagens/jogo/pata_nr_21.jpeg",
    "../Imagens/jogo/pata_nr_22.jpeg",
    "../Imagens/jogo/pata_nr_23.jpeg",
    "../Imagens/jogo/pata_nr_24.jpeg",
] 



function changeImageAndBackImages(event) {
    baralho.forEach(function(image) {
        image.classList.remove('clicked');
    });
    if (event.target.id === 'baralho-1') {
        event.target.classList.add('clicked');
        backImages_1 = newbackImages_1;
        backImages1 = newbackImages_1.concat(newbackImages_1); //duplica as backcards
        document.getElementById('gato_lapis').src = "../Imagens/jogo/gato_jogo.png"; //changes the src of gato_lapis
        myAudio.src = "../Audio/Cute Cat-[AudioTrimmer.com].mp3";
        myAudio.play();
        
        for(let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            // If the element's color is red, change it to blue
            if (computedStyle.color === 'rgb(128, 0, 128)') {
                allElements[i].style.color = 'red';
            }
            // If the element's border color is red, change it to blue
            if (computedStyle.borderColor === 'rgb(128, 0, 128)') {
                allElements[i].style.borderColor = 'red';
            }
        
            // If the element's background color is red, change it to blue
            if (computedStyle.backgroundColor === 'rgb(128, 0, 128)') {
                allElements[i].style.backgroundColor = 'red';
            }
            if (allElements[i].id === 'baralho-2') {
                allElements[i].style.borderColor = 'black';
            }
        }
    }
    if (event.target.id === 'baralho-2') {
        event.target.classList.add('clicked');
        backImages_1 = backImages_2;
        backImages1 = backImages_1.concat(backImages_1); //duplica as backcards
        document.getElementById('gato_lapis').src = "../Imagens/jogo/deck2/carta-caras.png";; //changes the src of gato_lapis
        myAudio.src = "../Audio/Late-at-Night(chosic.com).mp3";
        myAudio.play();

        event.target.style.borderColor = 'purple';
        // Loop through all elements
        for(let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
        
            // If the element's color is red, change it to blue
            if (computedStyle.color === 'rgb(255, 0, 0)') {
                allElements[i].style.color = 'purple';
            }
        
            // If the element's border color is red, change it to blue
            if (computedStyle.borderColor === 'rgb(255, 0, 0)') {
                allElements[i].style.borderColor = 'purple';
            }
        
            // If the element's background color is red, change it to blue
            if (computedStyle.backgroundColor === 'rgb(255, 0, 0)') {
                allElements[i].style.backgroundColor = 'purple';
            }
        }

        for (let i = 0; i < cards.length; i++) {
            cards[i].querySelector('.cards-back img').src = backImages1[i];
        }
    }
    if (event.target.id === 'baralho-3') {
        event.target.classList.add('clicked');
        backImages_1 = backImages_3;
        backImages1 = backImages_1.concat(backImages_1); //duplica as backcards
        document.getElementById('gato_lapis').src = "../Imagens/jogo/deck3/pingu-passaros.jpg"; //changes the src of gato_lapis
        document.getElementById('gato_lapis').style.cssText = "margin-top: 5%;"
        myAudio.src = "../Audio/Harvest Moon_ Back to Nature.mp3";
        myAudio.play();



        for (let i = 0; i < cards.length; i++) {
            cards[i].querySelector('.cards-back img').src = backImages1[i];
        }
    }
    }


    function storeDeckInputs() {      //guarda o numero inserido no input
        numbColunas = Number(document.getElementById('val_col').value);
        numbCards = Number(document.getElementById('val_cartas').value);

        if (isNaN(numbCards) || numbCards % 2 !== 0 || numbCards < 4 || numbCards > 24) {
            alert('Por favor insira um número par, maior que 3 e menor que 25.');
            alertRaised = true;
        } else if (isNaN(numbColunas) || numbColunas/3 < 1 || numbColunas/3 > 7) {
            alert('Por favor insira um número entre 3 e 7');
            alertRaised = true;
        } else {
            backImages1 = backImages_1.slice(0, numbCards/2).concat(backImages_1.slice(0, numbCards/2));
            max_pontos.textContent = numbCards / 2;
            numbLinhas = Math.ceil(numbCards / numbColunas);
            tabuleiro.style.gridTemplateRows = `repeat(${numbLinhas}, auto)`;
            tabuleiro.style.gridTemplateColumns = `repeat(${numbColunas}, auto)`;
            alertRaised = false;  
            cardContainer.innerHTML = '';
    
            addCards(backImages1, frontImages1);
        }}
