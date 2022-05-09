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
        console.log("ausgeführt");
    };
};
drawBoard();

function boxClicked(event) {
    if (event.currentTarget.hasChildNodes() == false) {
        player *= (-1);
        const icon = document.createElement("img");
        if (player == 1) {
            icon.src = "/assets/img/trollface.png";
        } else {
            icon.src = "/assets/img/x.png";
        }
        icon.className = "icon";
        event.target.append(icon);
    }
};

// eslint-disable-next-line no-unused-vars
function groessenChange() {
    rangeColumns = document.getElementById("groesse").value;

    console.log("zeile gechanged");
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
    console.log(feldgroesse);
    console.log(((feldgroesse + 2) * rangeColumns) + "px");
    drawBoard();
}

groessenChange();

function reset() {
    for (const box of boxes) {
        if (box.hasChildNodes()) {
            box.removeChild(box.firstChild);
        }
    }
}

