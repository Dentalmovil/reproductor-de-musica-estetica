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
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Actualizar barra de progreso y tiempo
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calcular minutos y segundos (formato 0:00)
    const formatTime = (time) => Math.floor(time / 60) + ":" + Math.floor(time % 60).toString().padStart(2, '0');
    
    if (duration) durationEl.innerText = formatTime(duration);
    currentTimeEl.innerText = formatTime(currentTime);
});
