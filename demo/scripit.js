const sheet = document.querySelector(".bottom-sheet");
const dragArea = document.querySelector(".drag-area");
const navbar = document.querySelector(".navbar");

let startY = 0;
let startHeight = 0;
let currentHeight = 0;
let isDragging = false;

const MIN_HEIGHT = 14; // collapsed
const MID_HEIGHT = 28; // default
const MAX_HEIGHT = 100; // expanded


function getHeightPercentage() {
    const phoneHeight = document.querySelector(".phone").offsetHeight;
    const sheetHeight = sheet.offsetHeight;

    return (sheetHeight / phoneHeight) * 100;
}


function setSheetHeight(percent, animate = true) {

    if (animate) {
        sheet.style.transition = "height 0.35s cubic-bezier(.22,.8,.25,1)";
    } else {
        sheet.style.transition = "none";
    }

    sheet.style.height = `${percent}%`;
}


function startDrag(clientY) {

    isDragging = true;

    startY = clientY;

    currentHeight = getHeightPercentage();

    sheet.style.transition = "none";

    document.body.style.userSelect = "none";
}


function drag(clientY) {

    if (!isDragging) return;

    const phone = document.querySelector(".phone");

    const deltaY = startY - clientY;

    const deltaPercentage =
        (deltaY / phone.offsetHeight) * 100;

    let newHeight = currentHeight + deltaPercentage;

    newHeight = Math.max(
        MIN_HEIGHT,
        Math.min(MAX_HEIGHT, newHeight)
    );

    sheet.style.height = `${newHeight}%`;
}


function endDrag() {

    if (!isDragging) return;

    isDragging = false;

    document.body.style.userSelect = "";

    const height = getHeightPercentage();

    /*
        Decide which position the sheet should snap to.
    */

    if (height >= 74) {

        setSheetHeight(MAX_HEIGHT);

    } else if (height >= 50) {

        setSheetHeight(MID_HEIGHT);

    } else {

        setSheetHeight(MIN_HEIGHT);

    }
}


/* =========================================
   TOUCH EVENTS
========================================= */

dragArea.addEventListener("touchstart", (event) => {

    startDrag(event.touches[0].clientY);

}, { passive: true });


dragArea.addEventListener("touchmove", (event) => {

    drag(event.touches[0].clientY);

}, { passive: true });


dragArea.addEventListener("touchend", () => {

    endDrag();

});


/* =========================================
   MOUSE EVENTS
   Useful when testing on desktop
========================================= */

dragArea.addEventListener("mousedown", (event) => {

    startDrag(event.clientY);

});


document.addEventListener("mousemove", (event) => {

    drag(event.clientY);

});


document.addEventListener("mouseup", () => {

    endDrag();

});


/* =========================================
   CATEGORY INTERACTION
========================================= */

const categories = document.querySelectorAll(".category");

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(item => {
            item.classList.remove("active");
        });

        category.classList.add("active");

    });

});


/* =========================================
   NAVIGATION
========================================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});


/* =========================================
   JOIN BUTTON
========================================= */

const joinButtons = document.querySelectorAll(".join-button");

joinButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.innerText === "Join") {

            button.innerText = "Joined";

            button.style.background = "#e8e8e8";
            button.style.color = "#111";

        } else {

            button.innerText = "Join";

            button.style.background = "#111";
            button.style.color = "#fff";

        }

    });

});


/* =========================================
   CREATE BUTTON
========================================= */

const createButton =
    document.querySelector(".create-button");

createButton.addEventListener("click", () => {

    alert("Create a new Ghumi");

});


/* =========================================
   LOCATION BUTTON
========================================= */

const locationButton =
    document.querySelector(".location-button");

locationButton.addEventListener("click", () => {

    /*
        Later this will request the user's
        actual GPS location.
    */

    alert("Your location will appear here.");

});


/* =========================================
   INITIAL STATE
========================================= */

setSheetHeight(MID_HEIGHT);