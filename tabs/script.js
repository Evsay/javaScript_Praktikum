document.addEventListener("DOMContentLoaded", function () {
    const hoverAlertButton = document.getElementById("hover-alert-button");

    if (!hoverAlertButton) {
        return;
    }

    hoverAlertButton.addEventListener("click", function () {
        window.location.href = "/tabs/games/games.html#game-1";
    });
});

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

