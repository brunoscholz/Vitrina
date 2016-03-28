jQuery(document).ready(function(event){
	var projectsContainer = $('.list-container'),
		triggerNav = $('.list-nav-trigger');
		//navigation = $('.cd-primary-nav'),

	triggerNav.addClass('hide');
	triggerNav.on('click', function(){
		if( triggerNav.hasClass('list-item-open') ) {
			//close project
			projectsContainer.removeClass('list-item-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$(this).children('.list-item-info').scrollTop(0).removeClass('has-boxshadow');

			});
			triggerNav.removeClass('list-item-open'); //add(logo).
			triggerNav.addClass('hide');
		}
	});

	projectsContainer.on('click', '.list-single-item', function(){
		var selectedProject = $(this);
		//open project
		selectedProject.addClass('selected');
		projectsContainer.add(triggerNav).addClass('list-item-open'); //.add(logo)
		projectsContainer.add(triggerNav).removeClass('hide');
	});

	projectsContainer.on('click', '.list-scroll', function(){
		//scroll down when clicking on the .cd-scroll arrow
		var visibleProjectContent =  projectsContainer.find('.selected').children('.list-item-info'),
			windowHeight = $(window).height();

		visibleProjectContent.animate({'scrollTop': windowHeight}, 300); 
	});

	//add/remove the .has-boxshadow to the project content while scrolling 
	var scrolling = false;
	projectsContainer.find('.list-item-info').on('scroll', function(){
		if( !scrolling ) {
		 	if (!window.requestAnimationFrame) {
		 		setTimeout(updateProjectContent, 300);
		 	} else {
		 		window.requestAnimationFrame(updateProjectContent);
		 	}

		 	scrolling = true;
		}
	});

	function updateProjectContent() {
		var visibleProject = projectsContainer.find('.selected').children('.list-item-info'),
			scrollTop = visibleProject.scrollTop();
		if ( scrollTop > 0 ) {
			visibleProject.addClass('has-boxshadow');
		} else {
			visibleProject.removeClass('has-boxshadow');
		}
		scrolling = false;
	}
});