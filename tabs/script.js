const storedCoins = Number(localStorage.getItem("coins"));
let coins = Number.isFinite(storedCoins) ? storedCoins : 500;
updateCoinDisplay(coins);

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

 

function updateCoinDisplay(value) {
    const coinCount = document.getElementById("coin-count");

    if (!coinCount) {
        return;
    }

    if (typeof value === "number") {
        if (value < 0) {
            window.location.href = "/tabs/index.html";
            return;
        }

        localStorage.setItem("coins", String(value));
        coinCount.innerText = value;
        return;
    }

}

function spiele(choice) {
    const choices = ["Schere", "Stein", "Papier"];
    const randomN = Math.floor(Math.random() * 3);
    const pcChoice = choices[randomN];

    let result = "";

    if (choice === pcChoice) {
        result = "Unentschieden! Beide haben " + choice + " gewählt.";
    }

    else if ( ( choice === "Schere" && pcChoice === 'Papier' ) ||
            ( choice === "Stein" && pcChoice === 'Schere' ) ||
            ( choice === "Papier" && pcChoice === 'Stein') )
             {
            result = "Du hast gewonnen!\n Du kriegst 50 Münzen!";
            coins+= 50;
}
    else  {
        result = "Du hast verloren! "+ pcChoice + " schlägt " + choice+ ".\n Du verlierst 50 Münzen!";
        coins-= 50;
    }

    document.getElementById("result").innerText = result;
    updateCoinDisplay(coins);
}


/* Spiel Nr2: Zahlenraten*/


let numberToGuess = Math.floor(Math.random() * 100) + 1;

let attempts = 1;
let guessRoundFinished = false;





function randomColor() {
    const hex = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i += 1) {
        color += hex[Math.floor(Math.random() * 16)];
    }

    return color;
}

const userGuessInputField = document.getElementById("userGuess");
const restartGuessButton = document.getElementById("restart-button");
const guessButton = document.getElementById("guess-button");

if (restartGuessButton) {
    restartGuessButton.disabled = true;
}

updateCoinDisplay(coins);

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
    const rateLabel = document.getElementById("rate");

    if (!userGuessInput || !feedback) {
        return;
    }

    if (guessRoundFinished) {
        feedback.style.color = "white";
        feedback.innerText = "Die Runde ist beendet. Drücke Restart für ein neues Spiel.";
        return;
    }

    feedback.style.backgroundColor = "transparent";

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
        guessRoundFinished = false;
        feedback.style.color = "white";
        feedback.innerText = "Deine Zahl ist zu hoch! " + attempts + ". Versuch";
        attempts += 1;
        if (rateLabel) {
            rateLabel.innerText = attempts + ". Eingabe";
        }
    }

    else if ( userGuess < numberToGuess) {
        guessRoundFinished = false;
        feedback.style.color = "white";
        feedback.innerText = "Deine Zahl ist zu niedrig! " + attempts + ". Versuch";
        attempts += 1;
        if (rateLabel) {
            rateLabel.innerText = attempts + ". Eingabe";
        }
    }

    else {
        guessRoundFinished = true;
        if (restartGuessButton) {
            restartGuessButton.disabled = false;
        }

        feedback.style.color = "white";

        if (attempts < 6) {
            feedback.innerText = "Glückwunsch! Du hast die "+ numberToGuess +" in " + attempts + " Versuchen erraten! Du erhältst " + (600 - attempts * 100) + " Münzen.";
            const gameSlot = document.querySelector('#game-2 .game-slot');
            coins += (600 - attempts * 100);
            if (guessButton) {
                guessButton.disabled = true;
            }
            
            if (gameSlot) {
                gameSlot.classList.add('winner');
            }
        }

        else if (attempts > 6) {
            feedback.style.backgroundColor = "rgba(200, 0, 0, 0.8)";
            feedback.style.borderRadius = "10px";
            feedback.style.padding = "10px";
            feedback.innerText = "Leider hast du "+ attempts +" Versuche gebraucht, um die Zahl zu erraten. Deshalb musst du "+ Math.abs(600 - attempts * 100) +" Münzen bezahlen.";
            coins += 600 - (attempts * 100);
            if (guessButton) {
                guessButton.disabled = true;
            }
        }
        
        else {
            feedback.innerText = "Nochmal Glück gehabt! Du hast die Zahl in "+ attempts +" Versuchen erraten. Keiner schuldet dem anderen Münzen.";

        }
    }


updateCoinDisplay(coins);
    userGuessInput.focus();
    userGuessInput.select();
}



function restartGuessGame() {
    const userGuessInput = document.getElementById("userGuess");
    const feedback = document.getElementById("feedback");
    const rateLabel = document.getElementById("rate");
    const gameSlot = document.querySelector("#game-2 .game-slot");

    if (!guessRoundFinished) {
        if (feedback) {
            feedback.style.color = "#ffffff";
            feedback.innerText = "Restart ist erst möglich, wenn du die Runde beendet hast.";
        }
        return;
    }

    numberToGuess = Math.floor(Math.random() * 100) + 1;
    attempts = 1;
    guessRoundFinished = false;
    

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

    if (restartGuessButton) {
        restartGuessButton.disabled = true;
    }

    if (guessButton) {
        guessButton.disabled = false;
    }

    if (gameSlot) {
        gameSlot.classList.remove("winner");
    }
}

