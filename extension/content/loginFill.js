
var url = location.href;

function checkDocumentForLoginsFill() {
    forms = document.getElementsByTagName('form');
    if (forms.length > 0){

        for (each of forms){
            var i;
            var passCount = 0;

            for(i = 0; i<each.length; i++){

                e = each.elements[i]
                if (e.type == "password"){
                    passCount++;
                }
            }
            if(passCount == 1){
                return true;
            }else{
                return false;
            }
        }
    }else{
        return false;
    }
}

function getLoginForm(){
    forms = document.getElementsByTagName('form');
    if (forms.length > 0){

        for (each of forms){
            var i;
            var passCount = 0;

            for(i = 0; i<each.length; i++){

                e = each.elements[i]
                if (e.type == "password"){
                    passCount++;
                }
            }
            if(passCount == 1){
                return each;
            }else{
                return false;
            }
        }
    }
}

function fillPass(form){
    chrome.runtime.sendMessage({'msg': "getCred", 'url':url}, function (response) {
        var data = response;
        var username = data.username;
        var password = data.password;
        //alert('username '+ username);
		
        chrome.runtime.sendMessage({'msg': "verifyFace"}, function (response) {
            //alert(response + 'loginFillContent');
            if (response === true) {
				alert('face verified');
                for (i = 0; i < form.length; i++) {

                    e = form.elements[i];
                    if (e.type == "password") {
                        e.value = password;
                    }
                    if (e.type == "text") {
                        e.value = username;
                    }
                }
            }
			else{
				alert('face authentication failed');
			}
        });
    });
}
chrome.runtime.sendMessage({'msg': "checkLogin", 'url':url}, function (response) {
    if(response === true) {
        var loginF = checkDocumentForLoginsFill();
        if (loginF == false) {
        }else {
            var form = getLoginForm();
            chrome.runtime.sendMessage({'msg': "checkUrl", 'url': url}, function (response) {
                if (response == true) {
                    fillPass(form);
                } else {
                }
            });

            /**else if (form != "null") {
                chrome.runtime.sendMessage({'msg': "checkUrl", 'url': url}, function (response) {
                    alert('before fill pass ' + response);
                    if (response == true) {
                        alert('insided');
                        fillPass(form);
                    } else {
                        alert('url not in storage');
                    }
                });
            }*/
        }
    }
});

