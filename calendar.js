let month, year, monthName;
const DATES = document.querySelector(".dates");

const currentDate = new Date();
month = currentDate.getMonth();
year = currentDate.getFullYear();

function firstLetterCapital(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
}

function init() {
    renderBoxes();
    addDates();
    updateMonthYearText(monthName, year);
    saveToLocalStorage();
}

function renderBoxes() {
    DATES.innerHTML = "";
    const fragment = new DocumentFragment();
    for (let i = 0; i < 42; i++) {
        const singleBox = document.createElement("div");
        singleBox.className = "singleDay date";
        singleBox.dataset.emojiType = "undefined";
        singleBox.id = `id${i}`;
        const date = document.createElement("p");
        date.className = "singleDate";
        const emoji = document.createElement("p");
        emoji.className = "emoji";
        singleBox.appendChild(date);
        singleBox.appendChild(emoji);
        fragment.appendChild(singleBox);
    }
    DATES.appendChild(fragment);
}

function addEmoji(emojiName) {
    return `<img src="emojis/${emojiName}.svg" class="emoji">`;
}

function addDates() {
    let firstDate = new Date(year, month, 1);
    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    monthName = MONTHS[firstDate.getMonth()][0];
    year = firstDate.getFullYear();
    let noOfDays = (monthName === "February") ? MONTHS[firstDate.getMonth()][1]() : MONTHS[firstDate.getMonth()][1]; // If month is Feb then execute that function in MONTHS, otherwise just take the value:)
    let weekDay = firstDate.getDay();
    let currentDate = 1, selectedDate;
    for (let i = 0; i < noOfDays; i++) {
        selectedDate = DATES.querySelector(`#id${weekDay + i}`); //It looked ugly otherwise. It still does but less:)
        selectedDate.classList.add("withDates");
        selectedDate.children[0].textContent = currentDate;
        let dateToBeFilled = new Date(year, month, currentDate);
        if (notMoodExists(currentDate, month, year)) {
            selectedDate.children[1].outerHTML = (dateToBeFilled <= todaysDate) ? addEmoji("undefined2") : addEmoji("lock");
            selectedDate.title = "No data."
        } else {
            let data = getDataFromObject(currentDate, month, year);
            selectedDate.children[1].outerHTML = addEmoji(data[0]);
            selectedDate.title = `${firstLetterCapital(data[0])}\n${data[1]}`;
            selectedDate.dataset.emojiType = data[0];
        }
        currentDate++;
    }
}

function updateMonthYearText(month, year) {
    document.querySelector(".monthYear").textContent = `${month}, ${year}`;
}

function isLeapYear() {
    return year % 4 == 0;
}

function previous() {
    if (month == 0) {
        month = 11;
        year--;
    } else {
        month--;
    }
}

function next() {
    if (month == 11) {
        month = 0;
        year++;
    } else {
        month++;
    }
}

const PREV = document.querySelector("#prev");
const NEXT = document.querySelector("#next");

PREV.addEventListener("click", () => {
    previous();
    init();
})

NEXT.addEventListener("click", () => {
    next();
    init();
})


init();

