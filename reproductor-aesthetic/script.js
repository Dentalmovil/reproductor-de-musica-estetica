const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('i');
const volumeSlider = document.getElementById('volume-slider');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const fileInput = document.getElementById('file-input');
const albumArt = document.getElementById('album-art');

// Función Play/Pausa
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
        albumArt.style.animationPlayState = 'running';
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
        albumArt.style.animationPlayState = 'paused';
    }
});

// Control de volumen
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Cambiar entre Radio y MP3
window.changeSource = function(mode) {
    document.getElementById('btn-radio').classList.remove('active-mode');
    document.getElementById('btn-mp3').classList.remove('active-mode');

    if (mode === 'radio') {
        document.getElementById('btn-radio').classList.add('active-mode');
        audio.src = "https://stream.zeno.fm/f3wvbb76v09uv";
        trackTitle.textContent = "Lo-Fi Trading";
        trackArtist.textContent = "Radio Online 24/7";
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        document.getElementById('btn-mp3').classList.add('active-mode');
        fileInput.click();
    }
}

// Cargar MP3 Local
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



