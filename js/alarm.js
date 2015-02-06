var showAlarmPopup = function() {
    $('#mask').removeClass('hide');
    $('#popup').removeClass('hide');
}

var hideAlarmPopup = function() {
    $('#mask').addClass('hide');
    $('#popup').addClass('hide');
}

var insertAlarm = function(hours, mins, ampm, alarmName) {
  $("#alarms").append("<div  class='flexable'><div class='name'>" + alarmName + "</div><div class='alarm-time'>" + hours + ":" + mins + ampm + "</div></div>");
  $("#alarms").append("<div></div>");
}

var addAlarm = function() {
  var hours, mins, ampm, alarmName;
  hours = $("#hours option:selected").text();
  mins = $("#mins option:selected").text();
  ampm = $("#ampm option:selected").text();
  alarmName = $("#alarmName").val();
  insertAlarm(hours, mins, ampm, alarmName);
  hideAlarmPopup();
}