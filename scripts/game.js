/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const c = document.querySelector(":root");
let rangeColumns = document.getElementById("groesse").value;
const groesse = document.getElementById("groesse");

const boxes = document.getElementsByClassName("grid-item");
let player = -1;

const board = document.getElementById("spiel");
const endscreen = document.getElementsByClassName("endscreen")[0];
const endText = document.getElementsByClassName("endText")[0];
const winningIcon = document.getElementsByClassName("winningIcon")[0];

let gameStarted = false;
let playerWon = 0;
let resetGame = false;
let numbers = -1;

const drawBoard = () => {
    for (i = 0; i < boxes.length; i++) {
        let styleString = "";
        if (i < rangeColumns * (rangeColumns - 2)) {
            styleString += "border-bottom: 3px solid black;";
        }
        if (i % rangeColumns < rangeColumns - 1) {
            styleString += "border-right: 3px solid black;";
        }
        if (i >= rangeColumns * (rangeColumns - 1)) {
            styleString += "border-top: 3px solid black;";
        }
        boxes[i].style = styleString;
        /* if (numbers == 1) {
            boxes[i].textContent = i;
        } else {
            boxes[i].textContent = "";
        }*/
    };
    for (const box of boxes) {
        box.addEventListener("click", boxClicked);
    }
};

drawBoard();

const auswahlX = document.getElementById("auswahlX");
const auswahlO = document.getElementById("auswahlO");


const imgX = document.getElementById("previewIconX");
const imgO = document.getElementById("previewIconO");
const inputX = document.getElementById("inputX");
const inputO = document.getElementById("inputO");

const defaultPathX = "assets/img/x.png";
const defaultPathO = "assets/img/o.png";

imgX.addEventListener("click", function() {
    inputX.click();
});
imgO.addEventListener("click", function() {
    inputO.click();
});

endscreen.addEventListener("click", function() {
    reset();
});

groesse.addEventListener("touchmove", getouched());
groesse.addEventListener("touchend", getouched());

function getouched {
    alert("EHRE");
}

let iconX = {
    name: "iconX",
    path: defaultPathX
};

let iconO = {
    name: "iconO",
    path: defaultPathO
};


function uploadX(event) {
    if (event.target.files.length > 0) {
        const uploadImg = {
            name: event.target.files[0].name,
            path: URL.createObjectURL(event.target.files[0])
        };

        if (uploadImg.name != iconO.name) {
            iconX = uploadImg;
            imgX.src = iconX.path;
            changeIcons();
        } else {
            alert("Du kannst nicht zweimal das gleiche Symbol verwenden!");
        }
    }
}

function uploadO(event) {
    if (event.target.files.length > 0) {
        const uploadImg = {
            name: event.target.files[0].name,
            path: URL.createObjectURL(event.target.files[0])
        };

        if (uploadImg.name != iconX.name) {
            iconO = uploadImg;
            imgO.src = iconO.path;
            changeIcons();
        } else {
            alert("Du kannst nicht zweimal das gleiche Symbol verwenden!");
        }
    }
}


function boxClicked(event) {
    if (event.currentTarget.hasChildNodes() == false && playerWon == 0) {
        switchPlayer();
        const icon = document.createElement("img");
        if (player == 1) {
            icon.src = iconX.path;
            icon.id = "iconX";
            event.currentTarget.className += " x";
        } else {
            icon.src = iconO.path;
            icon.id = "iconO";
            event.currentTarget.className += " o";
        }
        icon.className = "icon";
        event.target.append(icon);

        checkWon();
    }
};

function switchPlayer() {
    player *= (-1);
    updatePlayerUI();
}

function updatePlayerUI() {
    board.classList.remove("x");
    board.classList.remove("o");
    if (player == 1) {
        board.classList.add("x");
        auswahlX.classList.remove("high");
        auswahlO.classList.add("high");
    } else {
        board.classList.add("o");
        auswahlO.classList.remove("high");
        auswahlX.classList.add("high");
    }
}

