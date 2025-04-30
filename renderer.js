document.getElementById("minimize").addEventListener("click", () => {
    window.electronAPI.minimize();
});

document.getElementById("close").addEventListener("click", () => {
    window.electronAPI.close();
});

const startBtn = document.getElementById("start");
const message = document.getElementById("message");
const timerContainer = document.getElementById("timer-container");
const countdownEl = document.getElementById("countdown");
const gifEl = document.getElementById("gif");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const audioToggleBtn = document.getElementById("audio-toggle");
const audioIcon = audioToggleBtn.querySelector("img");

gifEl.style.display = "none";

const gifs = Array.from({ length: 15 }, (_, i) => `assets/gifs/gif${i + 1}.gif`);

let timeLeft = 10 * 60;
let countdown;
let timerRunning = false;

const bgMusic = new Audio("assets/background.mp3");
bgMusic.loop = true;
bgMusic.play();

const dingSound = new Audio("assets/ding.mp3");

let isMuted = false;

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    countdownEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

minusBtn.addEventListener("click", () => {
    if (!timerRunning && timeLeft > 60) {
        timeLeft -= 5 * 60;
        updateTimerDisplay();
    }
});

plusBtn.addEventListener("click", () => {
    if (!timerRunning) {
        timeLeft += 5 * 60;
        updateTimerDisplay();
    }
});

startBtn.addEventListener("click", () => {
    message.classList.add("hidden");
    startBtn.classList.add("hidden");
    timerContainer.style.display = "flex";
    changeRandomGif();
});

// Start/Stop timer when clicking countdown
countdownEl.addEventListener("click", () => {
    if (!timerRunning) {
        timerRunning = true;
        countdown = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(countdown);
                dingSound.play(); // Play ding sound
                timeLeft = 10 * 60; // Reset timer
                updateTimerDisplay();
                
                timerContainer.style.display = "flex";
                changeRandomGif();
            }
        }, 1000);
    } else {
        clearInterval(countdown);
        timerRunning = false;
    }
});

// Function to change the GIF randomly
function changeRandomGif() {
    gifEl.style.display = "block";
    gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];
}

// Change GIF when clicked
gifEl.addEventListener("click", changeRandomGif);

// Audio toggle functionality
audioToggleBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    audioIcon.src = isMuted ? "assets/noaudio.png" : "assets/audio.png";
});

updateTimerDisplay();
