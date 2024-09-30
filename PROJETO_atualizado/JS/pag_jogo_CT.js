//-------------ITW23/24 - Grupo 39 -------------//
//------------- Iolanda Leal 48069 -------------//
//------------- José Medeiros 58607 ------------//
//-------------Rita Wang 57143 -----------------//
//---------------------------------------------//

let game = {
    startTime: null,
    timerInterval: null,
    started: false,
    paused: false,
    pontos1: 0,
    trys1: 0,
    max_pontos : Number(max_pontos.textContent),
    flippedCards: [],
    isComparing: false,
    startTime: null,
    timerInterval: null,
    temporizadorTempoRestante: null
};

function initialVals() {  // valores inciais quando se da load a pagina
    game.pontos1 = 0;
    game.trys1 = 0;
    game.startTime = '00:00';
    game.max_pontos = numbCards/2;
    pontos.textContent = game.pontos1;
    trys.textContent = game.trys1;
    tempo.textContent = game.startTime;
}

function shuffleArray(array) {   //shuffle nas cartas
    // Iterate from the last element down to the second element
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random integer between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
}


function createCard(id, backImage,frontImage) {  //cria as cartas e da um id a cada carta
    const container = document.createElement('div');
    container.classList.add('jogo-carta-container');   //jogo-carta-container
    const card = document.createElement('div');
    card.classList.add('container-card'); //container-card
    card.id = id;

    const front = document.createElement('div');
    front.classList.add('cards-front');  //card-front
    const frontImg = document.createElement('img');
    frontImg.src = frontImage;
    front.appendChild(frontImg);

    const back = document.createElement('div');
    back.classList.add('cards-back');  //card-back
    const backImg = document.createElement('img');
    backImg.src = backImage;
    back.appendChild(backImg);

    card.appendChild(front);
    card.appendChild(back);

    container.appendChild(card);

    container.addEventListener('click', function(event) {flipCard(card)});  //está aqui para ser atribuido a cada carta

    return container;
}

function addCards(backImages,frontImages) { // adiciona as cartas ao baralho
    const shuffledBack = shuffleArray(backImages)
    for (let i = 0; i < numbCards; i++) {
        let id = i + 1;
        let backImage =shuffledBack[i];
        let frontImage = frontImages[i];
        let card = createCard(id, backImage,frontImage);
        cardContainer.appendChild(card);
    }
}

function flipCard(card) {

    if (game.paused || card.classList.contains('flipped') || game.isComparing || !(game.started)) {  //se tiver a class flipped ou estiverem a ser comparadas 2 cartas n faz nada
        return; 
    }

    card.style.transform = "rotateY(180deg)";       //se nao, roda e adiciona a classe flip
    card.classList.add('flipped');

    game.flippedCards.push(card);

    if (game.flippedCards.length === 2) {
        game.isComparing = true;                      // 2 cartas a serem comparadas, impede de se selecionar 3 ao mm tempo
        compareFlippedCards(game.flippedCards[0],game.flippedCards[1]);
    }

    function compareFlippedCards(card1,card2) { // verifica se as cartas sao iguais

        if (card1.querySelector('.cards-back img').src === card2.querySelector('.cards-back img').src) {   //card-back
            setTimeout(() => {
                card1.style.visibility = "hidden"; //se forem, desparecem
                card2.style.visibility = "hidden";
            }, 2000);
            game.max_pontos = Number(max_pontos.textContent);
            game.pontos1 = game.pontos1 + 1;
            game.max_pontos = game.max_pontos - 1;
            pontos.textContent = game.pontos1;
            max_pontos.textContent = game.max_pontos;
                pontos.classList.add('grow-shrink-color');  //animação quando + 1 ponto (adiciona classe)
                setTimeout(() => {
                    pontos.classList.remove('grow-shrink-color');
                }, 500);
                game.trys1 = game.trys1 + 1;
                trys.textContent = game.trys1;
    
                game.flippedCards = [];
                game.isComparing = false;
            
            if (0 === game.max_pontos) {
                    // Save game stats in localStorage
                    trataNovoClassico();
                    stopTimer();
                    startPauseButton.disabled = true;
                    startPauseButton.style.visibility = 'hidden';
                    let now = Date.now();
                    let elapsedTime = Math.floor((now - game.startTime) / 1000);
                    
                    let minutes = Math.floor(elapsedTime / 60);
                    let seconds = elapsedTime % 60;

                    let formattedMinutes = minutes.toString().padStart(2, '0');
                    let formattedSeconds = seconds.toString().padStart(2, '0');

                    tempo.textContent = `${formattedMinutes}:${formattedSeconds}`;
                    tabuleiro.display = 'none';
                    tabuleiro.innerHTML = `
                    <div>
                        <h2 class="h2-center">YEYYYYY YOU WON!!</h2>

                        <img id="gato-fim-jogo"src="../Imagens/jogo/giphy.gif">
                
                        <div class="buttons-pause">
                            <a href="pag_jogo_classico.html" title="Leave Game"><button id="again-btn" class="botao-geral"> Jogar Novamente</button></a>
                        </div>
                    </div>
                    `
                    
        }
        } 
        else {  // se nao forem iguais
            game.trys1 = game.trys1 + 1;
            trys.textContent = game.trys1;
            setTimeout(function() {flipCardsBack(card1,card2)},1500); //cartas viram outra vez pra baixo
            
        }
    }
}

