# Face-recognition-password-manager
A chrome extension to manage passwords using face recognition.

Web browsers has a feature to save user passwords and automatically fill them upon visiting to that particular site. 
This might lead to a security issue because anyone having access to the browser can login in to the accounts uisng saved passwords.
That issue can be overcome with this extesion enabled in the chrome browser.

Before filling a saved password in the password field, this extension capture an image of the user and verify if it is the actual user.
Then only the password will be filled into the password field. Otherwise it will not fill the password.

Server side is implemented using python Flask and for the face recognition VGG16 model and openCV is used. 

