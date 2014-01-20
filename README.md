# jQuery scrollr

Scroll or drag through images

[demo/](http://robertbue.no/plugins/jquery.scrollr/demo.html)

## Usage

1. Include jQuery and GSAP:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.1/TweenMax.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.6/jquery.mousewheel.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.scrollr.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").scrollr({
	    images: imagesArray,
	    frames: 30,
	    distance: 5000
	});
	```