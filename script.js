const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const albumArt = document.getElementById('album-art');
const volumeSlider = document.getElementById('volume-slider');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const fileInput = document.getElementById('file-input');

// Play / Pausa
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.classList.remove('playing');
    }
});

// Control de Volumen
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Cambio de Fuente (Radio o MP3)
function changeSource(mode) {
    document.getElementById('btn-radio').classList.remove('active-mode');
    document.getElementById('btn-mp3').classList.remove('active-mode');

    if (mode === 'radio') {
        document.getElementById('btn-radio').classList.add('active-mode');
        audio.src = "https://stream.zeno.fm/f3wvbb76v09uv";
        trackTitle.innerText = "Lo-Fi Trading";
        trackArtist.innerText = "Radio Online 24/7";
        audio.play();
    } else {
        document.getElementById('btn-mp3').classList.add('active-mode');
        fileInput.click(); // Abrir selector de archivos
    }
}

// Cargar archivo MP3 local
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.src = url;
        trackTitle.innerText = file.name.replace('.mp3', '');
        trackArtist.innerText = "Archivo Local";
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.classList.add('playing');
    }
});




