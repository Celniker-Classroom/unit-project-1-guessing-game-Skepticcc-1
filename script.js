// Prompt for player name and case it correctly
let playerName = prompt("Enter your name:");
if (playerName) {
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
} else {
    playerName = "Player";
}
// variables for DOM elements
// Global variables for game state
let answer = null;
let guessCount = 0;
let wins = 0;
let totalGuesses = 0;
let scores = [];
let startTime = null;
let roundTimes = [];
let fastestTime = Infinity;
let totalTime = 0;
let currentRange = 0;
//day sufix
// Function to get day suffix
function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
//fnction for the date and time display
// Function to format time
function time() {
    let now = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[now.getMonth()];
    let day = now.getDate();
    let suffix = getDaySuffix(day);
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    return `${month} ${day}${suffix}, ${year} ${hours}:${minutes}:${seconds}`;
}

// Start live time update
setInterval(() => {
    document.getElementById('date').textContent = time();
}, 1000);
document.getElementById('date').textContent = time(); // Initial display

// Event listeners
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle('dark');
});

// Keyboard support for guessing
document.getElementById('guess').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

// Play function
function play() {
    let level = document.querySelector('input[name="level"]:checked').value;
    currentRange = parseInt(level);
    answer = Math.floor(Math.random() * currentRange) + 1;
    guessCount = 0;
    startTime = new Date().getTime();
    document.getElementById('msg').textContent = `${playerName}, guess a number between 1 and ${currentRange}!`;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('giveUpBtn').disabled = false;
    document.getElementById('playBtn').disabled = true;
    document.querySelectorAll('input[name="level"]').forEach(radio => radio.disabled = true);
}

// Make guess function
function makeGuess() {
    let guessInput = document.getElementById('guess');
    let guess = parseInt(guessInput.value);
    if (isNaN(guess)) {
        document.getElementById('msg').textContent = `${playerName}, please enter a valid number!`;
        return;
    }
    if (guess < 1 || guess > currentRange) {
        document.getElementById('msg').textContent = `${playerName}, please enter a number between 1 and ${currentRange}!`;
        return;
    }
    guessCount++;
    let diff = Math.abs(guess - answer);
    let proximity = '';
    if (diff <= 2) proximity = 'hot';
    else if (diff <= 5) proximity = 'warm';
    else proximity = 'cold';
    if (guess > answer) {
        document.getElementById('msg').textContent = `${playerName}, too high! You're ${proximity}.`;
    } else if (guess < answer) {
        document.getElementById('msg').textContent = `${playerName}, too low! You're ${proximity}.`;
    } else {
        let quality = '';
        if (guessCount === 1) quality = 'Amazing!';
        else if (guessCount <= 3) quality = 'Good job!';
        else quality = 'Keep practicing!';
        document.getElementById('msg').textContent = `Correct, ${playerName}! You got it in ${guessCount} guesses. ${quality}`;
        updateScore(guessCount);
        updateTimers(new Date().getTime());
        reset();
    }
    guessInput.value = '';
}

// Give up function
function giveUp() {
    updateScore(currentRange);
    updateTimers(new Date().getTime());
    document.getElementById('msg').textContent = `${playerName}, you gave up. The answer was ${answer}.`;
    reset();
}

// Update score function
function updateScore(score) {
    scores.push(score);
    scores.sort((a, b) => a - b);
    wins++;
    totalGuesses += score;
    document.getElementById('wins').textContent = `Total wins: ${wins}`;
    document.getElementById('avgScore').textContent = `Average Score: ${wins > 0 ? (totalGuesses / wins).toFixed(1) : '--'}`;
    // Update leaderboard
    let leaderboard = document.querySelectorAll('li[name="leaderboard"]');
    for (let i = 0; i < 3; i++) {
        if (i < scores.length) {
            leaderboard[i].textContent = scores[i];
        } else {
            leaderboard[i].textContent = '--';
        }
    }
}

// Update timers function
function updateTimers(endMs) {
    let elapsed = endMs - startTime;
    roundTimes.push(elapsed);
    totalTime += elapsed;
    if (elapsed < fastestTime) {
        fastestTime = elapsed;
    }
    document.getElementById('fastest').textContent = `Fastest Game: ${fastestTime === Infinity ? '--' : (fastestTime / 1000).toFixed(1)}s`;
    document.getElementById('avgTime').textContent = `Average Time: ${(totalTime / roundTimes.length / 1000).toFixed(1)}s`;
}

// Reset function
function reset() {
    document.getElementById('guessBtn').disabled = true;
    document.getElementById('giveUpBtn').disabled = true;
    document.getElementById('playBtn').disabled = false;
    document.querySelectorAll('input[name="level"]').forEach(radio => radio.disabled = false);
}

