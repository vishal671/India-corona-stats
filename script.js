var i;
const api = "https://api.covid19india.org/data.json";
const api_url =

    "https://api.covid19india.org/data.json ";


// Defining async function 
async function getapi(api_url) {

    // Storing response 
    let response = await fetch(api_url);

    // Storing data in form of JSON 
    var data = await response.json();
    var datat = JSON.stringify(data);
    console.log(datat);
    var dat = JSON.parse(datat);

    show(dat);
}
// Calling that async function 
getapi(api_url);


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// Function to define innerHTML for HTML table 
function show(dat) {

    total = 0; //set a variable that holds our total
    recovered = 0;
    deaths = 0;

    if (i = dat.cases_time_series.length - 1)
        total = dat.cases_time_series[i].totalconfirmed;
    recovered = dat.cases_time_series[i].totalrecovered;
    deaths = dat.cases_time_series[i].totaldeceased;


    document.getElementById("total").innerHTML = numberWithCommas(total);
    document.getElementById("recovered").innerHTML = numberWithCommas(recovered);
    document.getElementById("deaths").innerHTML = numberWithCommas(deaths);
}


chartIt();

async function chartIt() {
    const data = await getapi1(api);
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        responsive: true,
        maintainAspectRatio: true,
        showScale: false,
        data: {
            labels: data.xs,
            datasets: [{
                label: 'New Cases',
                data: data.ys,




                backgroundColor: [
                    '#00334d',
                ],
                borderColor: [
                    '#8080ff',

                ],
                borderWidth: 2,
                pointstyle: "circle",
                pointRadius: 1,
                pointBorderColor: "white",

            }]
        },
        options: {
            customLine: {
                color: '#b30000',

            },
            tooltips: {
                intersect: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                    },
                    gridLines: {
                        color: "white",
                        lineWidth: ".1",
                    },
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",

                    },
                    gridLines: {

                        color: "white",
                        lineWidth: ".1",



                    },
                }]
            }
        },

        plugins: [{
            beforeEvent: function(chart, e) {
                if ((e.type === 'mousemove') &&
                    (e.x >= e.chart.chartArea.left) &&
                    (e.x <= e.chart.chartArea.right)
                ) {
                    chart.options.customLine.x = e.x;
                }
            },
            afterDraw: function(chart, easing) {
                var ctx = chart.chart.ctx;
                var chartArea = chart.chartArea;
                var x = chart.options.customLine.x;

                if (!isNaN(x)) {
                    ctx.save();
                    ctx.strokeStyle = chart.options.customLine.color;
                    ctx.moveTo(chart.options.customLine.x, chartArea.bottom);
                    ctx.lineTo(chart.options.customLine.x, chartArea.top);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }]

    });


}
const xs = [];
const ys = [];


async function getapi1(api) {


    // Storing response 
    let response = await fetch(api);

    // Storing data in form of JSON 
    var data1 = await response.json();
    var datat1 = JSON.stringify(data1);
    console.log(datat1);
    var dat1 = JSON.parse(datat1);

    show1(dat1);
    return { xs, ys };


}
// Calling that async function 
getapi1(api);

function show1(dat1) {
    daily = 0;


    for (i = 0; i < dat1.cases_time_series.length; i++) {

        xs.push(dat1.cases_time_series[i].dateymd)




    }
    for (i = 0; i < dat1.cases_time_series.length; i++) {

        ys.push(dat1.cases_time_series[i].dailyconfirmed)



    }
    if (i = (dat1.cases_time_series.length) - 1) {

        dailyt = dat1.cases_time_series[i].dailyconfirmed;
    }
    console.log(daily);
    document.getElementById("dailyt").innerHTML = dailyt;
    if (i = (dat1.cases_time_series.length) - 1) {

        dailyr = dat1.cases_time_series[i].dailyrecovered;
    }
    console.log(daily);
    document.getElementById("dailyr").innerHTML = dailyr;
    if (i = (dat1.cases_time_series.length) - 1) {

        dailyd = dat1.cases_time_series[i].dailydeceased;
    }

    document.getElementById("dailyd").innerHTML = dailyd;


}