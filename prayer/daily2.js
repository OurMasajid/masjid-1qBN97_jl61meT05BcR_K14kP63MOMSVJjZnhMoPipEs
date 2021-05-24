/* 

if we plan to show prayer time change notification
think about the formula's for example in masjid taqwa
esha is after 5 min, so its changing everyday.
which means notification going to showup daily.

There might be option to show next day prayer regardless
of change. And highlight if there is change.

*/

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
 "masjidKey" : window.location.href.split("?")[1]
};
tobedeleted["dataurl"] = tobedeleted.masjidKey+"/data.json";
tobedeleted["data"]= "";
 

/*program start here*/
//  showLoading();
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
   let tomorrow;
   if (i === data.length - 1) {
     tomorrow = data[0];
   }
   else{
     tomorrow = data[i+1];
   }

   date.innerHTML = getFormatedDate(today);
   fajr.innerHTML = data[i]["Fajr"];
   sunrise.innerHTML = data[i]["Sunrise"];
   zuhr.innerHTML = data[i]["Zuhr"];
   asr.innerHTML = data[i]["Asr"];
   maghrib.innerHTML = data[i]["Maghrib"];
   esha.innerHTML = data[i]["Esha"];

   fajri.innerHTML = data[i]["fIqama"];
   fajrt.innerHTML = tomorrow["fIqama"];


   zuhri.innerHTML = data[i]["zIqama"];
   zuhrt.innerHTML = tomorrow["zIqama"];
   sunriset.innerHTML = tomorrow["Sunrise"];
   asri.innerHTML = data[i]["aIqama"];
   asrt.innerHTML = tomorrow["aIqama"];
   maghribi.innerHTML = data[i]["mIqama"];
   maghribt.innerHTML = tomorrow["mIqama"];
   eshai.innerHTML = data[i]["eIqama"];
   eshat.innerHTML = tomorrow["eIqama"];

  //  update.innerHTML = data[i]["Message"];
   
  //  hideLoading();
   return;
  }
 }
 //hideLoading();
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