function groessenChange() {
    if (rangeColumns < document.getElementById("groesse").value || gameStarted == false || resetGame == true) {
        rangeColumns = document.getElementById("groesse").value;
        gameStarted = true;

        c.style.setProperty("--columns", rangeColumns);
        const boardgroesse = 500;
        const feldgroesse = (boardgroesse / rangeColumns) - 5;
        c.style.setProperty("--feldgroesse", feldgroesse + "px");
        c.style.setProperty("--containerwidth", ((feldgroesse + 2) * rangeColumns) + "px");

        const spiel = document.getElementById("spiel");
        const anzahl = spiel.children.length;
        let columnsBefore = Math.sqrt(spiel.children.length);
        const wunschAnzahl = rangeColumns * rangeColumns;

        // add divs
        if (anzahl < wunschAnzahl) {
            while (columnsBefore < rangeColumns) {
                for (i = 1; i <= columnsBefore; i++) {
                    const div = document.createElement("div");
                    div.className = "grid-item";
                    spiel.append(div);
                }
                for (i = 1; i <= columnsBefore + 1; i++) {
                    const div = document.createElement("div");
                    div.className = "grid-item";
                    spiel.children[(i * columnsBefore) - 2 + (1 * i)].after(div);
                }
                columnsBefore++;
            }
        } else if (anzahl > wunschAnzahl) {
            while (columnsBefore > rangeColumns) {
                for (i = 1; i < columnsBefore; i++) {
                    spiel.children[i * (columnsBefore - 1)].remove();
                }
                for (i = 0; i < columnsBefore; i++) {
                    spiel.removeChild(spiel.lastElementChild);
                }
                columnsBefore--;
            }
        }
        resetGame = false;
        drawBoard();
        switchPlayer();
        checkWon();
    }
}

groessenChange();
randomPlayer();
updatePlayerUI();

