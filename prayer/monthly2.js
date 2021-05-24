function loader(vartosaveto, url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            eval(vartosaveto + "=" + this.responseText);
            eval(callback);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

let url = new URL(location);
let params = new URLSearchParams(location.search);
var tobedeleted = {
    masjidKey: params.get("masjidKey")
};
tobedeleted["dataurl"] = tobedeleted.masjidKey + "/data.json?cache=" + new Date().getTime();
tobedeleted["data"] = "";


/*program start here*/
loader("tobedeleted.data", tobedeleted.dataurl, "createHTML()");

selectedDate = new Date();

if (params.has('month') === true) {
    selectedDate.setMonth(parseInt(params.get("month") - 1));
}
else {
    selectedDate.setDate(selectedDate.getDate() + 2);
}
var monthsData = [];
var tbodyString = "";
const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


document.getElementById("selectedMonth").value = selectedDate.getMonth() + 1;


function createHTML() {
    let data = tobedeleted["data"]["Daily Prayer"]["data"];
    let month = selectedDate.getMonth() + 1;
    let dayNumber = 0;
    for (let i = 0; i < data.length; i++) {
        if (month == data[i]["Month"]) {
            dayNumber++;
            $($(".Date").get(dayNumber)).html(getDateToShow(data[i]["Month"], data[i]["Date"]));
            $($(".Day").get(dayNumber)).html(getDayToShow(data[i]["Month"], data[i]["Date"]));
            $($(".Fajr").get(dayNumber)).html(data[i]["Fajr"]);
            $($(".Sunrise").get(dayNumber)).html(data[i]["Sunrise"]);
            $($(".Zuhr").get(dayNumber)).html(data[i]["Zuhr"]);
            $($(".Asr").get(dayNumber)).html(data[i]["Asr"]);
            $($(".Maghrib").get(dayNumber)).html(data[i]["Maghrib"]);
            $($(".Esha").get(dayNumber)).html(data[i]["Esha"]);

            // $($(".fIqama").get(dayNumber)).html(data[i]["fIqama"]);
            // $($(".zIqama").get(dayNumber)).html(data[i]["zIqama"]);
            // $($(".aIqama").get(dayNumber)).html(data[i]["aIqama"]);
            // $($(".mIqama").get(dayNumber)).html(data[i]["mIqama"]);
            // $($(".eIqama").get(dayNumber)).html(data[i]["eIqama"]);

            $($(".fIqama").get(dayNumber)).html(addBoldOnIfTimeChange(i, data, "fIqama"));
            $($(".zIqama").get(dayNumber)).html(addBoldOnIfTimeChange(i, data, "zIqama"));
            $($(".aIqama").get(dayNumber)).html(addBoldOnIfTimeChange(i, data, "aIqama"));
            $($(".mIqama").get(dayNumber)).html(data[i]["mIqama"]);
            $($(".eIqama").get(dayNumber)).html(addBoldOnIfTimeChange(i, data, "eIqama"));
        }
    }
    cleanUp(dayNumber);
}

function getDateToShow(month, date) {
    return months[month] + " " + date;
}

function getDayToShow(month, date) {
    return days[new Date(selectedDate.getFullYear(), month - 1, date).getDay()];
}

function cleanUp(dayNumber) {
    $("tbody").html($("tbody").html().replace(/am/ig, '').replace(/pm/ig, ''));
    const info = tobedeleted["data"]["Info"]["data"][0];
    masjidname.innerHTML = info["name"];
    masjidaddress.innerHTML = info["address"] + " " + info["city"] + ", " + info["state"] + " " + info["zip"];
    //hiding extra rows
    while (dayNumber < 31) {//if true there are rows to hide
        dayNumber++;
        $($(".Date").get(dayNumber)).parent().hide();
    }
}

function addBoldOnIfTimeChange(i, data, col) {
    let h = i - 1;//h is yester day i is today
    if (h == -1) {
        h = 364;
    }
    if (data[h][col] !== data[i][col]) {
        console.log(data[h][col] , data[i][col]);
        return "<b>"+data[i][col]+"</b>";
    }
    return data[i][col];
}

/* ui triggers */

function monthChanged() {
    params.set("month", document.getElementById("selectedMonth").value);
    let newUrl = location.protocol + "//" + location.hostname;
    if (location.port != "") {
        newUrl += ":" + location.port;
    }
    newUrl += location.pathname + "?" + params.toString();
    window.location = newUrl;
}