function open_dropdown() {
	$(".dropdown").siblings(".dropdown-cover").show();
	$(".dropdown").addClass("animated");
}

function close_dropdown() {
	$(".dropdown").removeClass("animated");
	$(".dropdown").siblings(".dropdown-cover").hide();
}

function open_left_feature(e) {
	var target = e.currentTarget;
	$(target).addClass("active");
	$(target).parents(".feature-section").addClass("active-left")
}

function close_left(e) {
	e.preventDefault();
	e.stopPropagation();
	var target = e.currentTarget;
	$(target).parents(".feature-left").removeClass("active");
	$(target).parents(".feature-section").removeClass("active-left")
}


function open_right_feature(e) {
	var target = e.currentTarget;
	$(target).addClass("active");
	$(target).parents(".feature-section").addClass("active-right")
}

function close_right(e) {
	e.preventDefault();
	e.stopPropagation();
	var target = e.currentTarget;
	$(target).parents(".feature-right").removeClass("active");
	$(target).parents(".feature-section").removeClass("active-right")
}
$(document).ready(function() {
	$(".nav-btn").bind("click", open_dropdown);
	$(".dropdown-cover").bind("click", close_dropdown);
	$(".feature-left").hover(function() {
		$(this).parent().addClass("hover-left")
	}, function() {
		$(this).parent().removeClass("hover-left");
	});
	$(".feature-left").bind("click", open_left_feature);
	$(".feature-right").bind("click", open_right_feature);
	$(".close_left").bind("click", close_left);
	$(".close_right").bind("click", close_right);
	$(".feature-right").hover(function() {
		$(this).parent().addClass("hover-right")
	}, function() {
		$(this).parent().removeClass("hover-right")
	});
	$(".category-large").hover(function() {
		$(this).find("img").addClass("active");
		$(this).find(".category-caption").addClass("hover");
	}, function() {
		$(this).find("img").removeClass("active");
		$(this).find(".category-caption").removeClass("hover");
	});
	$(".category-small").hover(function() {
		$(this).find(".category-caption").addClass("hover");
	}, function() {
		$(this).find(".category-caption").removeClass("hover");
	});
	// $('#openpopup').magnificPopup({
	// 	items: [{
	// 		src: 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Peter_%26_Paul_fortress_in_SPB_03.jpg/800px-Peter_%26_Paul_fortress_in_SPB_03.jpg',
	// 		title: 'Peter & Paul fortress in SPB'
	// 	}, {
	// 		src: 'https://www.youtube.com/watch?v=-YfVRbGccLc',
	// 		type: 'iframe' // this overrides default type
	// 	}, {
	// 		src: $('<div class="white-popup">Dynamically created element</div>'), // Dynamically created element
	// 		type: 'inline'
	// 	}, {
	// 		src: '<div class="white-popup">Popup from HTML string</div>', // HTML string
	// 		type: 'inline'
	// 	}, {
	// 		src: '#my-popup', // CSS selector of an element on page that should be used as a popup
	// 		type: 'inline'
	// 	}],
	// 	gallery: {
	// 		enabled: true
	// 	},
	// 	type: 'image' // this is a default type
	// });
	$(".image-gallaxy").each(function() {
		$(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});
})