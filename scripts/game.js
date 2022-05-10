/* eslint-disable no-unused-vars */
let feldIndex = 9;

const c = document.querySelector(":root");
let rangeColumns = document.getElementById("groesse").value;

const boxes = document.getElementsByClassName("grid-item");
let player = -1;

const board = document.getElementById("spiel");

const drawBoard = () => {
    for (const box of boxes) {
        let styleString = "";
        if (box.id < rangeColumns * (rangeColumns - 2)) {
            styleString += "border-bottom: 3px solid black;";
        }
        if (box.id % rangeColumns < rangeColumns - 1) {
            styleString += "border-right: 3px solid black;";
        }
        if (box.id >= rangeColumns * (rangeColumns - 1)) {
            styleString += "border-top: 3px solid black;";
        }
        box.style = styleString;
        box.addEventListener("click", boxClicked);
    };
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

// eslint-disable-next-line prefer-const
/* let iconX = defaultPathX;*/
// eslint-disable-next-line prefer-const
/* let iconO = defaultPathO;*/

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
    if (event.currentTarget.hasChildNodes() == false) {
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

// eslint-disable-next-line no-unused-vars
function groessenChange() {
    rangeColumns = document.getElementById("groesse").value;

    c.style.setProperty("--columns", rangeColumns);

    const feldgroesse = 150 - ((rangeColumns - 3) * 25);
    c.style.setProperty("--feldgroesse", feldgroesse + "px");
    c.style.setProperty("--containerwidth", ((feldgroesse + 2) * rangeColumns) + "px");

    const spiel = document.getElementById("spiel");
    const anzahl = spiel.children.length;
    const wunschAnzahl = rangeColumns * rangeColumns;

    // add divs
    if (anzahl < wunschAnzahl) {
        for (i = 0; i < wunschAnzahl - anzahl; i++) {
            const div = document.createElement("div");
            div.className = "grid-item";
            div.id = feldIndex;
            spiel.append(div);
            feldIndex++;
        }
    } else
    if (anzahl > wunschAnzahl) {
        for (i = 0; i < anzahl - wunschAnzahl; i++) {
            spiel.removeChild(spiel.lastElementChild);
            feldIndex--;
        }
    }
    drawBoard();
}

groessenChange();
randomPlayer();
updatePlayerUI();

function reset() {
    for (const box of boxes) {
        if (box.hasChildNodes()) {
            box.removeChild(box.firstChild);
        }
        box.classList.remove("x");
        box.classList.remove("o");
    }

    randomPlayer();
    updatePlayerUI();
}

function randomPlayer() {
    let random = Math.random();
    console.log(random);
    random = Math.round(random);
    console.log(random);
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

