(function($) {
	$(document).ready(function () {
		var block = $('.block');

		/* 
			There are two scroll-triggered functions we need, especially.

			1) a routine to swap out the target of the downarrow, and install an animate handler.

			2) a routine to queue the animation on the callout when we've hit the #act-trigger block, or 
			    alternatively the bottom of the page.
		*/
		var action_map = {
			'#landing-block': [
				gray_trigger,
				fade_in
			],
			'#about-block': [
				brand_trigger,
				fade_out,
				fade_in
			],
			'#process-block-1': [
				dark_gray_trigger,
				fade_out,
				fade_in
			],
			'#process-block-2': [
				gray_trigger
			],
			'#process-block-3': [
				dark_gray_trigger,
				fade_out,
				fade_in
			],
			'#projects-block': [
				dark_gray_trigger,
				fade_out,
				fade_in
			],
			'#contact-block': [
				dark_gray_trigger,
				act_trigger_inverse,
				fade_out,
				fade_in
			],
			'#bot': [
				act_trigger
			]

		};


		/** [1]. arrow target swap machine */
		/** [2]. animation trigger */
		$(window).on('scroll', function() {

			update_anchor_target( select_next_block( block ), $('#arrow-icon') );

			do_block_action( $('.block, #bot').filter(':in-viewport'), action_map );

		});

		$(document).on('dom-is-sized', function() {

			update_anchor_target( select_next_block( block ), $('#down-arrow') );

		});
	});
})( jQuery );

/**
 * This routine reduces the set of potential arrow-targets to
 * the next block;
 *
 */
function select_next_block( block ) {
	var currentview = block.filter(':in-viewport')
	  , nextview =  block.filter(':below-the-fold');

	if ( currentview.length == 1 ) { return nextview.first(); }

	else if ( currentview.length > 1 ) { return currentview.last(); }

	else {
		
		console.log('no blocks!');
		return false;
	}
}

/** Arrow Color Change Functions */

function brand_trigger( current ){
	$('#arrow-icon').removeClass('gray').removeClass('dark-gray').addClass('brand');
}

function gray_trigger( current ){
	$('#arrow-icon').removeClass('brand').removeClass('dark-gray').addClass('gray');
}

function dark_gray_trigger( current ){
	$('#arrow-icon').removeClass('brand').removeClass('gray').addClass('dark-gray');
}

/** Arrow Animation Trigger */

function act_trigger( current ) {
	/* Not Cursor Pointer */

	$('#down-arrow').fadeOut(300);

	// if ( !($('#down-arrow').hasClass( 'animation-active')) )  {
	// 	$('#down-arrow' ).addClass( 'animation-active');
	// }
}

function act_trigger_inverse( current ) {

	$('#down-arrow').fadeIn(400);
	//$('#down-arrow').removeClass('animation-active');
} 

/** Section Introduction Text Cue */

function fade_in( current ) {
	$('#' + current.last().prev('section').attr('id') + '-cue' ).fadeIn();
	$('#' + current.last().next('section').attr('id') + '-cue' ).fadeIn();
}

function fade_out( current ) {
	//console.log( $('#' + current.last().attr('id') + '-cue' ) );
	$('#' + current.last().attr('id') + '-cue' ).fadeOut();
}



/** [1]. arrow target swap machine - callback */

function update_anchor_target( next, selector ) {
	
	selector.off();
	selector.one('click', target_handler( next ) );
}

function target_handler( target ) {
	return function() {
		console.log( "target parameter to 'target_handler':");
		console.log( target );

		if ( target.length > 0 ) {
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1500);
		} 
	};
}




/** [2]. animation trigger - callback */

function do_block_action( block, actions ) {
	block = block.last();

	console.log( '\n\n current block.last() :::');
	console.log( block );

	var id = '#' + block.attr('id');

	if ( id && actions[ id ] ) {

		if ( actions[id].length ) {

			actions[id].forEach( function( action ) { action( block ); } );

		} else {

			 actions[id]( block );

		}

	}
}




