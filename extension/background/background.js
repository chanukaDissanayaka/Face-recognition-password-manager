//alert("background");


/**function getCookie(url) {
    chrome.cookies.get({url: 'http://127.0.0.1:5000', name: 'a'},
        function (cookie) {
            if (cookie) {
                console.log(cookie.value);
                chrome.tabs.create({
                active: false,
                url: 'http://127.0.0.1:5000/dashboard'
            }, function(tab) {
                chrome.tabs.executeScript(tab.id, {
                    code: 'localStorage.setItem("logged", "True");'
                }, function() {
                    chrome.tabs.remove(tab.id);
                });
            });
            } else {
                console.log('Can\'t get cookie! Check the name!');
                alert('Can\'t get cookie! Check the name!');
                return null;
            }
        });
}


function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            var logged;
            if(cookie ){
                alert("in");
            if (cookie.value != null){
                callback(cookie.value);
            if (cookie.value == "logged") {
                logged = true;
                chrome.tabs.create({
                    active: false,
                    url: 'http://127.0.0.1:5000'
                }, function (tab) {
                    chrome.tabs.executeScript(tab.id, {
                        code: 'localStorage.setItem("logged", "True");'
                    }, function () {
                        chrome.tabs.remove(tab.id);
                    });
                });
            }}
        }
            else{
                logged = false;
            }
        }
        alert(logged);
        return logged;
    });
}

getCookies("http://127.0.0.1:5000", "Login", function(value) {
    alert(value);
});

function parse_session() {
    var cookie = document.cookie('session');
    if (!cookie) return;
    // Is the content ziped ?
    var un_64 = "";
    if (cookie[0] == ".") {
        var data = cookie.split('.')[1].replace(/_/g, '/').replace(/-/g, '+');
        un_b64 = atob(data);
        un_b64 = pako.inflate(un_b64, {to: 'string'});
    } else {
        var data = cookie.split('.')[0].replace(/_/g, '/').replace(/-/g, '+');
        un_b64 = atob(data);
    }
    return jQuery.parseJSON(un_b64);
}**/



//check();