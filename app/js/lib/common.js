(function($){
	$(function(){

		$('.button-collapse').sideNav();
		$('input, textarea').characterCounter();

	}); // end of document ready
})(jQuery); // end of jQuery name space

/*$(document).ready(function(){
  $('ul.tabs').tabs();
});*/

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  $(".parallax-zoom-blur img").css({
    width: (100 + scroll/5)  + "%",
    top: -(scroll/10)  + "%",
    "-webkit-filter": "blur(" + (scroll/100) + "px)",
    filter: "blur(" + (scroll/100) + "px)"
  });
});

Caman.DEBUG = ('console' in window);