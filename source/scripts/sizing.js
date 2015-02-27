function height( target, selector ) { 
	console.log('called');
	selector.height( $(window).height() * target ); 
}

(function( $ ) {
	function recalculate() {
		for ( var selector in actionmap ) {
			actionmap[ selector ].callback( 
				actionmap[ selector ].target,
				$(selector)
			); 
		}
	}

	var actionmap = 
	{ 
		'.one-quarter': {callback:height, target: .25},
		'.half': {callback:height, target: .5},
		'.ninety': {callback: height, target: .9},
		'.three-quarter': {callback: height, target: .75},
		'.all': {callback: height, target: 1},
		'.double': {callback: height, target: 2}
	};

	$( document ).ready( function() {
		$(window).on('resize', recalculate);
		recalculate();
	});
	
})( jQuery );