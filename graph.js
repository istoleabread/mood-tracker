document.addEventListener('DOMContentLoaded', function () {
    renderChart('statsGraph');
});

const moods = ["happy", "okayish", "neutral", "sad", "crying", "undefined"];
// Since its a recursive function, defining resObject inside the function would be worthless as it gets reset every recursive call. So I wrapped it around another function, this way I won't have to reset the value of resObject everytime the graph is loaded:)
function findMoods(obj) {
    let resObject = {};
    let total = 0;
    function iterator(obj) {
        Object.keys(obj).forEach(key => {
            if (key === "0" && moods.includes(obj[key])) {
                total++;
                if (!resObject[obj[key]]) {
                    resObject[obj[key]] = 0;
                }
                resObject[obj[key]]++;
            }
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                iterator(obj[key]);
            }
        })
    }
    iterator(obj);
    return [resObject, total];
}


function renderChart(div) {
    let [result, totalCount] = findMoods(EMOJIDATA);
    let graphArray = [];
    Object.keys(result).forEach(key => {
        let obj = {
            name: firstLetterCapital(key),
            y: Number(((result[key] * 100) / totalCount).toFixed(2))
        };
        graphArray.push(obj);
    })
    graphArray = ((graphArray.length==0) ? [{name:"No data", y:100}] : graphArray);
    Highcharts.chart(div, {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'Montserrat, sans-serif',
            }
        },
        title: {
            text: 'Mood Percentage',
            style: {
                color: 'white'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        subtitle: {
            text: 'Your mood stats.',
            style: {
                color: '#a0a0a0',
            }
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20,
                    color: 'white',
                    style: {
                        fontSize: '13px',
                    }
                }, {
                    enabled: true,
                    distance: -45,
                    format: '{point.percentage:.2f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7,
                    },
                }]
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: graphArray,
            }
        ],
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
    })
}
