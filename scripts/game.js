/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const c = document.querySelector(":root");
const groesse = document.getElementById("groesse");
let rangeColumns = groesse.value;
let valueBefore = groesse.value;
const labels = document.getElementsByClassName("sliderLabel");

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

let winBoxesX = [];
let winBoxesO = [];

let winBoxesvX = [];
let winBoxesvO = [];

let winBoxesdX = [[], [], [], []];
let winBoxesdO = [[], [], [], []];

let winBoxesddX = [[], [], [], []];
let winBoxesddO = [[], [], [], []];

let winBoxesuX = [[], [], [], []];
let winBoxesuO = [[], [], [], []];

let winBoxesuuX = [[], [], [], []];
let winBoxesuuO = [[], [], [], []];

let horizontal;
let vertical;
let diagonal;
let dDiagonal;
let uDiagonal;
let uuDiagonal;

let countsForWin;

let unentschieden;

let diaChecks;


const auswahlX = document.getElementById("auswahlX");
const auswahlO = document.getElementById("auswahlO");


const imgX = document.getElementById("previewIconX");
const imgO = document.getElementById("previewIconO");
const inputX = document.getElementById("inputX");
const inputO = document.getElementById("inputO");

const defaultPathX = "assets/img/x.png";
const defaultPathO = "assets/img/o.png";

let iconX = {
    name: "iconX",
    path: defaultPathX
};

let iconO = {
    name: "iconO",
    path: defaultPathO
};

imgX.addEventListener("click", function() {
    inputX.click();
});
imgO.addEventListener("click", function() {
    inputO.click();
});

endscreen.addEventListener("click", function() {
    reset();
});

groesse.addEventListener("mousedown", function() {
    valueBefore = groesse.value;
});

groesse.addEventListener("mouseup", function() {
    if (groesse.value != valueBefore) {
        switchPlayer();
    }
});

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
        box.addEventListener("mousedown", boxClicked);
    }
};

drawBoard();

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
        // switchPlayer();
        checkWon();
    } else {
        groesse.value = rangeColumns;
    }

    for (const l of labels) {
        if (l.textContent < rangeColumns && !l.classList.contains("disabled")) {
            l.className += " disabled";
        }
    }
}

groessenChange();
randomPlayer();
updatePlayerUI();

