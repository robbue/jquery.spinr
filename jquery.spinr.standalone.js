/*
 	spinr standalone - v0.0.1 (doesn't use TweenMax or hammer.js)
 	jQuery plugin for scrolling or dragging through an array of images
	by Robert Bue (@robert_bue)

 	Dual licensed under MIT and GPL.
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "spinr",
        dataPlugin = "plugin_" + pluginName,
        
        // default options
        defaults = {
			images: new Array,
			frames: 0,
            startFrame: 1,
			distance: 5000,
            mouseMovement: true,
            desktopDrag: false
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
            base.width = $target.width(),
            base.height = $target.height(),
            base.startFrame = Math.round(base.settings.startFrame),
            base.currentFrame = base.startFrame,
            base.prevFrame = base.startFrame - 1,
            base.playToFrame = 0,
            base.scrolled = Math.round((base.settings.distance / base.settings.frames) * base.startFrame),
            base.ticker = 0,
            prevTouchFrame = 0,
            startX = base.width / 2,
            base.scrolling = false;

            $target.addClass('scrollr');


            // Mousewheel
			$target.on('mousewheel', function(event) {

                clearTimeout(base.timer);
                
                if( !base.scrolling ) {
                    base.start(base);
                }

                base.scrolling = true;

                base.timer = setTimeout(function(){
                    base.scrolling = false;
                    base.stop(base);
                }, 500);


                base.scrolled += (event.deltaY * event.deltaFactor) * -1;
			});

            // Drag
            if ( base.settings.desktopDrag == true && base.settings.mouseMovement == false ) {
                
                $target.addClass('scr-drag');

                $target.on("mousedown touchstart pointerdown MSPointerDown", function(event) {
                    event.preventDefault();

                    base.start(base);

                    if ( event.type != "mousedown" ) {
                        var startX = event.originalEvent.changedTouches[0].pageX;
                    } else {
                        var startX = event.pageX;
                    }

                    $target.on("mousemove touchmove pointermove MSPointerMove", function(event) {
                        event.preventDefault();

                        if ( event.type != "mousemove" ) {
                            deltaX = event.originalEvent.changedTouches[0].pageX - startX;
                            startX = event.originalEvent.changedTouches[0].pageX;
                        } else {
                            deltaX = event.pageX - startX;
                            startX = event.pageX;
                        }

                        base.scrolled = Math.round(base.scrolled - (deltaX * 2.5));
                    });
      
                });

                $target.on("mouseup touchend pointerup MSPointerUp", function(event) {
                    base.stop(base);
                    $target.off("mousemove touchmove pointermove MSPointerMove");
                });
            } else {
                if ( base.settings.mouseMovement == true ) {
                    $target.addClass('scr-move');

                    $target.on("mousemove", function(event) {     
                        event.preventDefault();
                        console.log('mouseMovement')
                        base.scrolled = Math.round((base.settings.distance / base.width) * event.pageX);
                    });
                }
            }

            $(window).on("resize", function(event) {
                base.width = $target.width();
                base.height = $target.height();
            });

			this.loop = function() { 
                base.ticker = requestAnimationFrame(base.loop);
                base.calcFrame();
            }

            this.calcFrame = function(stop) { 
                
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

            base.calcFrame();
        },

        start: function (base) {
            base.loop(base);
        },

        stop: function (base) {
            cancelAnimationFrame(base.ticker);
            base.ticker = null;
        },

        destroy: function () {
            this.element.data( dataPlugin, null );
        },

        // Public: go to frame
        goToFrame: function (goToFrameNumber) {

            base = this;

            if ( goToFrameNumber != base.currentFrame ) {
				
				if ( !base.ticker ) {
                    base.start(base);
                }

                // Go forwards or backwards?
				if ( goToFrameNumber > base.currentFrame ) {
					playToFrame = base.currentFrame + 1;
				} else {
					playToFrame = base.currentFrame - 1;
				}

				// Simulate user scroll length
				base.scrolled = (base.settings.distance / base.settings.frames) * playToFrame;

				// Set delayed call
                setTimeout(function(){
                    base.goToFrame(goToFrameNumber);
                }, 10);

			} else {       
                base.stop(base);
            }
        }
    }

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
     
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
     
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
     
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

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