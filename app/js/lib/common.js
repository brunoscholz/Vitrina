(function($){
	$(function(){

    $('#intro-loader').delay(200).fadeOut();
		
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      //edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

		$('input, textarea').characterCounter();
    $('.tooltipped').tooltip({delay: 50, position: 'bottom'});

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      }
    );

    $('a.translation-button').dropdown();

    $(document).ready(function () {
      $('select').material_select();
    });

    $(document).ready(function () {
      $('ul.tabs').tabs();
    });

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
