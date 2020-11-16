/*alert('getimage');

const upload3 = document.getElementById("upload3");
const canvas = document.getElementById('canvas');

upload3.addEventListener('click', () => {
		console.log('clicked');
        var dataUrl = canvas.toDataURL("image/jpeg", 0.85);
		console.log(dataUrl);
        
		chrome.runtime.sendMessage({'msg': "getImage", 'imgBase64': dataUrl}, function (response) {
			alert('response' + response);
		});
});*/