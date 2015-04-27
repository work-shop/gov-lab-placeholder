function height( target, selector ) { 
	selector.css({ 'min-height': $(window).height() * target }); 
}

function height_strict( target, selector ) { 
	selector.css({ 'height': $(window).height() * target }); 
}

function width( target, selector ) { 
	selector.css({ 'width': $(window).width() * target }); 
}

function equal_height( target, selector ) {
	selector.css({'height': selector.width() });
}

function equal_width( target, selector ) {
	selector.css({'width': selector.height() });
}

function arrow_size( target, selector ) {
	var coefficient = .05;

	selector.css({
		position: 'fixed',
		bottom: -(selector.height() / 2) + ($(window).height() * coefficient),
		left: 50 + '%'
	});
}

(function( $ ) {
	function recalculate() {
		for ( var selector in actionmap ) {
			var els = $(selector);
			if ( els.length > 0 ) {
				actionmap[ selector ].callback( 
					actionmap[ selector ].target,
					els
				); 
			}	
		}

		$(document).trigger('dom-is-sized');
	}

	var actionmap = 
	{ 
		'.five': {callback:height, target: .05},
		'.ten': {callback:height, target: .1},
		'.ten-strict': {callback:height_strict, target: .1},
		//'.one-quarter': {callback:height, target: .25},
		'.forty-five': {callback:height, target: .45},
		'.half': {callback:height, target: .5},
		'.half-h': {callback:width, target: .5},
		'.ninety': {callback: height, target: .9},
		'.ninety-h': {callback:width, target: .9},
		'.three-quarter': {callback: height, target: .75},
		'.all': {callback: height, target: 1},
		'.all-h': {callback:width, target: 1},
		'.all-strict': {callback:height_strict, target: 1},
		//'.double': {callback: height, target: 2},
		'.eighty-five': {callback: height, target: .85},
		'.height-is-width': {callback: equal_height, target: undefined },
		//'.width-is-height': {callback: equal_width, target: undefined }
		'#down-arrow': {callback: arrow_size , target: undefined }
	};

	$( document ).ready( function() {
		$('#loading').animate({opacity: 0}, 1000, function() { $( this ).hide(); });
		$(window).on('resize', recalculate);
		recalculate();
	});

	
	
})( jQuery );



