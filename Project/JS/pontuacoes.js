//-------------ITW23/24 - Grupo 39 -------------//
//------------- Iolanda Leal 48069 -------------//
//------------- José Medeiros 58607 ------------//
//-------------Rita Wang 57143 -----------------//
//---------------------------------------------//

var modoClassicoBtn = document.getElementById('modo-classico-btn');
modoClassicoBtn.addEventListener('click', function() {
    document.getElementById('lugar').innerHTML = 'Lugar';
    document.getElementById('nome').innerHTML = 'Nome do Jogador';
    document.getElementById('tipo').innerHTML = 'Pontos';
});

var modoContraTempoBtn = document.getElementById('modo-contra-tempo-btn');
modoContraTempoBtn.addEventListener('click', function() {
    document.getElementById('lugar').innerHTML = 'Lugar';
    document.getElementById('nome').innerHTML = 'Nome do Jogador';
    document.getElementById('tipo').innerHTML = 'Tempo';
});

var modoTrioBtn = document.getElementById('modo-trio-btn');
modoTrioBtn.addEventListener('click', function() {
    document.getElementById('lugar').innerHTML = 'Lugar';
    document.getElementById('nome').innerHTML = 'Nome do Jogador';
    document.getElementById('tipo').innerHTML = 'Pontos';
});



