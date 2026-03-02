// Elementos del DOM
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('i');
const volumeSlider = document.getElementById('volume-slider');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const fileInput = document.getElementById('file-input');

// 1. FUNCIONAMIENTO DEL BOTÓN PLAY/PAUSA
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(err => console.log("Error al reproducir: ", err));
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
});

// 2. CONTROL DE VOLUMEN
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// 3. CAMBIO DE MODO (RADIO VS MP3)
window.changeSource = function(mode) {
    // Resetear botones
    document.getElementById('btn-radio').classList.remove('active-mode');
    document.getElementById('btn-mp3').classList.remove('active-mode');

    if (mode === 'radio') {
        document.getElementById('btn-radio').classList.add('active-mode');
        audio.src = "https://stream.zeno.fm/f3wvbb76v09uv"; // Tu link de radio
        trackTitle.textContent = "Lo-Fi Trading";
        trackArtist.textContent = "Radio Online 24/7";
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        document.getElementById('btn-mp3').classList.add('active-mode');
        fileInput.click(); // Abre el selector de archivos
    }
}

// 4. CARGAR ARCHIVO MP3 LOCAL
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.src = url;
        trackTitle.textContent = file.name.replace('.mp3', '');
        trackArtist.textContent = "Archivo Local";
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    }
});




