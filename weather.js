let url, locationUrl, lat, lon;
let currentSeconds = ~~(+new Date() / 1000);
let oneDay = 86400;
let seventhdaySeconds = currentSeconds - (oneDay * 6)
const WAPI = "U4XP7FCRQJTDPFL8N52T44SVT";
const WAPI2 = "7EU9C6H3NNSBRUJYAK3M5XU9E";


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(locationPermitted, error);
} else {
    error();
}

function locationPermitted(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${lon}/${seventhdaySeconds}/${currentSeconds}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cwindspeed%2Ccloudcover%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent&iconSet=icons2&key=${WAPI}&contentType=json`;
    locationUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    console.log(lat, lon);
    getWeather();
}

function error() {
    alert("Defaulting to Guduvancheri for weather.")
    lat = 12.8415;
    lon = 80.0708;
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${lon}/${seventhdaySeconds}/${currentSeconds}?unitGroup=metric&elements=datetime%2CdatetimeEpoch%2Cname%2Caddress%2Ctempmax%2Ctempmin%2Ctemp%2Cfeelslike%2Cwindspeed%2Ccloudcover%2Cconditions%2Cdescription%2Cicon&include=days%2Ccurrent&iconSet=icons2&key=${WAPI}&contentType=json`;
    locationUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    getWeather();
}

function getClass(className) {
    return document.querySelector("." + className);
}

let current = "";


//Just in case the API is used up, I'll replace it with this function
function createDummyWeather() {
    let json = {
        currentConditions: {
            temp: 26.3,
            cloudcover: 44,
            windspeed: 2.1,
            conditions: "Partly Cloudy",
            icon: 'cloudy'
        },
        days: {
            0: {
                temp: 27
            },
            1: {
                temp: 23.2
            },
            2: {
                temp: 25
            },
            3: {
                temp: 26.8
            },
            4: {
                temp: 28
            },
            5: {
                temp: 26
            },
            6: {
                temp: 23.8,
                description: "Partly cloudy throughout the day"
            }
        }
    }
}

let weeklyweather = [];
async function getWeather() {
    try {
        let response = await fetch(url);
        let json = await response.json();
        console.log(response);
        let getLocationName = await fetch(locationUrl);
        let locationJson = await getLocationName.json();
        let locality = locationJson.locality;
        let currentWeatherDetails = json.currentConditions;
        let temp = currentWeatherDetails.temp + " °C";
        let cloudiness = "Cloudiness: " + currentWeatherDetails.cloudcover + " %";
        let windspeed = "Wind Speed: " + currentWeatherDetails.windspeed;
        let weatherName = currentWeatherDetails.conditions;
        let desc = json.days[6].description;
        let image = WEATHERS[currentWeatherDetails.icon];
        weeklyweather = [];
        for (let i = 0; i < json.days.length - 1; i++) {
            weeklyweather.push(json.days[i].temp);
        }
        weeklyweather.push(currentWeatherDetails.temp); //Just to get more accurate current temp in the graph
        getClass("cityName").textContent = locality;
        getClass("temperature").textContent = temp;
        getClass("weatherType").textContent = weatherName;
        getClass("cloudiness").textContent = cloudiness;
        getClass("weatherDesc").textContent = desc;
        getClass("windSpeed").textContent = windspeed + "m/s";
        getClass("weatherIcon").classList.remove("fa-bread-slice");
        getClass("weatherIcon").classList.add(image);
        renderWeeklyWeather("weatherGraph")
    } catch (e) {
        console.log("Error occured: " + e);
    }
}

function getDay(idx) {
    return past7Days[idx].toDateString().slice(4, 10);
}

let past7Days;

renderWeeklyWeather("weatherGraph");
function renderWeeklyWeather(container) {
    past7Days = [...Array(7).keys()].map(index => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        return date;
    });
    weeklyweather = weeklyweather.length == 0 ? [27.3, 26.6, 25.0, 23.2, 28.5, 25.3, 21.1] : weeklyweather;
    Highcharts.chart(container, {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            y: 10,
            style: {
                fontFamily: 'Montserrat, sans-serif',
            }
        },
        title: {
            text: 'Previous 7 days weather data',
            align: 'left',
            style: {
                color: 'white',
            }
        },
        subtitle: {
            text:
                'Source: <a target="_blank" href="https://www.visualcrossing.com/">Visual Crossing</a>',
            align: 'left',
            style: {
                color: 'dodgerblue',
                marginTop: '10px'
            }
        },
        xAxis: {
            categories: [getDay(6), getDay(5), getDay(4), getDay(3), getDay(2), getDay(1), getDay(0)],
            crosshair: true,
            accessibility: {
                description: 'Weather data'
            },
            labels: {
                style: {
                    color: '#e0e0e0'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Temperature',
            },
            labels: {
                format: '{value} °C',
                style: {
                    color: '#e0e0e0'
                }
            },

        },
        tooltip: {
            valueSuffix: ' °C',
            backgroundColor: 'black',
            style: {
                color: 'white'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Temperature',
                data: weeklyweather,
                color: "rgba(255,255,255,0.85)" //Bar color
            }
        ],
        legend: {
            itemStyle: {
                color: '#a0a0a0'
            },
            itemHoverStyle: {
                color: 'white'
            }
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    symbolStroke: 'white',
                    theme: {
                        fill: 'transparent',
                        stroke: '#888',
                        states: {
                            hover: {
                                fill: 'rgba(255,255,255,0.1)'
                            },
                            select: {
                                fill: 'black',
                                stroke: '#0f0'
                            }
                        }
                    }
                },
            },
        }
    });

}