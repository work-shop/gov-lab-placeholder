(function($) {
	$(document).ready(function () {
		/* 
			There are two scroll-triggered functions we need, especially.

			1) a routine to swap out the target of the downarrow, and install an animate handler.

			2) a routine to queue the animation on the callout when we've hit the #act-trigger block, or 
			    alternatively the bottom of the page.
		*/
		var action_map = {
			'#landing-block': [
				{forward: gray_trigger},
				{ backward: fade_in }
			],
			'#about-block': [
				{forward: brand_trigger},
				{forward: fade_out, backward: fade_in }
			],
			'#process-block-1': [
				{forward: dark_gray_trigger},
				{forward: fade_out, backward: fade_in }
			],
			'#process-block-2': [
				{forward: gray_trigger}
			],
			'#process-block-3': [
				{forward: dark_gray_trigger},
				{forward: fade_out, backward: fade_in }
			],
			'#projects-block': [
				{forward: dark_gray_trigger}, 
				{forward: fade_out, backward: fade_in }
			],
			'#contact-block': [
				{forward: dark_gray_trigger},
				{forward: act_trigger_inverse},
				{forward: fade_out, backward: fade_in }
			],
			'#bot': [
				{forward: act_trigger }
			]

		}


		/** [1]. arrow target swap machine */
		/** [2]. animation trigger */
		$(window).on('scroll', function() {
			update_anchor_target( $('.block:below-the-fold' ), $('#arrow-icon') );
			do_block_action( $('.block:in-viewport'), action_map );
		});

		$(window).on('resize', function() {
			update_anchor_target( $('.block:below-the-fold' ), $('#arrow-icon') );
			do_block_action( $('.block:in-viewport'), action_map );
		});

		update_anchor_target( $('.block:below-the-fold' ), $('#down-arrow') );
	});
})( jQuery );

function brand_trigger( current ){
	$('#arrow-icon').removeClass('gray').removeClass('dark-gray').addClass('brand');
}

function gray_trigger( current ){
	$('#arrow-icon').removeClass('brand').removeClass('dark-gray').addClass('gray');
}

function dark_gray_trigger( current ){
	$('#arrow-icon').removeClass('brand').removeClass('gray').addClass('dark-gray');
}

function act_trigger( current ) {
	if ( !($('#down-arrow').hasClass( 'animation-active')) )  {
		$('#down-arrow' ).addClass('animation-active');
	}
}

function act_trigger_inverse( current ) {
	$('#down-arrow').removeClass('animation-active');
} 

function fade_in( current ) {
	$('#' + current.last().prev('section').attr('id') + '-cue' ).fadeIn();
	$('#' + current.last().next('section').attr('id') + '-cue' ).fadeIn();
}

function fade_out( current ) {
	console.log( $('#' + current.last().attr('id') + '-cue' ) );
	$('#' + current.last().attr('id') + '-cue' ).fadeOut();
}

/** [1]. arrow target swap machine - callback */

function update_anchor_target( next, selector ) {
	selector.off();
	selector.on('click', target_handler( next ) );
}

function target_handler( target, selector ) {
	return function() {
		if ( target.length > 0 ) {
			//selector.css({'z-index': 1000});
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1500);
		} else {
			selector.off('click');
			selector.css({'z-index': 500});
			// $('html, body').animate({
			// 	scrollTop: 0
			// }, 1500);
		}	
	};
}


/** [2]. animation trigger - callback */

function do_block_action( block, actions ) {
	console.log( block );
	var id = '#' + block.last().attr('id');
	if ( id && actions[ id ] ) {
		if ( actions[id].length ) {
			actions[id].forEach(function( action ) {
				if (action.forward) action.forward( block );
				if (action.backward) action.backward( block );
			});
		} else {
			if (actions[id].forward) actions[id].forward( block );
			if (actions[id].backward) actions[id].backward( block );
		}
	}
}




