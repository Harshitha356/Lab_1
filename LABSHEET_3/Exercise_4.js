document.addEventListener('DOMContentLoaded', () => {
    
    let activityLog = []; 
    let clickCount = 0;
    let lastClickTime = 0;
    let logIdCounter = 1;

    const logContainer = document.getElementById('logContainer');
    const warningBanner = document.getElementById('warning-banner');
    const exportBtn = document.getElementById('exportBtn');
    const resetBtn = document.getElementById('resetBtn');

    function logActivity(type, target, details) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = {
            id: logIdCounter++,
            time: timestamp,
            type: type,
            target: (target.tagName ? target.tagName.toLowerCase() : 'document') + (target.id ? `#${target.id}` : ''),
            details: details
        };

        activityLog.push(entry);

        const row = document.createElement('div');
        row.className = 'log-entry';
        let typeClass = 'type-click';
        if (type === 'keydown') typeClass = 'type-keydown';
        if (type === 'focus') typeClass = 'type-focus';
        if (type === 'WARNING') typeClass = 'type-warning';

        row.innerHTML = `
            <span>${entry.time}</span>
            <span class="${typeClass}">${type.toUpperCase()}</span>
            <span>${entry.target}</span>
            <span>${entry.details}</span>
        `;
    
        const emptyState = document.querySelector('.empty-state');
        if(emptyState) emptyState.remove();
        logContainer.insertBefore(row, logContainer.firstChild);
        if (logContainer.children.length > 50) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }
    document.addEventListener('click', (e) => {
    
        if (e.target.closest('.monitor-zone')) return;

        logActivity('click', e.target, `Coordinates: (${e.clientX}, ${e.clientY})`);
        
        detectSuspiciousActivity();
    });
    document.addEventListener('keydown', (e) => {
        logActivity('keydown', e.target, `Key: "${e.key}"`);
    });
    document.addEventListener('focus', (e) => {
        logActivity('focus', e.target, 'Input gained focus');
    }, { capture: true });

    function detectSuspiciousActivity() {
        const currentTime = Date.now();
        if (currentTime - lastClickTime > 1000) {
            clickCount = 0;
            warningBanner.classList.add('hidden');
        }

        lastClickTime = currentTime;
        clickCount++;

        if (clickCount > 5) {
            warningBanner.classList.remove('hidden');
            logActivity('WARNING', document.body, 'Rapid clicking detected!');
        }
    }


    resetBtn.addEventListener('click', () => {
        activityLog = []; 
        logContainer.innerHTML = '<div class="empty-state">Log cleared. Waiting for activity...</div>';
        warningBanner.classList.add('hidden');
        clickCount = 0;
    });

    exportBtn.addEventListener('click', () => {
        if (activityLog.length === 0) {
            alert("No activity to export.");
            return;
        }
        const fileContent = activityLog.map(log => 
            `[${log.time}] ${log.type.toUpperCase()} on <${log.target}>: ${log.details}`
        ).join('\n');
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'activity-log.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

});