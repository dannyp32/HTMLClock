Parse.initialize("8Qjh3tBQ0K4jSausGG0uYFgGuOphWx4vUNAeIH4R", "6cYAt2RAJ7jL0A2G1sCHq6XufWI0U14qvG20Bsj4");

var showAlarmPopup = function() {
    $('#mask').removeClass('hide');
    $('#popup').removeClass('hide');
}



var animateSwitch = function(obj) {
    var isOn = $(obj).hasClass('off');
    
    console.log("INSIDE ANIMATE SWITCH");
    console.log(obj);
    var id = $(obj).attr('data-alarmId');
    console.log(id);
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.get(id, {
        success: function(alarmObj) {
            console.log("Alarm Object was retrieved successfully");
                alarmObj.save({"isOn": isOn}, {
                    success: function(object) {
                        console.log("Success");
                        console.log(object);
                        $(obj).toggleClass('off');
                    }
                });
        },
            error: function(object, error) {
            console.log("Alarm Object could not be retrieved");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });
    /*
    alarmObject.save({"time": time,"alarmName": alarmName, "isOn": isOn}, {
        success: function(object) {
            console.log("Success");
            console.log(object);
            insertAlarm(time, alarmName, isOn);
            hideAlarmPopup();
        }
    });
    */
}

var toggleSwitch = function(obj) {
    console.log('this one works');
    animateSwitch(obj);
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

var insertAlarm = function(time, alarmName, id, isOn) {
    var off = "off";
    
    if (isOn) {
        off = "";
    }
    
    $('.alarms').append("<div class='alarm-wrapper'><div class='name-and-time'><div class='alarm-time'>" + time + "</div><div class='alarm-name'>" + alarmName + "</div></div><div class='switch " + off + "' data-alarmId='" + id + "' onclick='toggleSwitch(this)'><div class='circle'></div></div><img class='alarm-trash' data-alarmId='" + id + "' src='images/trash.png' onclick='removeAlarm(this)'></div>");
 
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
    var hours, mins, ampm, alarmName, switchState;
    hours = $("#hours option:selected").text();
    mins = $("#mins option:selected").text();
    ampm = $("#ampm option:selected").text();
    alarmName = $("#alarmName").val();
    
    var time = hours + ":" + mins + ampm;
    var isOn = true;
    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
        alarmObject.save({"time": time,"alarmName": alarmName, "isOn": isOn}, {
        success: function(alarmObj) {
            console.log("Success");
            console.log(alarmObj);
            insertAlarm(time, alarmName, alarmObj.id, isOn);
            hideAlarmPopup();
        }
    });
}

var getAllAlarms = function() {
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    debugger;
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
              console.log(results[i]);
            insertAlarm(results[i].get('time'), results[i].get('alarmName'), results[i].id, results[i].get('isOn'));
          }
        }
    });
}

getAllAlarms();
fillMinsOptions();