function checkWon() {
    let unentschieden = true;
    let counthX = 0;
    let counthO = 0;

    let countvX = 0;
    let countvO = 0;

    const countdX = [0, 0, 0, 0];
    const countdO = [0, 0, 0, 0];

    const countddX = [0, 0, 0, 0];
    const countddO = [0, 0, 0, 0];

    const countuX = [0, 0, 0, 0];
    const countuO = [0, 0, 0, 0];

    const countuuX = [0, 0, 0, 0];
    const countuuO = [0, 0, 0, 0];

    playerWon = 0;
    let countsForWin = 4;
    if (rangeColumns == 3) {
        countsForWin = rangeColumns;
    }
    if (rangeColumns >= 6) {
        countsForWin = 5;
    }

    const diaChecks = rangeColumns - countsForWin;

    for (i = 0; i < rangeColumns; i++) {
        for (j = 0; j < rangeColumns; j++) {
            if (boxes[(i * rangeColumns) + j].classList.contains("x")) {
                counthX++;
                counthO = 0;
            } else if (boxes[(i * rangeColumns) + j].classList.contains("o")) {
                counthO++;
                counthX = 0;
            } else {
                counthX = 0;
                counthO = 0;
                unentschieden = false;
            }

            if (boxes[(j * rangeColumns) + i].classList.contains("x")) {
                countvX++;
                countvO = 0;
            } else if (boxes[(j * rangeColumns) + i].classList.contains("o")) {
                countvO++;
                countvX = 0;
            } else {
                countvX = 0;
                countvO = 0;
            }

            if (counthX == countsForWin || countvX == countsForWin) {
                playerWon = 1;
                break;
            } else if (counthO == countsForWin || countvO == countsForWin) {
                playerWon = 2;
                break;
            }
        }
        counthX = 0;
        counthO = 0;
        countvX = 0;
        countvO = 0;

        for (k = 0; k <= diaChecks; k++) {
            if ((k + (i * (parseInt(rangeColumns) + 1))) < (rangeColumns * rangeColumns) && (k + (i * (parseInt(rangeColumns) + 1))) < rangeColumns * (rangeColumns - k)) {
                if (boxes[k + (i * (parseInt(rangeColumns) + 1))].classList.contains("x")) {
                    countdX[k] += 1;
                    countdO[k] = 0;
                } else if (boxes[k + (i * (parseInt(rangeColumns) + 1))].classList.contains("o")) {
                    countdO[k]++;
                    countdX[k] = 0;
                } else {
                    countdX[k] = 0;
                    countdO[k] = 0;
                }
            }

            if ((k * (parseInt(rangeColumns))) + (i * (parseInt(rangeColumns) + 1)) < (rangeColumns * rangeColumns) && k != 0) {
                if (boxes[((k) * (parseInt(rangeColumns))) + (i * (parseInt(rangeColumns) + 1))].classList.contains("x")) {
                    countddX[k] += 1;
                    countddO[k] = 0;
                } else if (boxes[((k) * (parseInt(rangeColumns))) + (i * (parseInt(rangeColumns) + 1))].classList.contains("o")) {
                    countddO[k] += 1;
                    countddX[k] = 0;
                } else {
                    countddX[k] = 0;
                    countddO[k] = 0;
                }
            }

            // countUX

            if ((k + (i * (parseInt(rangeColumns) + 1))) <= rangeColumns * (rangeColumns - k)) {
                if (boxes[((i + 1) * (parseInt(rangeColumns) - 1)) - k].classList.contains("x")) {
                    countuX[k] += 1;
                    countuO[k] = 0;
                } else if (boxes[((i + 1) * (parseInt(rangeColumns) - 1)) - k].classList.contains("o")) {
                    countuO[k] += 1;
                    countuX[k] = 0;
                } else {
                    countuX[k] = 0;
                    countuO[k] = 0;
                }
            }

            if (((i + 1) * (parseInt(rangeColumns) - 1)) + (k * parseInt(rangeColumns)) < (rangeColumns * rangeColumns) - 1 && k != 0) {
                if (boxes[((i + 1) * (parseInt(rangeColumns) - 1)) + (k * parseInt(rangeColumns))].classList.contains("x")) {
                    countuuX[k] += 1;
                    countuuO[k] = 0;
                } else if (boxes[((i + 1) * (parseInt(rangeColumns) - 1)) + (k * parseInt(rangeColumns))].classList.contains("o")) {
                    countuuO[k] += 1;
                    countuuX[k] = 0;
                } else {
                    countuuX[k] = 0;
                    countuuO[k] = 0;
                }
            }


            if (countdX[k] == countsForWin || countddX[k] == countsForWin || countuX[k] == countsForWin || countuuX[k] == countsForWin) {
                playerWon = 1;
            } else if (countdO[k] == countsForWin || countddO[k] == countsForWin || countuO[k] == countsForWin || countuuO[k] == countsForWin) {
                playerWon = 2;
            }
        }
    }

    if (unentschieden == true || playerWon != 0) {
        if (playerWon == 1) {
            endText.textContent = " gewinnt!";
            winningIcon.className += " show";
            winningIcon.src = iconX.path;
        } else if (playerWon == 2) {
            endText.textContent = " gewinnt!";
            winningIcon.className += " show";
            winningIcon.src = iconO.path;
        } else {
            endText.textContent = "Unentschieden!";
        }
        endscreen.className += " show";
        board.className += " show";
        groesse.disabled = true;
    } else {
        endscreen.classList.remove("show");
        board.classList.remove("show");
        winningIcon.classList.remove("show");
    }
}

function reset() {
    for (const box of boxes) {
        if (box.hasChildNodes()) {
            box.removeChild(box.firstChild);
        }
        box.classList.remove("x");
        box.classList.remove("o");
    }
    endscreen.classList.remove("show");
    board.classList.remove("show");
    groesse.disabled = false;
    playerWon = 0;

    groesse.value = 3;
    rangeColumns = 3;
    resetGame = true;
    groessenChange();

    randomPlayer();
    updatePlayerUI();
}

function randomPlayer() {
    let random = Math.random();
    random = Math.round(random);
    if (random == 0) {
        random = -1;
    }
    player = random;
}

function resetIcons() {
    iconX.name = "iconX";
    iconO.name = "iconO";
    iconX.path = defaultPathX;
    iconO.path = defaultPathO;
    imgX.src = iconX.path;
    imgO.src = iconO.path;
    changeIcons();
}

function changeIcons() {
    for (const box of boxes) {
        if (box.hasChildNodes()) {
            if (box.firstChild.id == "iconX") {
                box.firstChild.src = iconX.path;
            } else {
                box.firstChild.src = iconO.path;
            }
        }
    }
}


// Debug: Show Numbers

function showNumbers() {
    numbers = numbers * (-1);
    console.log(numbers);
    reset();
}


