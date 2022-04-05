const BASE_URL = "https://rplace.space/combined/";

let data;

function loadData() {
    // load json file
    let xhr = new XMLHttpRequest();
    if (xhr !== null) {
        xhr.open("GET", "./index-combined.json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    data = JSON.parse(xhr.responseText);
                    onDataLoaded();
                }
            }
        }
        xhr.send();
    }
}

function onDataLoaded() {
    // set some initial values
    slider.value = 0;
    slider.max = data.length - 1;
    datetime.innerHTML = data[0].date;
}

function sliderChanged() {
    console.log(slider.value);
    image.src = BASE_URL + data[slider.value].file;
    datetime.innerHTML = data[slider.value].date;
}

function keyPressed(event) {
    switch (event.key) {
        case "PageUp":
        case "ArrowUp":
        case "ArrowRight":
        case "+":
            slider.value = parseInt(slider.value) + 1;
            break;
        case "PageDown":
        case "ArrowDown":
        case "ArrowLeft":
        case "-":
            slider.value = parseInt(slider.value) - 1;
            break;
    }
}

let image = document.getElementById("image");
let datetime = document.getElementById("datetime");
let slider = document.getElementById("slider");

// init
loadData();

// update image when slider changes
slider.addEventListener("change", sliderChanged);

// listen for key events
window.addEventListener("keydown", keyPressed);
