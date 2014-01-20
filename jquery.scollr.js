/*
 	scrollr - v0.0.1
 	jQuery plugin for scrolling or dragging through an array of images
	by Robert Bue (@robert_bue)

	Powered by the Greensock Tweening Platform
	http://www.greensock.com
	Greensock License info at http://www.greensock.com/licensing/
 	
 	Dual licensed under MIT and GPL.
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "scrollr",
        dataPlugin = "plugin_" + pluginName,
        
        // default options
        defaults = {
			images: new Array,
			frames: 0,
			distance: 5000
		};

    var privateMethod = function () {
        console.log("private method");
    };

    var Plugin = function ( element ) {
        this.options = $.extend( {}, defaults );
    };

    Plugin.prototype = {

        init: function ( options ) {

            $.extend( this.options, options );

            var base = this;

            base.settings = base.options,
            $target = $(base.element),
            w = $target.width(),
            h= $target.height(),
            base.scrolled = 0,
            base.currentFrame = 1,
            base.prevFrame = 0,
            base.playToFrame = 0,
            base.ticker = 0,
            prevTouchFrame = 0;

            // Mousewheel
			$target.on('mousewheel', function(event) {
			    base.scrolled += (event.deltaY * event.deltaFactor) * -1;
			});

			// Touch
			$target.hammer().on("drag", function(event) {
				event.gesture.preventDefault();

				//base.scrolled = event.gesture.center.pageX;
				//base.scrolled = Math.round(base.scrolled - (event.gesture.deltaX * event.gesture.velocityX));
				//asd = event.gesture.deltaX - prevTouchFrame;
				
				deltaX = event.gesture.deltaX;

				deltaX = Math.min(deltaX, 50);
			    deltaX = Math.max(deltaX, -50);

				base.scrolled = Math.round(base.scrolled - (deltaX * event.gesture.velocityX));
			});

			this.calcFrame = function() { 
				
				base.scrolled = Math.min(base.scrolled, base.settings.distance);
			    base.scrolled = Math.max(base.scrolled, 0);

			    base.currentFrame = Math.round((base.scrolled / base.settings.distance) * base.settings.frames);
			
				base.currentFrame = Math.min(base.currentFrame, base.settings.frames);
		        base.currentFrame = Math.max(base.currentFrame, 1);

		        if ( base.currentFrame != base.prevFrame ) {
		        	$target[0].src = base.settings.images[base.currentFrame];
		        }

		        base.prevFrame = base.currentFrame;
			}

			base.start(base);
        },

        start: function (base) {
            base.ticker = TweenMax.ticker;
			base.ticker.addEventListener("tick", base.calcFrame, this);
        },

        destroy: function () {
            this.element.data( dataPlugin, null );
        },

        // Public: go to frame
        goToFrame: function (goToFrameNumber) {

            base = this;

            if ( goToFrameNumber != base.currentFrame ) {
				
				// Go forwards or backwards?
				if ( goToFrameNumber > base.currentFrame ) {
					playToFrame = base.currentFrame + 1;
				} else {
					playToFrame = base.currentFrame - 1;
				}

				// Simulate user scroll length
				base.scrolled = (base.settings.distance / base.settings.frames) * playToFrame;

				// Set delayed call
				TweenMax.delayedCall(0.01, base.goToFrame, [goToFrameNumber], this);

			}
        }
    }

    $.fn[ pluginName ] = function ( arg ) {

        var args, instance;
        if (!( this.data( dataPlugin ) instanceof Plugin )) {
            this.data( dataPlugin, new Plugin( this ) );
        }

        instance = this.data( dataPlugin );
        instance.element = this;

        if (typeof arg === 'undefined' || typeof arg === 'object') {

            if ( typeof instance['init'] === 'function' ) {
                instance.init( arg );
            }
        } else if ( typeof arg === 'string' && typeof instance[arg] === 'function' ) {
            args = Array.prototype.slice.call( arguments, 1 );

            return instance[arg].apply( instance, args );
        } else {
            $.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);
        }
    };

}(jQuery, window, document));