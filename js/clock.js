(function($) {
    
    var getTime = function() {
        var now     = new Date(); 
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var seconds = now.getSeconds();
        
        if(minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if(seconds.toString().length == 1) {
            var seconds = '0' + seconds;
        }
        
        if (hour === 0) {
            hour = 12;
        }
        else if (hour > 12) {
            hour = hour - 12;
        }
        
        var time = { 
            hour: hour, 
            minute: minute, 
            seconds: seconds 
        };
        
        return time;
    }
    
    function getDate() {
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = months[now.getMonth()]; 
        var day     = now.getDate();
        var dayOfWeek = weekdays[now.getDay()];
        
        if(day.toString().length == 1) {
            var day = '0'+day;
        }   

        var date = dayOfWeek + ", " + month + " " + day + ", " + year;
        return date;
    }
    
    var updateTime = function () {
        var t = getTime();
        $('.time').html(t.hour + ":" + t.minute + '<span class=seconds>:'+ t.seconds +'</span>');
        
        if (t.minute === '00') {
            $('.date').text(getDate());
        }
        
        setTimeout(updateTime, 1000);    
    }
    
    updateTime();
    $('.date').text(getDate());
    
})(jQuery);
