(function($) {
    
    var getTime = function() {
        var now     = new Date(); 
        var hour    = now.getHours();
        var minute  = now.getMinutes();

        if(minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        
        if (hour === 0) {
            hour = 12;
        }
        else if (hour > 12) {
            hour = hour - 12;
        }
        
        var time = hour+':'+minute;   
        return time;
    }
    
    var getSeconds = function() {
        var now = new Date();
        var seconds = now.getSeconds();
        
        if(seconds.toString().length == 1) {
            var seconds = '0' + seconds;
        }
        
        return seconds;
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
        $('.time').html(getTime() + '<span class=seconds>:'+getSeconds()+'</span>');
        
        setTimeout(updateTime, 1000);    
    }
    
    updateTime();
    $('.date').text(getDate());
})(jQuery);
