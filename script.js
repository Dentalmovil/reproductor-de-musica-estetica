// --- CONFIGURACIÓN Y VARIABLES GLOBALES ---
let precioObjetivo = localStorage.getItem('alertaBTC') ? parseFloat(localStorage.getItem('alertaBTC')) : null;

// --- 1. LÓGICA DE PRECIOS Y GRÁFICA ---
async function actualizarPrecios() {
    try {
        const res = await fetch('/api/get-prices');
        const data = await res.json();
        
        // Actualizar Balance Principal (basado en BTC)
        const btcPrice = data.bitcoin.usd;
        document.getElementById('total-balance').textContent = `$${btcPrice.toLocaleString()}`;

        // Lista de Criptos con Logotipos
        const cryptoList = document.getElementById('crypto-list');
        if (cryptoList) {
            cryptoList.innerHTML = '';
            const coins = [
                { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
                { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
                { id: 'solana', symbol: 'SOL', name: 'Solana', img: 'https://cryptologos.cc/logos/solana-sol-logo.png' }
            ];

            coins.forEach(coin => {
                const price = data[coin.id].usd;
                const change = data[coin.id].usd_24h_change.toFixed(2);
                const card = document.createElement('div');
                card.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#1e2329; padding:12px; border-radius:12px; margin-bottom:10px; border:1px solid #2b3139;";
                card.innerHTML = `
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${coin.img}" style="width:28px; height:28px;">
                        <div>
                            <strong style="display:block; font-size:14px;">${coin.name}</strong>
                            <small style="color:#848e9c;">${coin.symbol}</small>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:bold; font-size:14px;">$${price.toLocaleString()}</div>
                        <small style="color: ${change >= 0 ? '#00ffcc' : '#ff4d4d'};">
                            ${change >= 0 ? '+' : ''}${change}%
                        </small>
                    </div>`;
                cryptoList.appendChild(card);
            });
        }

        // Verificación de Alerta
        if (precioObjetivo && btcPrice >= precioObjetivo) {
            alert(`🚀 ¡ALERTA! Bitcoin ha alcanzado los $${precioObjetivo}`);
            precioObjetivo = null;
            localStorage.removeItem('alertaBTC');
            document.getElementById('alert-status').textContent = "No hay alertas activas";
        }

    } catch (error) {
        console.error("Error en precios:", error);
    }
}

// --- 2. LÓGICA DE NOTICIAS ---
async function obtenerNoticias() {
    const newsList = document.getElementById('news-list');
    try {
        const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const data = await res.json();
        newsList.innerHTML = '';
        data.Data.slice(0, 5).forEach(noticia => {
            const item = document.createElement('div');
            item.className = 'news-item';
            item.innerHTML = `
                <a href="${noticia.url}" target="_blank" style="text-decoration:none; color:inherit;">
                    <h4 style="color:#00ffcc;">${noticia.title}</h4>
                    <small>${noticia.source}</small>
                </a>`;
            newsList.appendChild(item);
        });
    } catch (e) { newsList.innerHTML = "<p>Error al cargar noticias</p>"; }
}

// --- 3. REPRODUCTOR DE MÚSICA ---
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const volumeSlider = document.getElementById('volume-slider');

if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
}
if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; });
}

// --- 4. NAVEGACIÓN ---
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.app-section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        sections.forEach(s => s.style.display = 'none');
        document.getElementById(target).style.display = 'block';
        if (target === 'view-news') obtenerNoticias();
    });
});

// --- 5. BOTÓN DE ALERTA ---
document.getElementById('set-alert-btn').addEventListener('click', () => {
    const val = parseFloat(document.getElementById('target-price').value);
    if (val > 0) {
        precioObjetivo = val;
        localStorage.setItem('alertaBTC', val);
        document.getElementById('alert-status').innerHTML = `🔔 Alerta en: <strong>$${val}</strong>`;
        alert("Alerta guardada");
    }
});

// Inicialización
actualizarPrecios();
setInterval(actualizarPrecios, 30000);