function flipCardsBack(card1, card2) {  //vira as cartas pra baixo
    card1.style.transform = "rotateY(0deg)";
    card1.classList.remove('flipped');
    card2.style.transform = "rotateY(0deg)";
    card2.classList.remove('flipped');
    game.flippedCards = [];
    game.isComparing = false;
}

function storeNumber() { //guarda o numero inserido no input
    let numberInput = document.getElementById('numb').value;
    let carta = document.getElementById(numberInput);
    if (carta) {
        flipCard(carta)  //se for valido, chama a flipCard
      }
}

function countdownTimer() {
    let selectedDuration = maxDuration * 60 * 1000;

    // Start the countdown timer
    let time = Date.now();
    game.temporizadorTempoRestante = setInterval(function() {
        let elapsedTime = Date.now() - time;
        let remainingTime = selectedDuration - elapsedTime;

        // Check if time's up
        if (remainingTime <= 0) {
            stopTimer();
            document.getElementById('timer').innerHTML = "Time\'s UP!"             
            if (game.max_pontos !== 0){
                startPauseButton.disabled = true;
                startPauseButton.style.visibility = 'hidden';
                tabuleiro.display = 'none';
                tabuleiro.innerHTML = `
                    <div>
                        <h2 class="h2-center"> Corre melhor para a próxima! </h2>

                        <img id="gato-fim-jogo"src="../Imagens/jogo/lose.jpg">
                
                        <div class="buttons-pause">
                            <a href="pag_jogo_contra-tempo.html" title="Leave Game"><button id="again-btn" class="botao-geral"> Jogar Novamente</button></a>
                        </div>
                    </div>
                    `

            }
        } else if (remainingTime > 0 && game.max_pontos === 0){
            stopTimer();
            startPauseButton.disabled = true;
            startPauseButton.style.visibility = 'hidden';
            tabuleiro.display = 'none';
            tabuleiro.innerHTML = `
                <div>
                    <h2 class="h2-center">YEYYYYY YOU WON!!</h2>

                    <img id="gato-fim-jogo"src="../Imagens/jogo/giphy.gif">
                
                    <div class="buttons-pause">
                        <a href="pag_jogo_contra-tempo.html" title="Leave Game"><button id="again-btn" class="botao-geral"> Jogar Novamente</button></a>
                    </div>
                </div>
                    `
        }

        // Convert remaining time to minutes, seconds, and milliseconds
        let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        let seconds = Math.floor((remainingTime / 1000) % 60);
        let milliseconds = Math.floor(remainingTime % 1000);

            
        // Update the timer display
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2,'0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2,'0');
        document.getElementById('milliseconds').innerHTML = milliseconds.toString().padStart(2,'0');
    }, 100);

}

function stopTimer() {
    clearInterval(game.temporizadorTempoRestante);
    document.getElementById('minutes').innerHTML = '0'.padStart(0,'0');
    document.getElementById('seconds').innerHTML = '0'.padStart(2,'0');
    document.getElementById('milliseconds').innerHTML = '0'.padStart(2,'0');
}


function start() {
    
    if (game.started && !game.paused) {

        handleGameGiveUp();

    } else {

        handleGameStart();
    }
    
}


function handleGameStart() {
    game.started = true;   
    game.paused = false;

    //Disable the pause button initially
    startPauseButton.disabled = true;

    setTimeout(() => {
        game.startTime = Date.now();
        game.timerInterval = countdownTimer();

        //Enable the pause button after 1 second
        startPauseButton.disabled = false;
    }, 3000);        

    startPauseButton.textContent = "GIVE UP";
}


