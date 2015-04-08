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
				act_trigger_inverse,
				fade_out,
				fade_in
			],
			'#contact-block': [
				dark_gray_trigger,
				act_trigger,
				fade_out,
				fade_in,
				
			]

		};


		/** [1]. arrow target swap machine */
		/** [2]. animation trigger */
		$(window).on('scroll', function() {
			update_anchor_target( select_next_block( block ), $('#arrow-icon') );

			do_block_action( $('.block, #bot').filter(':in-viewport'), action_map );

		});

		$(document).one('dom-is-sized', function() {

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
	var delta = 5;

	var currentviews = block.filter(':in-viewport')
	  , nextviews =  block.filter(':below-the-fold');

	var currentview = currentviews.last(),
	    nextview = nextviews.first();

	var epsilon = Math.abs( $(window).scrollTop() - currentview.offset().top );

	if ( currentviews.length == 1 ) { 

		return nextview; 

	} else if ( currentviews.length > 1 ) { 

		return ( epsilon < delta ) ? nextview : currentview; 

	} else {
		
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

	$('#down-arrow').fadeOut(300);

}

function act_trigger_inverse( current ) {

	$('#down-arrow').fadeIn(400);

} 

/** Bottom Bars Callout Text Cue */

function fade_in( current ) {
	$('#' + current.last().prev('section').attr('id') + '-cue' ).fadeIn();
	$('#' + current.last().next('section').attr('id') + '-cue' ).fadeIn();
}

function fade_out( current ) {
	$('#' + current.last().attr('id') + '-cue' ).fadeOut();
}



/** [1]. arrow target swap machine - callback */

function update_anchor_target( next, selector ) {
	
	selector.off();

	selector.one('click', function( e ) {

		console.log( '\n\nclick callback triggered.' );
		console.log( next );

		selector.off();
		if ( next.length > 0 ) {
			$('html, body').animate({
				scrollTop: next.offset().top
			}, 1500);
		} 

		//do_block_action( select_next_block( $('.block' ) ), action_map );
	});

}


/**
 * This method iterates through a set of registered actions
 * ( of the form 'selecter id' => array( current block => void )' )
 * and executes the appropriate actions for the last valid block
 * in the viewport
 *
 * @param block jQuery object representing the set of matched blocks
 * @param actions [selecter id' => array( current block => void )]
 *
 */
function do_block_action( block, actions ) {
	block = block.last();

	var id = '#' + block.attr('id');

	if ( id && actions[ id ] ) {

		if ( actions[id].length ) {

			actions[id].forEach( function( action ) { action( block ); } );

		} else {

			 actions[id]( block );

		}

	}
}




