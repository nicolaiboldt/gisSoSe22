/* eslint-disable no-unused-vars */
let feldIndex = 9;

const c = document.querySelector(":root");
let rangeColumns = document.getElementById("groesse").value;

const boxes = document.getElementsByClassName("grid-item");
let player = -1;

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

const imgX = document.getElementById("previewIconX");
const imgO = document.getElementById("previewIconO");
const inputX = document.getElementById("inputX");
const inputO = document.getElementById("inputO");

imgX.addEventListener("click", function() {
    inputX.click();
});
imgO.addEventListener("click", function() {
    inputO.click();
});

// eslint-disable-next-line prefer-const
let iconX = "/assets/img/x.png";
// eslint-disable-next-line prefer-const
let iconO = "/assets/img/o.png";

function uploadX(event) {
    if (event.target.files.length > 0) {
        iconX = URL.createObjectURL(event.target.files[0]);
        console.log("image uploaded");
        imgX.src = iconX;
        changeIcons();
    }
}

function uploadO(event) {
    if (event.target.files.length > 0) {
        iconO = URL.createObjectURL(event.target.files[0]);
        console.log("image uploaded");
        imgO.src = iconO;
        changeIcons();
    }
}

function boxClicked(event) {
    if (event.currentTarget.hasChildNodes() == false) {
        player *= (-1);
        const icon = document.createElement("img");
        if (player == 1) {
            icon.src = iconX;
            icon.id = "iconX";
            event.currentTarget.className += " x";
        } else {
            icon.src = iconO;
            icon.id = "iconO";
        }
        icon.className = "icon";
        event.target.append(icon);
    }
};

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

function reset() {
    for (const box of boxes) {
        if (box.hasChildNodes()) {
            box.removeChild(box.firstChild);
        }
        console.log(box.classList);
        box.classList.remove("x");
        box.classList.remove("o");
    }
}

function resetIcons() {
    iconX = "/assets/img/x.png";
    iconO = "/assets/img/o.png";
    imgX.src = iconX;
    imgO.src = iconO;
    changeIcons();
}

function changeIcons() {
    for (const box of boxes) {
        if (box.hasChildNodes()) {
            if (box.firstChild.id == "iconX") {
                box.firstChild.src = iconX;
            } else {
                box.firstChild.src = iconO;
            }
        }
    }
}

