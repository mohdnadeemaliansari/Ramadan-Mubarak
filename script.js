// Highlight Today Row
function highlightToday() {
    const rows = document.querySelectorAll("#ramadan-calendar tbody tr");
    const today = new Date().toDateString();

    rows.forEach(row => {
        const dateText = row.cells[0].innerText;
        const rowDate = new Date(dateText).toDateString();

        if (today === rowDate) {
            row.classList.add("today-highlight");
        }
    });
}
highlightToday();


// Countdown Timer
function countdownTimer() {
    const now = new Date();

    let sehriTime = new Date();
    sehriTime.setHours(5, 0, 0);

    let iftarTime = new Date();
    iftarTime.setHours(18, 0, 0);

    let targetTime;
    let prayerName;

    if (now < sehriTime) {
        targetTime = sehriTime;
        prayerName = "Sehri Ends (Fajr)";
    } else if (now < iftarTime) {
        targetTime = iftarTime;
        prayerName = "Iftar Time (Maghrib)";
    } else {
        sehriTime.setDate(sehriTime.getDate() + 1);
        targetTime = sehriTime;
        prayerName = "Next Sehri (Fajr)";
    }

    const diff = targetTime - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown-timer").innerHTML =
        `<b>${prayerName}</b> in: ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(countdownTimer, 1000);
countdownTimer();


// Download Calendar PDF (FULL 30 DAYS)
function downloadCalendar() {
    const element = document.getElementById("ramadan-calendar");

    const options = {
        margin: 0.3,
        filename: "Ramadan_Calendar_2026.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
            scale: 3,
            scrollY: 0,
            useCORS: true
        },
        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        },
        pagebreak: { mode: ["css", "legacy"] }
    };

    html2pdf().set(options).from(element).save();
}


// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


// Ramadan Mubarak Popup (Show Every Time Reload)
window.onload = function () {
    document.getElementById("ramadanPopup").style.display = "flex";
};


// Close Popup Function
function closePopup() {
    document.getElementById("ramadanPopup").style.display = "none";
}


// Play Dua Audio Function (Only one audio plays at a time)
function playDua(audioId) {
    const allAudios = document.querySelectorAll("audio");

    // Stop all audios
    allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    // Play selected dua audio
    const selectedAudio = document.getElementById(audioId);
    selectedAudio.play();
}
