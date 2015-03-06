var oauth = {};

window.onload = function() {
    init("749ac76825478dc", "token", "cb");
}

var init = function(client_id, type, callback) {
    oauth.client_id = client_id;
    oauth.type = type;
    oauth.callback = callback;
    
}

var login = function(url) {
    var url = "https://api.imgur.com/oauth2/authorize?" + 
        "client_id=" + oauth.client_id + 
        "&response_type=" + oauth.type + 
        "&state=" + oauth.callback;
    
    window.open(url, "popup", width=300, height=200);
}

var cb = function() {
    
}