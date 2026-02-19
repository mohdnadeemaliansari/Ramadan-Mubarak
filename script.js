// Countdown Timer (Sehri / Iftar)
function countdownTimer() {
    const timerElement = document.getElementById("countdown-timer");

    // If countdown element not available on this page
    if (!timerElement) return;

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

    timerElement.innerHTML =
        `<b>${prayerName}</b> in: ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(countdownTimer, 1000);
countdownTimer();


// Download Calendar PDF (Only works on timings page)
function downloadCalendar() {
    const element = document.getElementById("ramadan-calendar");

    if (!element) {
        alert("Calendar not found on this page!");
        return;
    }

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


// Ramadan Mubarak Popup
window.onload = function () {
    const popup = document.getElementById("ramadanPopup");
    if (popup) {
        popup.style.display = "flex";
    }

    highlightToday();
};


// Close Popup
function closePopup() {
    const popup = document.getElementById("ramadanPopup");
    if (popup) {
        popup.style.display = "none";
    }
}


// Highlight Today Row in Calendar
function highlightToday() {
    const rows = document.querySelectorAll("#ramadan-calendar tbody tr");

    if (!rows.length) return;

    const today = new Date().toDateString();

    rows.forEach(row => {
        const dateText = row.cells[0].innerText;
        const rowDate = new Date(dateText).toDateString();

        if (today === rowDate) {
            row.classList.add("today-highlight");
        }
    });
}


// Play Dua Audio Function (Only one audio plays at a time)
function playDua(audioId) {
    const allAudios = document.querySelectorAll("audio");

    allAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    const selectedAudio = document.getElementById(audioId);

    if (selectedAudio) {
        selectedAudio.play();
    }
}


// Tasbih Counter
// ======================================
// TASBIH COUNTER CODE
// ======================================

let count = 0;

function increaseCount() {
    count++;
    document.getElementById("tasbihCount").innerText = count;
}

function resetCount() {
    count = 0;
    document.getElementById("tasbihCount").innerText = count;
}

function changeTasbih() {
    const select = document.getElementById("tasbihSelect");
    const tasbihName = document.getElementById("tasbihName");
    const customInput = document.getElementById("customTasbihInput");

    let value = select.value;

    if (value === "Custom") {
        customInput.style.display = "block";
        tasbihName.innerText = "Enter your tasbih...";
    } else {
        customInput.style.display = "none";

        if (value === "SubhanAllah") tasbihName.innerText = "SubhanAllah (سُبْحَانَ ٱللَّٰه)";
        if (value === "Alhamdulillah") tasbihName.innerText = "Alhamdulillah (ٱلْحَمْدُ لِلَّٰه)";
        if (value === "AllahuAkbar") tasbihName.innerText = "Allahu Akbar (ٱللَّٰهُ أَكْبَر)";
        if (value === "Astaghfirullah") tasbihName.innerText = "Astaghfirullah (أَسْتَغْفِرُ ٱللَّٰه)";
        if (value === "LaIlahaIllallah") tasbihName.innerText = "La ilaha illallah (لَا إِلٰهَ إِلَّا ٱللَّٰه)";
        if (value === "DuroodSharif") tasbihName.innerText = "Durood Sharif (اللَّهُمَّ صَلِّ عَلَى مُحَمَّد)";
        if (value === "Hasbunallah") tasbihName.innerText = "Hasbunallahu wa ni’mal wakeel (حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيل)";
        if (value === "SubhanWabihamdihi") tasbihName.innerText = "SubhanAllahi wa bihamdihi (سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ)";
    }

    resetCount();
}

function updateCustomTasbih() {
    const customText = document.getElementById("customTasbihInput").value;
    const tasbihName = document.getElementById("tasbihName");

    if (customText.trim() === "") {
        tasbihName.innerText = "Enter your tasbih...";
    } else {
        tasbihName.innerText = customText;
    }
}

