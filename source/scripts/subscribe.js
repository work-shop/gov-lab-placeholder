(function($) {
	$(document).ready( function() {

		$('#mc-embedded-subscribe-form').ajaxChimp({
			callback: function( resp ) {
				console.log( resp );

				if ( resp.result == "success" ) close_form_overlay_success( resp.msg );
			 	//else close_form_overlay_failure( resp.msg );
			}
		});

		$('#subscribe-button, #close-subscribe-button, #overlay').on('click', function() {
			transition_form_overlay();
		});

	});
})( jQuery );

function close_form_overlay_success( msg ) {
	console.log('success callback');
	transition_form_overlay();
	replace_with( 'success', msg );
	
}

function close_form_overlay_failure( msg ) {
	console.log('failure callback');
	transition_form_overlay();
	replace_with( 'failure', msg );
}

function transition_form_overlay() {
	console.log( 'transitioning overlay' );
	var c = $('#contact');
	var o = $('#overlay');
	if ( c.hasClass('active') ) {
		c.animate({'left': '-1000%'}).removeClass('active');
		o.fadeOut().css({'left': '-1000%'});
	} else {
		c.animate({'left': '50%'}).addClass('active');
		o.css({'left':'0%'}).fadeIn();
	}
}

function replace_with( status, text )	{
	$('#subscribe-button' ).replaceWith(
		$('<div>').addClass( status )
			     .addClass('col-sm-8')
			     .addClass( 'col-sm-offset-2')
			     .addClass('white')
			     .addClass('centered')
			     .append( 
			     		$('<h5>').text( text )
				)
	);
}