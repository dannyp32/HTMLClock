Parse.initialize("8Qjh3tBQ0K4jSausGG0uYFgGuOphWx4vUNAeIH4R", "6cYAt2RAJ7jL0A2G1sCHq6XufWI0U14qvG20Bsj4");

var showAlarmPopup = function() {
    $('#mask').removeClass('hide');
    $('#popup').removeClass('hide');
    
    
}

var fillMinsOptions = function () {
    
    for (var i = 0; i < 60; i++) {
        if (i < 10) {
            $('#mins').append('<option>0' + i + '</option>');    
        }
        else {
            $('#mins').append('<option>' + i + '</option>');
        }
            
    }
}

var hideAlarmPopup = function() {
    $('#mask').addClass('hide');
    $('#popup').addClass('hide');
}

var insertAlarm = function(time, alarmName, id) {
  $("#alarms").append("<div class='flexable'><div class='name'>" + alarmName + "</div><div class='alarm-time'>" + time + "</div><button class='delete-button' data-alarmId='"+ id + "'" + " onclick='removeAlarm(this)'>Delete</div></div>");
  $("#alarms").append("<div></div>");
}

var removeAlarm = function(obj) {
    var id = $(obj).attr('data-alarmId');
    
    console.log("id is" + id);
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.get(id, {
  success: function(alarmObj) {
    console.log("Alarm Object was retrieved successfully");
      alarmObj.destroy({});
      $(obj).parent().remove();
  },
  error: function(object, error) {
      console.log("Alarm Object could not be retrieved");
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
  }
});
}

var addAlarm = function() {
  var hours, mins, ampm, alarmName;
  hours = $("#hours option:selected").text();
  mins = $("#mins option:selected").text();
  ampm = $("#ampm option:selected").text();
  alarmName = $("#alarmName").val();
  var time = hours + ":" + mins + ampm;
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
          console.log("Success");
          console.log(object);
        insertAlarm(time, alarmName);
        hideAlarmPopup();
      }
    });
}

var getAllAlarms = function() {
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
              console.log(results[i]);
            insertAlarm(results[i].get("time"), results[i].get("alarmName"), results[i].id);
          }
        }
    });
}

getAllAlarms();
fillMinsOptions();