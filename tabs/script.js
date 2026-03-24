document.addEventListener("DOMContentLoaded", function () {
    const hoverAlertButton = document.getElementById("hover-alert-button");
    const guessAlertButton = document.getElementById("guess-alert-button");

    if (hoverAlertButton) {
        hoverAlertButton.addEventListener("click", function () {
            window.location.href = "/tabs/games/games.html#game-1";
        });
    }

    if (guessAlertButton) {
        guessAlertButton.addEventListener("click", function () {
            window.location.href = "/tabs/games/games.html#game-2";
        });
    }
});


/* Spiel Nr1: Schere Stein Papier*/

let loseStreak = 0;
const KICK_URL = "/tabs/index.html";

function spiele(choice) {
    const choices = ["Schere", "Stein", "Papier"];
    const randomN = Math.floor(Math.random() * 3);
    const pcChoice = choices[randomN];

    let result = "";

    if (choice === pcChoice) {
        loseStreak = 0;
        result = "Unentschieden! Beide haben " + choice + " gewählt.";
    }

    else if ( ( choice === "Schere" && pcChoice === 'Papier' ) ||
            ( choice === "Stein" && pcChoice === 'Schere' ) ||
            ( choice === "Papier" && pcChoice === 'Stein') )
             {
            loseStreak = 0;
            result = "Du hast gewonnen!";
}
    else  {
        loseStreak += 1;
        result = "Du hast verloren! "+ pcChoice + " schlägt " + choice+ ".";

        if (loseStreak >= 3) {
            result += " 3 Niederlagen in Folge - du wirst weitergeleitet.";
            document.getElementById("result").innerText = result;
            setTimeout(function () {
                window.location.href = KICK_URL;
            }, 900);
            return;
        }
    }

    document.getElementById("result").innerText = result;
}


/* Spiel Nr2: Zahlenraten*/


let numberToGuess = Math.floor(Math.random() * 100) + 1;

let attempts = 1;

let moneyCounter = 500;

function updateCoinDisplay() {
    const coinCount = document.getElementById("coin-count");

    if (coinCount) {
        coinCount.innerText = 500 ;
    }
}

function randomColor() {
    const hex = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i += 1) {
        color += hex[Math.floor(Math.random() * 16)];
    }

    return color;
}

const userGuessInputField = document.getElementById("userGuess");

updateCoinDisplay();

if (userGuessInputField) {
    userGuessInputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            guessNumber();
        }
    });
}

function guessNumber() {
    const userGuessInput = document.getElementById("userGuess");
    const feedback = document.getElementById("feedback");

    if (!userGuessInput || !feedback) {
        return;
    }

    feedback.style.backgroundColor = "transparent";
    feedback.style.borderRadius = "0";
    feedback.style.padding = "0";

    const userGuess = userGuessInput.value;

    while (userGuess < 1 || userGuess > 100 || isNaN (userGuess)) {
        if (isNaN(userGuess)) {
            feedback.innerText = "Bitte gib eine Zahl ein!";
            userGuessInput.focus();
            userGuessInput.select();
            feedback.style.color = randomColor();
            return;
        }
            else {
        feedback.innerText = "Bitte gib eine Zahl zwischen 1 und 100 ein.";
        userGuessInput.focus();
        userGuessInput.select();
        feedback.style.color = randomColor();
        return;
    }
}

    if (userGuess > numberToGuess) {
        feedback.style.color = "white";
        feedback.innerText = "Deine Zahl ist zu hoch! " + attempts + ". Versuch";
        attempts += 1;
        moneyCounter = Math.max(0, moneyCounter - 100);
        updateCoinDisplay();
        rate.innerText = attempts+". Eingabe";
    }

    else if ( userGuess < numberToGuess) {
        feedback.style.color = "white";
        feedback.innerText = "Deine Zahl ist zu niedrig! " + attempts + ". Versuch";
        attempts += 1;
        moneyCounter = Math.max(0, moneyCounter - 100);
        updateCoinDisplay();
        rate.innerText = attempts+". Eingabe";
    }

    else {

        feedback.style.color = "white";

        if (moneyCounter > 0) {
            feedback.innerText = "Glückwunsch! Du hast die"+ numberToGuess +"in " + attempts + " Versuchen erraten! Du erhältst " + moneyCounter + " Münzen.";
            const gameSlot = document.querySelector('#game-2 .game-slot');
            if (gameSlot) {
                gameSlot.classList.add('winner');
            }
        }
        
        else {
            feedback.innerText = "Du hast die Zahl in "+ attempts +" Versuchen erraten, aber keine Münzen mehr übrig.";
        }
    }

    userGuessInput.focus();
    userGuessInput.select();
}

function restartGuessGame() {
    const userGuessInput = document.getElementById("userGuess");
    const feedback = document.getElementById("feedback");
    const rateLabel = document.getElementById("rate");
    const gameSlot = document.querySelector("#game-2 .game-slot");

    numberToGuess = Math.floor(Math.random() * 100) + 1;
    attempts = 1;
    moneyCounter = 500;
    updateCoinDisplay();

    if (userGuessInput) {
        userGuessInput.value = "";
        userGuessInput.focus();
    }

    if (feedback) {
        feedback.innerText = "Neues Spiel gestartet. Viel Erfolg!";
        feedback.style.color = "white";
        feedback.style.backgroundColor = "transparent";
        feedback.style.borderRadius = "0";
        feedback.style.padding = "0";
    }

    if (rateLabel) {
        rateLabel.innerText = "Rate";
    }

    if (gameSlot) {
        gameSlot.classList.remove("winner");
    }
}

