window.onload = function() {
    redirect_init();
}

var extractToken = function(hash) {
    var match = hash.match(/access_token=(\w+)/);
    return !!match && match[1];
};

var extractError = function(hash) {
          var match = hash.match(/error=(\w+)/);
          return !!match && match[1];
};

var redirect_init = function() {
    var error = extractError(document.URL);
    
    if (error) {
        console.log(error);
        window.close();
        return;
    }
    
    var params = {}, queryString = location.hash.substring(1),
    regex = /([^&=]+)=([^&]*)/g, m;
    
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
        
    window.opener.cb(params.access_token);
    window.close();
}