function handleGameGiveUp() {
    game.paused = true;
    startPauseButton.parentNode.href = "#popup-giveup-CT";
    document.getElementById('popup-giveup-CT').style.display = 'block';
    stopTimer()
}


function shuffleCardsAnimation() {
    let cardsArray = Array.from(document.querySelectorAll('.jogo-carta-container'));
    let newPositions1 = [...cardsArray].sort(() => Math.random() - 0.5);
    let newPositions2 = [...cardsArray].sort(() => Math.random() - 0.5);

    countdown.style.display = 'block';
    
    for (let i = 0; i < cardsArray.length; i++) {
        let card = cardsArray[i];

        let x1 = newPositions1[i].offsetLeft - card.offsetLeft;
        let y1 = newPositions1[i].offsetTop - card.offsetTop;

        card.style.transition = "transform 1s ease";
        card.style.transform = `translate(${x1}px, ${y1}px)`;

        setTimeout(() => {
            let x2 = newPositions2[i].offsetLeft - card.offsetLeft;
            let y2 = newPositions2[i].offsetTop - card.offsetTop;
            card.style.transition = "transform 1s ease";
            card.style.transform = `translate(${x2}px, ${y2}px)`;
        }, 1000);

        setTimeout(() => {
            card.style.transition = "transform 1s ease";
            card.style.transform = "none";
            setTimeout(() => {
                countdown.textContent = 'Boa sorte!';
                setTimeout(() => {
                    countdown.style.display = 'none';
                    countdown.textContent = 'A baralhar cartas...';
                }, 1200);
            }, 1000);
        }, 2000);
    }
}


function handleClick(event) {   // funcao esta na outra pagina
    changeImageAndBackImages(event);
    startPauseButton.textContent = "START";
}


function changeCardSize() {
    let mediaQuery1200 = window.matchMedia("(min-width: 1200px)");
    let mediaQuery769_1200 = window.matchMedia("(min-width: 769px) and (max-width: 1200px)");

    let elements = document.querySelectorAll('.jogo-carta-container');
    if (numbColunas === 7 && mediaQuery1200.matches) {   
           elements.forEach(element => {
            element.style.width = '6.3rem';
            element.style.height = '6.3rem';
        });}
    else if (numbColunas === 7 && mediaQuery769_1200.matches) {
        
        elements.forEach(element => {
            element.style.width = '5rem';
            element.style.height = '5rem';
        });}

        else {
            elements.forEach(element => {
                element.style.width = '';
                element.style.height = '';
            });}
}


function okDecksFinal(){
    //buttonImg.src = "../Imagens/jogo/pausa.png"
    storeDeckInputs();

    game.pontos1 = 0;
    game.trys1 = 0;
    stopTimer();
    game.max_pontos = baralho.length/2;
    pontos.textContent = game.pontos1;
    trys.textContent = game.trys1;
    let popup = document.getElementById('popup-baralho');
    if (!alertRaised){
    popup.style.display = 'none';
    game.started = false;
    game.paused = false;
    startPauseButton.textContent = "START";
    window.history.back();}
    changeCardSize();

}

function eventsListeners(){

    oneMinBtn.addEventListener('click', function(){
        maxDuration = 1
        document.getElementById(minutes).innerHTML = '1'.padStart(2, '0');
        document.getElementById('popup-comeco-CT').style.display = 'none';
        shuffleCardsAnimation();
    })

    twoMinBtn.addEventListener('click', function(){
        maxDuration = 2
        document.getElementById(minutes).innerHTML = '2'.padStart(2, '0');
        document.getElementById('popup-comeco-CT').style.display = 'none';
        shuffleCardsAnimation();
    })

    threeMinBtn.addEventListener('click', function(){
        maxDuration = 3
        document.getElementById(minutes).innerHTML = '3'.padStart(2, '0');
        document.getElementById('popup-comeco-CT').style.display = 'none';
        shuffleCardsAnimation();
    })

    okButton.addEventListener('click',storeNumber);
    startPauseButton.addEventListener('click',start);
    okDecks.addEventListener('click',okDecksFinal);
    document.getElementById('deck').addEventListener('click', function() {
        buttonImg.src = "../Imagens/jogo/pausa.png"
        document.querySelector('#popup-baralho').style.display = 'block';
    });  
} 


function mainFunction(){
    eventsListeners();
    initialVals();
    for (let i = 0; i < baralho.length; i++) {
        baralho[i].addEventListener('click', handleClick);
}
addCards(backImages1,frontImages1);

}

window.onload = mainFunction