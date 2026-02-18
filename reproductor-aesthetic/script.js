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
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

themeBtn.addEventListener('click', () => {
    // Esto quita o pone la clase 'vaporwave' al body
    body.classList.toggle('vaporwave');
    
    // Cambiamos el texto del botón según el modo
    if (body.classList.contains('vaporwave')) {
        themeBtn.innerText = '🌸 Modo Pastel';
    } else {
        themeBtn.innerText = '✨ Modo Vaporwave';
    }
});
// Usamos links directos de internet
const songs = ['https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73430.mp3'];
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
];
let songIndex = 0;

// IMPORTANTE: Cambiamos esta línea para que use el link directo sin agregar ".mp3"
const audio = new Audio(songs[songIndex]);

// Actualiza también la función de cargar canción
function loadSong(index) {
    audio.src = songs[index]; // Ya no ponemos + ".mp3"
    if (isPlaying) audio.play();
}

const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// Función para cargar canción
function loadSong(index) {
    audio.src = `${songs[index]}.mp3`;
    if (isPlaying) audio.play();
}

// Eventos para botones
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
});


