function loader(vartosaveto, url, callback) {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     eval(vartosaveto +"="+ this.responseText);
     eval(callback);
   }
 };
 xhttp.open("GET", url, true);
 xhttp.send();
}
var tobedeleted = {
 "dataurl" : dataurl
};
tobedeleted["data"]= "";
 

/*program start here*/
loader("tobedeleted.data", tobedeleted.dataurl, "createHTML()");

const today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const monthNames = [
 "January", "February", "March",
 "April", "May", "June", "July",
 "August", "September", "October",
 "November", "December"
];
const dayNames = [
 "Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

function createHTML(){
 let data = tobedeleted["data"]["Daily Prayer"]["data"];
 
 for (let i = 0; i < data.length; i++) {
  /* finding todays date */
  if(today.getMonth()+1 == data[i]["Month"] && today.getDate() == data[i]["Date"]){
   date.innerHTML = getFormatedDate(today);
   fajr.innerHTML = data[i]["Fajr"];
   sunrise.innerHTML = data[i]["Sunrise"];
   zuhr.innerHTML = data[i]["Zuhr"];
   asr.innerHTML = data[i]["Asr"];
   maghrib.innerHTML = data[i]["Maghrib"];
   esha.innerHTML = data[i]["Esha"];

   fajri.innerHTML = data[i]["fIqama"];
   zuhri.innerHTML = data[i]["zIqama"];
   asri.innerHTML = data[i]["aIqama"];
   maghribi.innerHTML = data[i]["mIqama"];
   eshai.innerHTML = data[i]["eIqama"];

   update.innerHTML = data[i]["Message"];
   
   
   return;
  }
 }
 
}

function getFormatedDate(date){
 let result = dayNames[date.getDay()]+", ";
 result += monthNames[date.getMonth()]+" ";
 let dateNumber = date.getDate();
 if(dateNumber.toString().length ==1){
  dateNumber= "0"+dateNumber;
 }
 result += dateNumber;
 return result;
}
