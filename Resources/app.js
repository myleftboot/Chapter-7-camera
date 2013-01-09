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

function showPhoto(_args) {
	thePhoto.setImage(_args.media);
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

options.add(showCamera);
options.add(thePhoto);
win1.add(options);
win1.open();
