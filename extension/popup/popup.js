document.getElementById('login-container').style.display = "none";
document.getElementById('if-Logged').style.display = "none";
document.getElementById('remove-btn').style.display = "none";

var logged =false;

function logout(){
    var port = chrome.extension.connect({
        name: "logout Communication"
    });
    port.postMessage("logout");
    port.onMessage.addListener(function(msg) {
        console.log("message recieved" + msg);
        alert(msg);
    });
}

function removeBtn(){
	chrome.tabs.getSelected(null,function(tab) {
    var url = tab.url;
	var login_id = localStorage.getItem('user_id');
	url = url + login_id;
	removePass(url);
	});
}

function removePass(url){
	 window.localStorage.removeItem(url);
	 document.getElementById('remove-btn').style.display = "none";
}

function genaratePopup(){
    var port = chrome.extension.connect({
        name: "gui Communication"
    });
    port.postMessage("generatePopUp");
    port.onMessage.addListener(function(msg) {
        console.log("message recieved" + msg);
        //alert("popup"+msg);
        if(msg == true){			
			document.getElementById('if-Logged').style.display = "block";
            document.getElementById('login-container').style.display = "none";
			
        }else{
            document.getElementById('if-Logged').style.display = "none";
            document.getElementById('login-container').style.display = "block";
        }
    });
	getURL();

}

function getURL(){
	chrome.tabs.getSelected(null,function(tab) {
    var url = tab.url;
	checkSavedPassword(url);
	});
}

function checkSavedPassword(url){
	
	var login_id = localStorage.getItem('user_id');
	url = url + login_id;
	var data = localStorage.getItem(url);
	
    if(data === null){
        document.getElementById('remove-btn').style.display = "none";
    }else{
		//alert('saved password');
        document.getElementById('remove-btn').style.display = "block";
    }
}

document.getElementById('logout').onclick = logout;
document.getElementById('remove-pass').onclick = removeBtn;
genaratePopup();