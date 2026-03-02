let offset = 0;

// Fetch Atomic Time from WorldTimeAPI to calculate offset
async function syncTime() {
    try {
        const start = Date.now();
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        const end = Date.now();
        
        // Network delay calculation
        const lat = (end - start) / 2;
        const actualTime = new Date(data.datetime).getTime() + lat;
        offset = actualTime - Date.now();
        
        document.getElementById('offset').innerText = (offset / 1000).toFixed(3) + 's';
    } catch (err) {
        console.log("Sync failed, using system time.");
    }
}

function updateClock() {
    const now = new Date(Date.now() + offset);
    
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('clock').innerText = `${h}:${m}:${s}`;
    
    requestAnimationFrame(updateClock); // Smoother than setInterval
}

// Initialize
syncTime();
updateClock();

// Re-sync every 5 minutes
setInterval(syncTime, 300000);
