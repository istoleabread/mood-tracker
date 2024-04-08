// Show calendar button
const QUOTEELEM = getClass("quotes");
const WEATHERINFO = getClass("weather");
const WEATHERGRAPH = document.getElementById("weatherGraph");

const QUOTESUP = {
    scale: 0.9,
    transition: "scale 0.5s, transform 1s 0.6s, opacity 2s",
    transform: "translateY(-110%)",
    opacity: 0.3,
}
const QUOTESDOWN = {
    scale: 1,
    transform: "translate(0)",
    opacity: 1,
    transition: "scale 0.5s 1s, transform 1s, opacity 1.7s",
}

let calendarIsVisible = false;
function showHideCalendar() {
    calendarIsVisible = !calendarIsVisible;
    getClass("dashboard").style.filter = calendarIsVisible ? "blur(3px)" : "blur(0px)";
    getClass("dashboard").style.pointerEvents = calendarIsVisible ? "none" : "all";
    let quotesStyle = calendarIsVisible ? QUOTESUP : QUOTESDOWN;
    let calendarBottom = calendarIsVisible ? "15vh" : "-100%";
    let calendarZIndex = calendarIsVisible ? 1 : 0;
    let weatherTranslate = calendarIsVisible ? `translateY(-${QUOTEELEM.scrollHeight + 19}px)` : "translate(0)";
    let weatherDelay = calendarIsVisible ? '0.6s' : '';
    let calendarDelay = calendarIsVisible ? '0.4s' : '';

    Object.assign(QUOTEELEM.style, quotesStyle);

    WEATHERINFO.style.transform = weatherTranslate;
    WEATHERINFO.style.transition = `transform 1s ${weatherDelay}`;
    WEATHERGRAPH.style.transform = weatherTranslate;
    WEATHERGRAPH.style.transition = `transform 1s ${weatherDelay}`;
    CALENDAR.style.bottom = calendarBottom;
    CALENDAR.style.zIndex = calendarZIndex;
    CALENDAR.style.transition = `1.2s ${calendarDelay}`;
}

function showHideStats() {
    getClass("moodStatistics").style.left = moodGraphVisible ? "150%" : "50%";
    getClass("dashboard").style.filter = moodGraphVisible ? "blur(0px)" : "blur(3px)";
    getClass("dashboard").style.pointerEvents = moodGraphVisible ? "none" : "all";
    moodGraphVisible = !moodGraphVisible;
}
getClass("addDate").addEventListener("click", () => {
    if (moodGraphVisible) {
        showHideStats()
    }
    showHideCalendar();
})


//Show mood graph button
let moodGraphVisible = false;
getClass("stats").addEventListener("click", () => {
    if (calendarIsVisible) {
        showHideCalendar();
    }
    showHideStats();
})


//Dashboard button
getClass("main").addEventListener("click", () => {
    if (calendarIsVisible) {
        showHideCalendar();
    }
    if (moodGraphVisible) {
        showHideStats();
    }
})

// Render Thy PopUp

const POPUP = getClass("infoPopup");
let popupVisible = false;
function renderThyPopup(textContent) {
    POPUP.style.right = popupVisible ? "-100%" : "15px";
    POPUP.textContent = textContent;
    popupVisible = !popupVisible;
    popupVisible ? setTimeout(() => {
        POPUP.style.right = "-100%";
        popupVisible = !popupVisible
    }, 2500) : "";
}


// Esc key event listener
window.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        if (calendarIsVisible) {
            showHideCalendar();
        } else if (moodGraphVisible) {
            showHideStats();
        }
    }
});