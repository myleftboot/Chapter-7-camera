// All source code Copyright 2013 Cope Consultancy Services. All rights reserved


// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create base root window
//
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});

var options = Ti.UI.createView({layout: 'vertical'});

var showCamera = Ti.UI.createButton({title: 'Show Camera'});
var emailFromLibrary = Ti.UI.createButton({title: 'Email from photo library'});

function showPhoto(_args) {
	thePhoto.setImage(_args.media);
}

function emailPiccy(_args) {
	
	var toSend = Ti.UI.createEmailDialog({});
	//write the photo to a temp file which we can then attach to the email
	
	if (Ti.Platform.name === 'android') var photoFile = Titanium.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'./photo.jpg');
	else var photoFile = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'./photo.jpg');
    photoFile.write(_args.media);
	
	toSend.subject = 'A photo I took earlier';
	toSend.messageBody = 'Thinking of you...';
    toSend.addAttachment(photoFile);
    toSend.open();
    
}
var thePhoto = Ti.UI.createImageView({height: '30%', width: '30%'});

showCamera.addEventListener('click', function (e) {
Ti.Media.showCamera({animated: true,
	                 autoHide: true,
	                 saveToPhotoGallery: true,
	                 showControls: true,
	                 mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
	                 success:    function(e) {showPhoto(e)}
	                 })
});

emailFromLibrary.addEventListener('click', function(e) {
	Ti.Media.openPhotoGallery({
		autoHide:   true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
		success:    function(e) {emailPiccy(e)}
		});
});

options.add(showCamera);
options.add(emailFromLibrary);
options.add(thePhoto);
win1.add(options);
win1.open();
