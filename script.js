document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURATION ---
    // Change the date and time of the event here:
    // Format: YYYY-MM-DDTHH:MM:SS (in 24h format)
    const EVENT_DATE_STR = '2026-07-04T19:30:00';
    const EVENT_DATE = new Date(EVENT_DATE_STR);
    
    // Format the date dynamically for display
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = EVENT_DATE.toLocaleDateString('es-ES', dateOptions);
    // Capitalize first letter
    const displayDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    
    const eventDateTextEl = document.getElementById('eventDateText');
    if (eventDateTextEl) {
        eventDateTextEl.textContent = displayDate;
    }

    // --- COUNTDOWN TIMER ---
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const difference = EVENT_DATE - now;

        if (difference <= 0) {
            // Event has passed or started
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            clearInterval(countdownInterval);
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = d < 10 ? '0' + d : d;
        if (hoursEl) hoursEl.textContent = h < 10 ? '0' + h : h;
        if (minutesEl) minutesEl.textContent = m < 10 ? '0' + m : m;
        if (secondsEl) secondsEl.textContent = s < 10 ? '0' + s : s;
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // --- BACKGROUND MUSIC ---
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Use a soft, elegant instrumental lullaby
    if (bgMusic) {
        bgMusic.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'; // soft, relaxing song
        bgMusic.volume = 0.3; // Low volume background music
    }

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('i').className = 'fas fa-music';
            } else {
                // Play music (might be blocked by browser policy until user interacts, which is handled here)
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicToggle.querySelector('i').className = 'fas fa-pause';
                }).catch(err => {
                    console.log("Audio playback was prevented by browser auto-play policy.", err);
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // --- FADE IN ON SCROLL ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- RSVP FORM LOGIC REMOVED (DIRECT WHATSAPP CONFIRMATION USED) ---

    // --- ADD TO CALENDAR LINK ---
    const addToCalendarBtn = document.getElementById('addToCalendarBtn');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', () => {
            const title = encodeURIComponent('Baby Shower de Mateo José 🍼');
            // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
            // Let's create calendar date in local Peruvian time (since event is in Lima)
            // Event is July 4, 2026, from 7:30 PM (19:30) to 11:00 PM (23:00)
            const startDateStr = '20260704T193000';
            const endDateStr = '20260704T230000';
            const details = encodeURIComponent('¡Acompáñanos a celebrar la dulce espera de Mateo José! Organizado por Yeraldine Tarmeño y Anthony Chavez.');
            const location = encodeURIComponent('Jr. Coronel León Velarde 799-701, Lince, Lima, Perú');
            
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateStr}/${endDateStr}&details=${details}&location=${location}`;
            
            window.open(googleCalendarUrl, '_blank');
        });
    }
});
