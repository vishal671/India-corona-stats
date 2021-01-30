// api url
var i;
const api_url =

    // "https://employeedetails.free.beeceptor.com/my/api/path";
    "https://api.covid19india.org/data.json";
// "https://api.covidindiatracker.com/total.json";


// Defining async function
async function getapi(api_url) {

    // Storing response
    let response = await fetch(api_url);

    // Storing data in form of JSON
    var data = await response.json();
    var datat = JSON.stringify(data);
    console.log(datat);
    var dat = JSON.parse(datat);

    if (response) {
        hideloader();
    }
    show(dat);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function number(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return (num); // if value < 1000, nothing to do
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



// Function to define innerHTML for HTML table
function show(dat) {
    tab = document.getElementById("covid").innerHTML;


    // Loop to access all rows 
    console.log(dat);
    for (let r of dat.statewise) {
        tab += `<tr>  
     <td>${r.state} </td>
     <td>${numberWithCommas(r.active)} </td>
     <td>${numberWithCommas(r.confirmed)}</td>
     <td>${numberWithCommas(r.recovered)}</td>  
     <td>${numberWithCommas(r.deaths)}</td>  
     </tr>`;
        document.getElementById("covid").innerHTML = tab;


    }
}

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Input");
    filter = input.value.toUpperCase();
    table = document.getElementById("covid");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}