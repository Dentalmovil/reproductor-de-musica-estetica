// Seleccionamos los elementos
const playBtn = document.getElementById('play');
const audio = new Audio('musica.mp3'); // Asegúrate de tener un archivo llamado musica.mp3
let isPlaying = false;

// Función para reproducir/pausar
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        playBtn.innerText = '⏸ Pause';
        isPlaying = true;
    } else {
        audio.pause();
        playBtn.innerText = '▶ Play';
        isPlaying = false;
    }
});
