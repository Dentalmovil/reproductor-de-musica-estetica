
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



