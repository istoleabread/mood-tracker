let EMOJIDATA = {}

function firstLetterCapital(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
}

function addEmojiToObject(date, month, year, emoji, comment = "No comments") {
    if (!EMOJIDATA[year]) {
        EMOJIDATA[year] = {};
    }
    if (!EMOJIDATA[year][month]) {
        EMOJIDATA[year][month] = {};
    }
    // If the year or month don't already exists, create new empty ones. It threw an error otherwise:/
    EMOJIDATA[year][month][date] = [emoji, firstLetterCapital(comment)];
}

function getDataFromObject(date, month, year) {
    return EMOJIDATA[year][month][date];
}

function notMoodExists(date, month, year) {
    return (!EMOJIDATA[year]) || (!EMOJIDATA[year][month]) || (!EMOJIDATA[year][month][date]);
}

addEmojiToObject(10, 1, 2024, "crying");
addEmojiToObject(7, 11, 2023, "okayish", "What is going on anymore?");

function loadFromLocalStorage() {
    if (localStorage.emojidata) {
        EMOJIDATA = JSON.parse(localStorage.emojidata)
    }
}

function saveToLocalStorage() {
    localStorage.emojidata = JSON.stringify(EMOJIDATA);
}

loadFromLocalStorage();

// Editing the Mood popup menu

let clickedDate;
const CALENDARDATES = document.querySelector(".dates");
const EDITMOOD = document.querySelector(".editMood");
const CALENDAR = document.querySelector(".calendar");
const COMMENTS = document.querySelector("#comments");
const SELECTEMOJI = document.querySelector(".emojis");
let previousEmoji, previousComment;

CALENDARDATES.addEventListener("click", (ev) => {
    let date = ev.target.closest(".withDates");
    if (date) {
        clickedDate = date.querySelector(".singleDate").textContent;
        let selectedDate = new Date(`${year}-${month + 1}-${clickedDate}`);
        selectedDate.setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate <= today) {
            for (let i = 0; i < SELECTEMOJI.children.length; i++) {
                SELECTEMOJI.children[i].className = "";
            }
            COMMENTS.value = "";
            CALENDAR.style.pointerEvents = "none";
            EDITMOOD.style.scale = 1;
            EDITMOOD.style.opacity = 1;
            EDITMOOD.style.zIndex = 1;
            document.querySelector("#whatDay").textContent = `${clickedDate} ${monthName}, ${year}`;
            if (!notMoodExists(clickedDate, month, year)) {
                COMMENTS.value = getDataFromObject(clickedDate, month, year)[1];
                previousComment = COMMENTS.value;
                for (let i = 0; i < SELECTEMOJI.children.length; i++) {
                    if (SELECTEMOJI.children[i].dataset.emojiType == date.dataset.emojiType) {
                        SELECTEMOJI.children[i].classList.add("selectedMood");
                        previousEmoji = SELECTEMOJI.children[i].dataset.emojiType;
                        break;
                    } else {
                        previousEmoji = undefined;
                    }
                }
            }
        }
    }
});


COMMENTS.addEventListener("input", () => {
    COMMENTS.style.height = '0'; //So that when user deletes a line, it resets the size of textarea:)
    COMMENTS.style.height = COMMENTS.scrollHeight + 2 + "px";
})


let selectedEmoji;
SELECTEMOJI.addEventListener("click", (ev) => {
    if (ev.target.dataset.emojiType) {
        for (let i = 0; i < SELECTEMOJI.children.length; i++) {
            SELECTEMOJI.children[i].className = "";
        }
        ev.target.className = "selectedMood";
        selectedEmoji = ev.target.dataset.emojiType;
    }
})

const CONFIRMDENY = document.querySelector(".buttons");

CONFIRMDENY.addEventListener("click", (ev) => {
    if (ev.target.value == "true") {
        if (selectedEmoji == undefined && previousEmoji == undefined) {
            console.log(selectedEmoji, previousEmoji);
            renderThyPopup("Please select an emoji!");
            return;
        } else if (selectedEmoji == previousEmoji || (selectedEmoji==undefined && COMMENTS.value == previousComment)) {
            renderThyPopup("Please change the emoji/comment to save!");
            return;
        }
        addEmojiToObject(clickedDate, month, year, (selectedEmoji ? selectedEmoji : previousEmoji), COMMENTS.value);
        //If user changed the comment rather than the emoji, then it takes the previous emoji to put in the EMOJIDATA object otherwise, the new selected emoji.

        selectedEmoji = undefined;
        CALENDAR.style.pointerEvents = "all";
        EDITMOOD.style.scale = 0.7;
        EDITMOOD.style.opacity = 0;
        EDITMOOD.style.zIndex = -1;
        init();
    } else if (ev.target.value == "false") {
        CALENDAR.style.pointerEvents = "all";
        EDITMOOD.style.scale = 0.7;
        EDITMOOD.style.opacity = 0;
        EDITMOOD.style.zIndex = -1;
        selectedEmoji = undefined;
    }
})