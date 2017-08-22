$(document).ready(function($) {
	$('.scrollTo').click(function() {
		$('html,body').animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 800);
		return false;
	});
});