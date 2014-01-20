# jQuery scrollr

Scroll or drag through an array of images. You should preload the images first.

It has a lot of dependencies (jQuery, GSAP, mousewheel and hammer.js plugin). Why? Because I use them in every project. Maybe I'll make a slightly more dependency-free version in the future.

[demo/](http://robertbue.no/plugins/jquery.scrollr/)

## Usage

1. Include:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.6/jquery.mousewheel.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.6/hammer.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/hammer.js/1.0.6/jquery.hammer.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.scrollr.js"></script>
	```

3. Create a img-tag:

	```javascript
	<img src="" alt="" id="element">
	```

4. Call the plugin:

	```javascript
	$("#element").scrollr({
	    images: imagesArray,
	    frames: 30,
	    distance: 5000
	});
	```