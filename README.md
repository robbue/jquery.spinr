# jQuery spinr

Scroll or drag through an array of images. Makes it possible to scroll through a "video" of images. Export frames from video, preload them and pass it to spinr that makes it scrollable and dragable on desktop and touch-devices.

It has a lot of dependencies (jQuery, TweenMax, mousewheel and hammer.js plugin). Why? Because they make your life much easier, and I use them in every project.

**UPDATE:** Use the standalone version if you don't use TweenMax or hammer.js, Mousewheel plugin is still needed because of normalizing the mousewheel across browsers.

[Click here for demo](http://robertbue.no/plugins/jquery.spinr/)

[Click here for demo (standalone)](http://robertbue.no/plugins/jquery.spinr/standalone.html)

## Browser Support Details

All modern browsers, including IE8 and touch devices.
Standalone have less support on touch devices.

## Usage

1. Include (don't include TweenMax or hammer.js if you use standalone version):

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.6/jquery.mousewheel.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.6/hammer.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.6/jquery.hammer.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.spinr.js"></script>
	```

3. Create a img-tag:

	```javascript
	<img src="" alt="" id="element">
	```

4. Call the plugin (the images needs to be preloaded for smooth scrolling):

	```javascript
	$("#element").spinr({
	    images: imagesArray,
	    frames: 30,
	    distance: 5000
	});
	```

## Public Methods
	
Moves to selected frame: 

	$('#element').spinr('goToFrame', frameNumber);


## License

This plugin is available under the [MIT license](http://opensource.org/licenses/mit-license.php).

## Author

Made by [Robert Bue](http://robertbue.no)