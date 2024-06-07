// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const startPauseButton = document.getElementById("startPause");
    const resetButton = document.getElementById("reset");
    const lapButton = document.getElementById("lap");
    const lapsContainer = document.getElementById("laps");

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    function formatTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(3, '0');

        return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }

    function startPause() {
        if (isRunning) {
            clearInterval(timerInterval);
            startPauseButton.textContent = "Start";
        } else {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                display.textContent = formatTime(elapsedTime);
            }, 10);
            startPauseButton.textContent = "Pause";
        }
        isRunning = !isRunning;
    }

    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        startTime = 0;
        elapsedTime = 0;
        display.textContent = "00:00:00";
        startPauseButton.textContent = "Start";
        lapsContainer.innerHTML = "";
    }

    function lap() {
        if (isRunning) {
            const lapTime = document.createElement("div");
            lapTime.textContent = formatTime(elapsedTime);
            lapsContainer.appendChild(lapTime);
        }
    }

    startPauseButton.addEventListener("click", startPause);
    resetButton.addEventListener("click", reset);
    lapButton.addEventListener("click", lap);
});
