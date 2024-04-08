const DAYS = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday"
}

const MONTHS = {
    0 : ["January", 31],
    1 : ["February", function() {return isLeapYear() ? 29 : 28}],
    2 : ["March", 31],
    3 : ["April", 30],
    4 : ["May", 31],
    5 : ["June", 30],
    6 : ["July", 31],
    7 : ["August", 31],
    8 : ["September", 30],
    9 : ["October", 31],
    10 : ["November", 30],
    11 : ["December", 31]
}

const EMOJIS = {
    "happy" : "emojis/happy.svg",
    "okayish" : "emojis/okayish.svg",
    "neutral" : "emojis/neutral.svg",
    "sad" : "emojis/sad.svg",
    "crying" : "emojis/crying.svg",
    "undefined" : "emojis/undefined.svg"
}

const WEATHERS = {
    "cloudy" : "fa-cloud",
    "rain" : "fa-cloud-rain",
    "snow" : "fa-snowflake",
    "wind" : "fa-wind",
    "fog" : "fa-smog",
    "clear-day" : "fa-sun",
    "clear-night" : "fa-moon",
    "partly-cloudy-day": "fa-cloud-sun",
    "partly-cloudy-night" : "fa-cloud-moon",
    "snow-showers-day" : "fa-snowflake",
    "snow-showers-night" : "fa-snowflake",
    "thunder-rain" : "fa-bolt-lightning",
    "thunder-showers-day" : "fa-cloud-bolt",
    "thunder-showers-night" : "fa-cloud-bolt",
    "showers-day" : "fa-cloud-sun-rain",
    "showers-night" : "fa-cloud-moon-rain",
}