function checkWon() {
    console.log("--- checkWon ---");
    unentschieden = true;

    winBoxesX = [];
    winBoxesO = [];

    winBoxesvX = [];
    winBoxesvO = [];

    winBoxesdX = [[], [], [], []];
    winBoxesdO = [[], [], [], []];

    winBoxesddX = [[], [], [], []];
    winBoxesddO = [[], [], [], []];

    winBoxesuX = [[], [], [], []];
    winBoxesuO = [[], [], [], []];

    winBoxesuuX = [[], [], [], []];
    winBoxesuuO = [[], [], [], []];

    // playerWon = 0;
    countsForWin = 4;
    if (rangeColumns == 3) {
        countsForWin = rangeColumns;
    }
    if (rangeColumns >= 6) {
        countsForWin = 5;
    }

    diaChecks = rangeColumns - countsForWin;

    for (i = 0; i < rangeColumns; i++) {
        for (j = 0; j < rangeColumns; j++) {
            horizontal = (i * rangeColumns) + j;

            if (boxes[horizontal].classList.contains("x")) {
                winBoxesO = [];
                winBoxesX.push(horizontal);
            } else if (boxes[horizontal].classList.contains("o")) {
                winBoxesX = [];
                winBoxesO.push(horizontal);
            } else {
                unentschieden = false;
                winBoxesX = [];
                winBoxesO = [];
            }

            vertical = (j * rangeColumns) + i;

            if (boxes[vertical].classList.contains("x")) {
                winBoxesvO = [];
                winBoxesvX.push(vertical);
            } else if (boxes[vertical].classList.contains("o")) {
                winBoxesvX = [];
                winBoxesvO.push(vertical);
            } else {
                winBoxesvX = [];
                winBoxesvO = [];
            }

            if (winBoxesX.length == countsForWin || winBoxesvX.length == countsForWin) {
                // console.log("HV X ausgelöst");
                playerWon = 1;
                if (winBoxesX.length == countsForWin) {
                    for (const boxCount of winBoxesX) {
                        boxes[boxCount].className += " high";
                    }
                } else {
                    for (const boxCount of winBoxesvX) {
                        boxes[boxCount].className += " high";
                    }
                }
                break;
            } else if (winBoxesO.length == countsForWin || winBoxesvO.length == countsForWin) {
                playerWon = 2;
                // console.log("HV O ausgelöst");
                if (winBoxesO.length == countsForWin) {
                    for (const boxCount of winBoxesO) {
                        boxes[boxCount].className += " high";
                    }
                } else {
                    for (const boxCount of winBoxesvO) {
                        boxes[boxCount].className += " high";
                    }
                }
                break;
            }
        }

        winBoxesX = [];
        winBoxesO = [];
        winBoxesvX = [];
        winBoxesvO = [];

        for (k = 0; k <= diaChecks; k++) {
            diagonal = k + (i * (parseInt(rangeColumns) + 1));
            if (diagonal < (rangeColumns * rangeColumns) && (diagonal) < rangeColumns * (rangeColumns - k)) {
                if (boxes[diagonal].classList.contains("x")) {
                    winBoxesdX[k].push(diagonal);
                    winBoxesdO[k] = [];
                } else if (boxes[k + (i * (parseInt(rangeColumns) + 1))].classList.contains("o")) {
                    winBoxesdO[k].push(diagonal);
                    winBoxesdX[k] = [];
                } else {
                    winBoxesdX[k] = [];
                    winBoxesdO[k] = [];
                }
            }

            dDiagonal = ((k) * (parseInt(rangeColumns))) + (i * (parseInt(rangeColumns) + 1));

            if (dDiagonal < (rangeColumns * rangeColumns) && k != 0) {
                if (boxes[dDiagonal].classList.contains("x")) {
                    winBoxesddX[k].push(dDiagonal);
                    winBoxesddO[k] = [];
                } else if (boxes[dDiagonal].classList.contains("o")) {
                    winBoxesddO[k].push(dDiagonal);
                    winBoxesddX[k] = [];
                } else {
                    winBoxesddX[k] = [];
                    winBoxesddO[k] = [];
                }
            }

            // countUX
            uDiagonal = ((i + 1) * (parseInt(rangeColumns) - 1)) - k;
            if ((k + (i * (parseInt(rangeColumns) + 1))) <= rangeColumns * (rangeColumns - k)) {
                if (boxes[uDiagonal].classList.contains("x")) {
                    winBoxesuX[k].push(uDiagonal);
                    winBoxesuO[k] = [];
                } else if (boxes[uDiagonal].classList.contains("o")) {
                    winBoxesuO[k].push(uDiagonal);
                    winBoxesuX[k] = [];
                } else {
                    winBoxesuX[k] = [];
                    winBoxesuO[k] = [];
                }
            }
            uuDiagonal = ((i + 1) * (parseInt(rangeColumns) - 1)) + (k * parseInt(rangeColumns));

            if (((i + 1) * (parseInt(rangeColumns) - 1)) + (k * parseInt(rangeColumns)) < (rangeColumns * rangeColumns) - 1 && k != 0) {
                if (boxes[uuDiagonal].classList.contains("x")) {
                    winBoxesuuX[k].push(uuDiagonal);
                    winBoxesuuO[k] = [];
                } else if (boxes[uuDiagonal].classList.contains("o")) {
                    winBoxesuuO[k].push(uuDiagonal);
                    winBoxesuuX[k] = [];
                } else {
                    winBoxesuuX[k] = [];
                    winBoxesuuO[k] = [];
                }
            }


            if (winBoxesdX[k].length == countsForWin || winBoxesddX[k].length == countsForWin || winBoxesuX[k].length == countsForWin || winBoxesuuX[k].length == countsForWin) {
                // console.log("D X ausgelöst");
                if (winBoxesdX[k].length == countsForWin) {
                    for (const boxCount of winBoxesdX[k]) {
                        boxes[boxCount].className += " high";
                    }
                } else if (winBoxesddX[k].length == countsForWin) {
                    for (const boxCount of winBoxesddX[k]) {
                        boxes[boxCount].className += " high";
                    }
                } else if (winBoxesuX[k].length == countsForWin) {
                    for (const boxCount of winBoxesuX[k]) {
                        boxes[boxCount].className += " high";
                    }
                } else if (winBoxesuuX[k].length == countsForWin) {
                    for (const boxCount of winBoxesuuX[k]) {
                        boxes[boxCount].className += " high";
                    }
                }
                playerWon = 1;
                // break;
            } else if (winBoxesdO[k].length == countsForWin || winBoxesddO[k].length == countsForWin || winBoxesuO[k].length == countsForWin || winBoxesuuO[k].length == countsForWin) {
                // console.log("D O ausgelöst");
                if (winBoxesdO[k].length == countsForWin) {
                    for (const boxCount of winBoxesdO[k]) {
                        boxes[boxCount].className += " high";
                    }
                } else if (winBoxesddO[k].length == countsForWin) {
                    for (const boxCount of winBoxesddO[k]) {
                        boxes[boxCount].className += " high";
                    }
                } else if (winBoxesuO[k].length == countsForWin) {
                    for (const boxCount of winBoxesuO[k]) {
                        boxes[boxCount].className += " high";
                    }
                } else if (winBoxesuuO[k].length == countsForWin) {
                    for (const boxCount of winBoxesuuO[k]) {
                        boxes[boxCount].className += " high";
                    }
                }
                playerWon = 2;
                break;
            }
        }
    }

    if (unentschieden == true || playerWon != 0) {
        // Server Post

        sendJSONStringWithPOST("http://localhost:3000/", JSON.stringify({ rows: rangeColumns }));


        if (playerWon == 1) {
            endText.textContent = " gewinnt!";
            winningIcon.className += " show";
            winningIcon.src = iconX.path;
            sendJSONStringWithPOST("http://localhost:3000/", JSON.stringify({ winner: "Player X" }));
        } else if (playerWon == 2) {
            endText.textContent = " gewinnt!";
            winningIcon.className += " show";
            winningIcon.src = iconO.path;
            sendJSONStringWithPOST("http://localhost:3000/", JSON.stringify({ winner: "Player O" }));
        } else {
            endText.textContent = "Unentschieden!";
            sendJSONStringWithPOST("http://localhost:3000/", JSON.stringify({ winner: "Tie" }));
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
    console.log("RESET");

    for (const box of boxes) {
        box.classList.remove("high");
        if (box.hasChildNodes()) {
            box.removeChild(box.firstChild);
        }
        box.classList.remove("x");
        box.classList.remove("o");
    }

    for (const l of labels) {
        l.classList.remove("disabled");
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

// Debug: Win erzwingen

function winErzwingen() {
    console.log("win geforced lol");
    playerWon = 1;
    checkWon();
}

// SERVER

async function sendJSONStringWithPOST(url, jsonString) {
    const response = await fetch(url, {
        method: "post",
        body: jsonString
    });
}


