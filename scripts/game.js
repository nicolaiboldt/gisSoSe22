let feldIndex = 9;

// eslint-disable-next-line no-unused-vars
function groessenChange() {
    const c = document.querySelector(":root");
    const rangeColumns = document.getElementById("groesse").value;
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
            div.textContent = feldIndex;
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
}

