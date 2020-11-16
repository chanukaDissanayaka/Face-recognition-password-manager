//alert("started");
//checkDocumentForLogins();


chrome.runtime.sendMessage({'msg': "checkLogin"}, function (response) {
    //alert("checkLogin savePass "+response);
    if(response == true){
        //alert('checkDocForLogin()');
        var loginform = checkDocumentForLogins();
        //alert(loginform +"savePass loginform");
        if(loginform == true) {
            //alert('running savePass');
            savePass();
        }
    }
});




function checkLogin2(){
    var login;
    let myFoo=function(response){
        this.login = reponse;
        return this.login;
    }
    chrome.runtime.sendMessage({'msg': "checkLogin"}, myFoo.bind(this));
}


function checkDocumentForLogins() {
    forms = document.getElementsByTagName('form');
    if (forms.length > 0){
		var loginForms =0 ;

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
                loginForms ++ ;
            }else{

            }
        }
		
		if (loginForms > 0) {
			//alert('contains a login form');
			return true;
		}else{
			//alert('not contains a login form');
			return false;
		}
    }
}

function savePass() {
    $(function () {
        var passwordBoxes = $("input[type=password]"),
            getMessage = function (username, password, url) {
                return "Username: " + username + " || Password: " + password + " || Url: " + url;
            },

            process = function (callback) {
                var username = $("input[type=text]").not(passwordBoxes).filter(function () {
                        var field = $(this);
                        return field.val() || field.html();
                    }).val(),
                    password = passwordBoxes.val();

                var msg = getMessage(username, password, location.href);
                //alert(msg);
                /**var checkExists = function(response, sender, sendResponse) {
                this.color = response.data;
            };
                 chrome.runtime.sendMessage({'msg': "checkStorage",'url': location.href }, function(response),
                 checkExists.bind(this));


                 function checkExists(){
                let myFoo=function(response){
                    console.log(response);
                    this.exists = reponse;
                }
                chrome.runtime.sendMessage({'msg': "checkStorage",'url': location.href }, myFoo.bind(this));
            }***/

                chrome.runtime.sendMessage({'msg': "checkStorage", 'url': location.href}, function (response) {
                    var exists = response;
                    if (exists == false) {
                        var conf = confirm("save this password?");
                        if (conf === true) {
                            var data = {
                                username: username,
                                password: password,
                                location: location.href
                            };
                            chrome.runtime.sendMessage({'msg': "savePassword", 'data': data}, function (response) {
                                console.log(response);
                            });
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: 'http://127.0.0.1:5000/savePass',
                                data: JSON.stringify({username: username, password: password, url: location.href}),
                                success: function (data) {
                                    console.log(data.username);
                                    console.log(data.password);
                                    console.log(data.url);
                                },
                                dataType: "json",
                            });
                        }
                    } else {
                        //alert('already saved');
                    }
                });
            };


        $("form").submit(function (e) {
            var $this = $(this);

            process(function () {
                $this.unbind('submit');
            });
        });
    });
}