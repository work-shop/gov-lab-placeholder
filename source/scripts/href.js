/**
 * file: href.js
 * module: pollLocation
 *
 * This module sets up an interval based event on the window that is fired
 * if the window.location.href attribute has changed. This is a polling-based
 * module, so the even is only guaranteed to fire up to a specified interval –
 * the default epsilon here is 50ms.
 *
 * 
 * @emits [to: window] 'href-changed', 'window.location.href' as a parameter.
 * 
 */

var pollLocation = (function() {
	var oldLocation = window.location.href;

	var interval = undefined;
	var delay = 90;

	var pollLocation = function( run ) {
		if ( run ) {
			interval = window.setInterval(function() {
				if ( window.location.href !== oldLocation ) {
					$(window).trigger('href-changed', window.location.href);
					oldLocation = window.location.href;
				}
			}, 50);
		} else {
			if ( interval ) { window.clearInterval( interval ); }
		}
	}

	return pollLocation;
})();

