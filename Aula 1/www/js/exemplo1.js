function carregou() {
    var campoSaida = document.getElementById('saida');
    campoSaida.innerHTML = 'A página carregou!';
}

function onPause() {
    var campoSaida = document.getElementById('saida');
    campoSaida.innerHTML += '<br>Pausou!';
}

function onResume() {
    var campoSaida = document.getElementById('saida');
    campoSaida.innerHTML += '<br> Iniciou!';
}


document.addEventListener('deviceready', main, false);
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

function main() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
