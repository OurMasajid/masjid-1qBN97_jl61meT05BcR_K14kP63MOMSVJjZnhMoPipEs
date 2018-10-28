var OM = {
  url: "",
  defaultUrl: "./data.json",
  data: "",
  today: new Date(),
  todayDay: new Date().getDate(),
  todayMonth: new Date().getMonth() + 1,
  tomorrow: new Date(+new Date() + 86400000),
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  feedDataToComponents: function() {
    if ($(".m-calendar")) {
      setTimeout(MCalendar.start());
    }
    if ($(".daily-prayer")) {
      setTimeout(DailyPrayer.start());
    }
    if ($(".jumma-prayer")) {
      setTimeout(JummaPrayer.start());
    }
  },
  httpLoader: function(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        OM.data = JSON.parse(this.responseText);
        eval(callback);
      }
    };
    var url = "";
    if (this.url) {
      url = this.url;
    } else {
      url = this.defaultUrl;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
  },
  getNext7DaysPrayerTime: function() {},

  getFormatedDate: function(date) {
    var result = OM.dayNames[date.getDay()] + ", ";
    result += OM.monthNames[date.getMonth()] + " ";
    var dateNumber = date.getDate();
    if (dateNumber.toString().length == 1) {
      dateNumber = "0" + dateNumber;
    }
    result += dateNumber;
    return result;
  },
  getFormatedTime: function(datetime) {
    var hours = datetime.getHours();
    var mins = datetime.getMinutes();
    var ampm = "am";
    if (hours > 12) {
      hours = hours - 12;
      ampm = "pm";
    }
    if (mins.toString().length === 1) {
      mins = "0" + mins;
    }
    return hours + ":" + mins +ampm;
  },
  start: function() {
    setTimeout(this.httpLoader("OM.feedDataToComponents()"));
  }
};
var DailyPrayer = {
  dateUI: $(".daily-prayer").find(".date"),

  fajrUI: $(".daily-prayer").find(".fajr"),
  fajriUI: $(".daily-prayer").find(".fajri"),

  sunriseUI: $(".daily-prayer").find(".sunrise"),

  zuhrUI: $(".daily-prayer").find(".zuhr"),
  zuhriUI: $(".daily-prayer").find(".zuhri"),

  asrUI: $(".daily-prayer").find(".asr"),
  asriUI: $(".daily-prayer").find(".asri"),

  maghribUI: $(".daily-prayer").find(".maghrib"),
  maghribiUI: $(".daily-prayer").find(".maghribi"),

  eshaUI: $(".daily-prayer").find(".esha"),
  eshaiUI: $(".daily-prayer").find(".eshai"),
  start: function() {
    var ui = $(".daily-prayer");
    if (!ui) {
      console.log(
        "daily prayer ui does not exsist. make sure daily-prayer class is added to the parent div"
      );
      return false;
    }
    if (!OM.data["Daily Prayer"]["data"]) {
      console.log("missing data, where is the Daily Prayer data?");
      return false;
    }
    setTimeout(this.getTodaysData());
  },
  createDateFromDayMonth: function(day, month) {
    day = day.toString();
    month = month - 1;
    month = month.toString();
    if (day.length == 1) {
      day = 0 + day;
    }
    if (month.length == 1) {
      month = 0 + month;
    }
    var date = new Date(new Date().getFullYear(), month, day);
    return OM.getFormatedDate(date);
  },
  getTodaysData: function() {
    for (var i = 0; i < OM.data["Daily Prayer"]["data"].length; i++) {
      var day = OM.data["Daily Prayer"]["data"][i];
      if (day["Month"] == OM.todayMonth && day["Date"] == OM.todayDay) {
        this.dateUI.html(
          this.createDateFromDayMonth(day["Date"], day["Month"])
        );

        this.fajrUI.html(day["Fajr"]);
        this.fajriUI.html(day["fIqama"]);

        this.sunriseUI.html(day["Sunrise"]);

        this.zuhrUI.html(day["Zuhr"]);
        this.zuhriUI.html(day["zIqama"]);

        this.asrUI.html(day["Asr"]);
        this.asriUI.html(day["aIqama"]);

        this.maghribUI.html(day["Maghrib"]);
        this.maghribiUI.html(day["mIqama"]);

        this.eshaUI.html(day["Esha"]);
        this.eshaiUI.html(day["eIqama"]);
        return;
      }
    }
  }
};

var JummaPrayer = {
  jummaData: "",
  ui: $(".jumma-prayer").parent(),
  start: function() {
    this.jummaData = OM.data["Jumma"]["data"];
    if (!this.ui) {
      console.log(
        "jumma prayer ui does not exsist. make sure jumma-prayer class is added to jumma table/div"
      );
      return false;
    }
    if (!this.jummaData) {
      console.log("missing data variable, where is the masjid data?");
      return false;
    }
    setTimeout(this.setJummaData());
  },
  setJummaData: function() {
    var uiHtml = this.ui.clone();
    this.ui.html("");
    var jummaNumber = ["First", "Second", "Third", "Forth"];
    for (i = 0; i < this.jummaData.length; i++) {
      if (this.jummaData.length > 1) {
        uiHtml.find(".jumma-number").html(jummaNumber[i]);
      }
      uiHtml.find(".khutba").html(this.jummaData[i]["Khutba"]);
      uiHtml.find(".khateeb").html(this.jummaData[i]["Khateeb"]);
      uiHtml.find(".language").html(this.jummaData[i]["Language"]);
      uiHtml.find(".iqama").html(this.jummaData[i]["Iqama"]);

      if (!this.jummaData[i]["Khutba"]) {
        uiHtml.find(".khutba-row").remove();
      }
      if (!this.jummaData[i]["Khateeb"]) {
        uiHtml.find(".khateeb-row").remove();
      }
      if (!this.jummaData[i]["Language"]) {
        uiHtml.find(".language-row").remove();
      }
      if (!this.jummaData[i]["Iqama"]) {
        uiHtml.find(".iqama-row").remove();
      }
      this.ui.append(uiHtml.html());
    }
  }
};
var MCalendar = {
  data: "",
  uiParent: $(".m-calendar"),
  uiEvent: $(".m-calendar")
    .find(".event")
    .clone(),
  start: function() {
    this.data = OM.data["Calendar"]["Event Data"];
    setTimeout(this.setData());
  },
  setData: function() {
    this.uiParent.html("");
    for (let i = 0; i < this.data.length; i++) {
      var uiEvent = this.uiEvent.clone();
      var obj = this.data[i];
      uiEvent.find(".event-title").html(obj["title"]);
      if (obj["location"]) {
        uiEvent.find(".event-location").html(obj["location"]);
      }
      else{
        uiEvent.find(".event-location").remove();
      }
      if (obj["description"]) {
        uiEvent.find(".event-description").html(obj["description"]);
      }
      else{
        uiEvent.find(".event-description").remove();
      }
      uiEvent
        .find(".event-time")
        .html(this.getEventTime(obj["starttime"], obj["endtime"]));
      this.uiParent.append(uiEvent);
    }
    
  },
  getEventTime: function(start, end) {
    start = new Date(start);
    end = new Date(end);
    return (
      OM.getFormatedDate(start) +
      " | " +
      OM.getFormatedTime(start) +
      " - " +
      OM.getFormatedTime(end)
    );
  }
};
