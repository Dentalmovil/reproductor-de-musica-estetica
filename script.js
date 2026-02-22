// --- CONFIGURACIÓN Y VARIABLES GLOBALES ---
let precioObjetivo = localStorage.getItem('alertaBTC') ? parseFloat(localStorage.getItem('alertaBTC')) : null;

// --- 1. LÓGICA DE PRECIOS Y GRÁFICA ---
async function actualizarPrecios() {
    try {
        const res = await fetch('/api/get-prices');
        const data = await res.json();
        
        // 1. Actualizar Balance Principal
        const btcPrice = data.bitcoin.usd;
        const balanceElement = document.getElementById('total-balance');
        if (balanceElement) {
            balanceElement.textContent = `$${btcPrice.toLocaleString()}`;
        }

        // 2. Lista de Criptos (Asegurando que el contenedor exista)
        const cryptoList = document.getElementById('crypto-list');
        if (cryptoList) {
            cryptoList.innerHTML = ''; // Limpiar el "Cargando..."

            const coins = [
                { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
                { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', img: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
                { id: 'solana', symbol: 'SOL', name: 'Solana', img: 'https://cryptologos.cc/logos/solana-sol-logo.png' }
            ];

            coins.forEach(coin => {
                const price = data[coin.id].usd;
                const change = data[coin.id].usd_24h_change.toFixed(2);
                
                const card = document.createElement('div');
                // Estilo en línea para asegurar que se vea con el fondo oscuro
                card.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#1e2329; padding:15px; border-radius:12px; margin-bottom:12px; border:1px solid #2b3139;";
                
                card.innerHTML = `
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${coin.img}" alt="${coin.name}" style="width:30px; height:30px;">
                        <div>
                            <strong style="display:block; color:#ffffff; font-size:14px;">${coin.name}</strong>
                            <small style="color:#848e9c; font-size:12px;">${coin.symbol}</small>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:bold; color:#ffffff; font-size:15px;">$${price.toLocaleString()}</div>
                        <small style="color: ${change >= 0 ? '#00ffcc' : '#ff4d4d'}; font-size:12px; font-weight:bold;">
                            ${change >= 0 ? '▲' : '▼'} ${Math.abs(change)}%
                        </small>
                    </div>
                `;
                cryptoList.appendChild(card);
            });
        }

        // 3. Revisar Alertas
        if (precioObjetivo && btcPrice >= precioObjetivo) {
            alert(`🚀 ¡Bitcoin llegó a tu meta de $${precioObjetivo}!`);
            precioObjetivo = null;
            localStorage.removeItem('alertaBTC');
            document.getElementById('alert-status').textContent = "No hay alertas activas";
        }

    } catch (error) {
        console.error("Error cargando precios:", error);
        const cryptoList = document.getElementById('crypto-list');
        if (cryptoList) cryptoList.innerHTML = '<p style="color:red;">Error de conexión</p>';
    }
}



