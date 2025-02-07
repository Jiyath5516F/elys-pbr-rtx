(function ($) {
	"use strict";

	/*------------------------------------
			Preloader
		--------------------------------------*/

	$(window).on('load', function () {
		// $('#preloader').delay(350).fadeOut('slow');
		// $('body').delay(350).css({ 'overflow': 'visible' });
		// -------------------- Site Preloader
		$('#ctn-preloader').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({ 'overflow': 'visible' });
	});

	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "991",
		meanExpand: "+",
		meanContract: "-"
	});


	$.fn.htmobilemenu = function (options) {
		var opt = $.extend(
			{
				meanMenuContainer: '.mobile-menu',
				meanScreenWidth: "991",
				menuToggleBtn: ".ht-menu-toggle",
				bodyToggleClass: "ht-body-visible",
				subMenuClass: "ht-submenu",
				subMenuParent: "ht-item-has-children",
				subMenuParentToggle: "ht-active",
				// meanExpandClass: "ht-mean-expand",
				// appendElement: '<span class="ht-mean-expand"><i class="bi bi-plus-lg"></i></span>',
				subMenuToggleClass: "ht-open",
				toggleSpeed: 400,
			},
			options
		);

		return this.each(function () {
			var menu = $(this); // Select menu

			// Menu Show & Hide
			function menuToggle() {
				menu.toggleClass(opt.bodyToggleClass);

				// collapse submenu on menu hide or show
				var subMenu = "." + opt.subMenuClass;
				$(subMenu).each(function () {
					if ($(this).hasClass(opt.subMenuToggleClass)) {
						$(this).removeClass(opt.subMenuToggleClass);
						$(this).css("display", "none");
						$(this).parent().removeClass(opt.subMenuParentToggle);
					}
				});
			}

			// Class Set Up for every submenu
			menu.find("li").each(function () {
				var submenu = $(this).find("ul");
				submenu.addClass(opt.subMenuClass);
				submenu.css("display", "none");
				submenu.parent().addClass(opt.subMenuParent);
				submenu.prev("a").append(opt.appendElement);
				submenu.next("a").append(opt.appendElement);
			});

			// Toggle Submenu
			function toggleDropDown($element) {
				if ($($element).next("ul").length > 0) {
					$($element).parent().toggleClass(opt.subMenuParentToggle);
					$($element).next("ul").slideToggle(opt.toggleSpeed);
					$($element).next("ul").toggleClass(opt.subMenuToggleClass);
				} else if ($($element).prev("ul").length > 0) {
					$($element).parent().toggleClass(opt.subMenuParentToggle);
					$($element).prev("ul").slideToggle(opt.toggleSpeed);
					$($element).prev("ul").toggleClass(opt.subMenuToggleClass);
				}
			}

			// Submenu toggle Button
			var expandToggler = "." + opt.meanExpandClass;
			$(expandToggler).each(function () {
				$(this).on("click", function (e) {
					e.preventDefault();
					toggleDropDown($(this).parent());
				});
			});

			// Menu Show & Hide On Toggle Btn click
			$(opt.menuToggleBtn).each(function () {
				$(this).on("click", function () {
					menuToggle();
				});
			});

			// Hide Menu On out side click
			menu.on("click", function (e) {
				e.stopPropagation();
				menuToggle();
			});

			// Stop Hide full menu on menu click
			menu.find("div").on("click", function (e) {
				e.stopPropagation();
			});
		});
	};

	$(".mobile-menu-wrapper").htmobilemenu();

	$(".hamburger-menu").on("click", function (e) {
		e.preventDefault();
		$(".ht-menu-wrapper").addClass('ht-body-visible');
	});

	$(".ht-menu-toggle").on("click", function (e) {
		e.preventDefault();
		$(".ht-menu-wrapper").removeClass('ht-body-visible');
	});
	$(".ht-menu-wrapper").on("click", function (e) {
		e.preventDefault();
		$(".ht-menu-wrapper").removeClass('ht-body-visible');
	});

	function sidebarWidgetpopup($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
		$($sideMunuOpen).on('click', function (e) {
			e.preventDefault();
			$($sideMenu).addClass($toggleCls);
		});
		$($sideMenu).on('click', function (e) {
			e.stopPropagation();
			$($sideMenu).removeClass($toggleCls)
		});
		var sideMenuChild = $sideMenu + ' > div';
		$(sideMenuChild).on('click', function (e) {
			e.stopPropagation();
			$($sideMenu).addClass($toggleCls)
		});
		$($sideMenuCls).on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			$($sideMenu).removeClass($toggleCls);
		});
	};
	sidebarWidgetpopup('.sidebar-info', '.side-info', '.info-close-btn', 'show');
	sidebarWidgetpopup('.sidebar-cart', '.shopping-cart', '.close-btn', 'show');

	$(".ht-carousel").each(function () {
		var themeSlide = $(this);

		// Collect Data
		function d(data) {
			return themeSlide.data(data);
		}

		// Custom Arrow Button
		var prevButton =
			'<button type="button" class="slick-prev"><i class="' +
			d("prev-arrow") +
			'"></i></button>',
			nextButton =
				'<button type="button" class="slick-next"><i class="' +
				d("next-arrow") +
				'"></i></button>';

		// Function For Custom Arrow Btn
		$("[data-slick-next]").each(function () {
			$(this).on("click", function (e) {
				e.preventDefault();
				$($(this).data("slick-next")).slick("slickNext");
			});
		});

		$("[data-slick-prev]").each(function () {
			$(this).on("click", function (e) {
				e.preventDefault();
				$($(this).data("slick-prev")).slick("slickPrev");
			});
		});

		// Check for arrow wrapper
		if (d("arrows") == true) {
			if (!themeSlide.closest(".arrow-wrapper").length) {
				themeSlide.closest(".container").parent().addClass("arrow-wrapper");
			}
		}

		themeSlide.not('.slick-initialized').slick({
			dots: d("dots") ? true : false,
			fade: d("fade") ? true : false,
			arrows: d("arrows") ? true : false,
			speed: d("speed") ? d("speed") : 1000,
			asNavFor: d("asnavfor") ? d("asnavfor") : false,
			autoplay: d("autoplay") == false ? false : true,
			infinite: d("infinite") == false ? false : true,
			slidesToShow: d("slide-show") ? d("slide-show") : 1,
			adaptiveHeight: d("adaptive-height") ? true : false,
			centerMode: d("center-mode") ? true : false,
			autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
			centerPadding: d("center-padding") ? d("center-padding") : "0",
			focusOnSelect: d("focuson-select") == false ? false : true,
			pauseOnFocus: d("pauseon-focus") ? true : false,
			pauseOnHover: d("pauseon-hover") ? true : false,
			variableWidth: d("variable-width") ? true : false,
			vertical: d("vertical") ? true : false,
			verticalSwiping: d("vertical") ? true : false,
			swipeToSlide: (d('swipetoslide') ? true : false),
			prevArrow: d("prev-arrow")
				? prevButton
				: '<button type="button" class="slick-prev"><i class="bi bi-arrow-left"></i></button>',
			nextArrow: d("next-arrow")
				? nextButton
				: '<button type="button" class="slick-next"><i class="bi bi-arrow-right"></i></button>',
			rtl: $("html").attr("dir") == "rtl" ? true : false,
			responsive: [
				{
					breakpoint: 1600,
					settings: {
						arrows: d("xl-arrows") ? true : false,
						dots: d("xl-dots") ? true : false,
						slidesToShow: d("xl-slide-show")
							? d("xl-slide-show")
							: d("slide-show"),
						centerMode: d("xl-center-mode") ? true : false,
						centerPadding: "0",
					},
				},
				{
					breakpoint: 1400,
					settings: {
						arrows: d("ml-arrows") ? true : false,
						dots: d("ml-dots") ? true : false,
						slidesToShow: d("ml-slide-show")
							? d("ml-slide-show")
							: d("slide-show"),
						centerMode: d("ml-center-mode") ? true : false,
						centerPadding: 0,
					},
				},
				{
					breakpoint: 1200,
					settings: {
						arrows: d("lg-arrows") ? true : false,
						dots: d("lg-dots") ? true : false,
						slidesToShow: d("lg-slide-show")
							? d("lg-slide-show")
							: d("slide-show"),
						centerMode: d("lg-center-mode")
							? d("lg-center-mode")
							: false,
						centerPadding: 0,
					},
				},
				{
					breakpoint: 992,
					settings: {
						arrows: d("md-arrows") ? true : false,
						dots: d("md-dots") ? true : false,
						slidesToShow: d("md-slide-show")
							? d("md-slide-show")
							: 1,
						centerMode: d("md-center-mode")
							? d("md-center-mode")
							: false,
						centerPadding: 0,
					},
				},
				{
					breakpoint: 768,
					settings: {
						arrows: d("sm-arrows") ? true : false,
						dots: d("sm-dots") ? true : false,
						slidesToShow: d("sm-slide-show")
							? d("sm-slide-show")
							: 1,
						centerMode: d("sm-center-mode")
							? d("sm-center-mode")
							: false,
						centerPadding: 0,
					},
				},
				{
					breakpoint: 576,
					settings: {
						arrows: d("xs-arrows") ? true : false,
						dots: d("xs-dots") ? true : false,
						slidesToShow: d("xs-slide-show")
							? d("xs-slide-show")
							: 1,
						centerMode: d("xs-center-mode")
							? d("xs-center-mode")
							: false,
						centerPadding: 0,
					},
				},
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			],
		});
	});

	//hero slider 2
	var $slider = $('.ht-carousel-2');
	var $status1 = $('.pagingInfo1');
	var $status2 = $('.pagingInfo2');

	$slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
		if (!slick.$dots) {
			return;
		}

		var i = (currentSlide ? currentSlide : 0) + 0;
		$status1.text(i + 1);
		$status2.text(slick.slideCount);
	});

	$slider.slick({
		arrows: true,
		dots: true, // Disable default dots
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: $('.next-p2'),
		prevArrow: $('.prev-p2'),
	});

	// hero slider 3
	var $slider3 = $('.ht-carousel-3');
	var $status3 = $('.pagingInfo1');


	$slider3.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
		if (!slick.$dots) {
			return;
		}

		var i = (currentSlide ? currentSlide : 0) + 0;
		$status3.text(i + 1);
	});

	$slider3.slick({
		arrows: true,
		dots: true, // Disable default dots
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: $('.next-p2'),
		prevArrow: $('.prev-p2'),
	});


	//   Progress Bar
	// $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
	// 	var calc = ((nextSlide) / (slick.slideCount - 1)) * 100;

	// 	$progressBar
	// 		.css('background-size', calc + '% 100%')
	// 		.attr('aria-valuenow', calc);


	// 	$progressBarLabel.text(calc + '% completed');
	// });

	// ------------------------ Project Slider 3
	if ($(".project-slider-3").length) {
		$('.project-slider-3').slick({
			dots: false,
			arrows: true,
			prevArrow: $('.prev-p4'),
			nextArrow: $('.next-p4'),
			lazyLoad: 'ondemand',
			centerPadding: '0px',
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	}





	//sticky-menu
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 200) {
			$(".main-header-area").removeClass("sticky-menu");
		} else {
			$(".main-header-area").addClass("sticky-menu");
		}
	});

	// Add .active class to current navigation based on URL
	var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
	$(".navbar-nav > li  a").each(function () {
		if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
			$(this).addClass("active");
		// $(this).parent("li").addClass("active");
	})



	//shopping-cart-bar
	$(".shopping-cart").on("click", function () {
		$(".cart-menu-right").addClass('cart-info');
		$('.body-overlay').addClass('active');
	});
	$(".close-icon").click(function () {
		$(".cart-menu-right").removeClass('cart-info');
		$('.body-overlay').removeClass('active');
	});

	$('.feedback-vertical-slider').slick({
		autoplay: true,
		arrows: false,
		dots: false,
		slidesToShow: 3,
		centerMode: false,
		centerPadding: 0,
		draggable: false,
		infinite: true,
		pauseOnHover: false,
		swipe: false,
		touchMove: false,
		vertical: true,
		verticalScrolling: true,
		speed: 1000,
		autoplaySpeed: 2000,
		useTransform: true,
		cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1201,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 2,
					arrows: false,
				}
			},

			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			}
		]
	});

	//product__item__slider
	$('.author-thumb-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.author-content-slider'
	});
	$('.author-content-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.author-thumb-slider',
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
		arrows: true,
		nextArrow: $('.next-p1'),
		prevArrow: $('.prev-p1'),
		centerMode: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1201,
				settings: {
					slidesToScroll: 1,
					arrows: false,
				}
			},

			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false,
				}
			}
		]
	});

	//product__item__slider
	$('.product-item-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.product-thumb-slider'
	});
	$('.product-thumb-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.product-item-slider',
		autoplay: true,
		autoplaySpeed: 3000,
		dots: false,
		arrows: false,
		centerMode: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1201,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				}
			},

			{
				breakpoint: 980,
				settings: {
					slidesToShow: 3,
				}
			},

			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
				}
			}
		]
	});

	//blog-gallery-slider
	$('.blog-gallery-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 1000,
		centerMode: true,
		centerPadding: '0',
		dots: false,
		loop: true,
		nextArrow: $('.next-tb1'),
		prevArrow: $('.prev-tb1'),
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 425,
				settings: {
					slidesToShow: 1,
					centerMode: false,
				}
			},
		]
	});


	// -------------------- price btn
	$(".price-btn").click(function () {

		var lable = $(".price-btn").text().trim();

		if (lable == "Monthly") {
			$(".price-btn").text("Yearly");
			$(".yearly-price").show();
			$(".monthly-price").hide();
		}
		else {
			$(".price-btn").text("Monthly");
			$(".monthly-price").show();
			$(".yearly-price").hide();
		}

	});

	$(function () {
		$('.chart').easyPieChart({
			animate: {
				duration: 1000,
				enabled: true
			},
			scaleLength: 0,
			size: 195,
			trackColor: 'rgba(0, 0, 0, 0.1)',
			barColor: '#5454FF',
			scaleColor: 'false',
			lineWidth: 10,
			trackWidth: 10,
			lineCap: 'round',
			rotate: 90,
		});
	});

	$(function () {
		$('.chart2').easyPieChart({
			animate: {
				duration: 1000,
				enabled: true
			},
			scaleLength: 0,
			size: 90,
			trackColor: '#D9D9D9',
			barColor: '#0B3B5E',
			scaleColor: 'false',
			lineWidth: 6,
			trackWidth: 6,
			lineCap: 'round',
			rotate: 90,
		});
	});

	// ---------------- Data CSS Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});


	// -------------------- Remove Placeholder When Focus Or Click
	$("input,textarea").each(function () {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).on('focusin', function () {
			$(this).attr('placeholder', '');
		});
		$(this).on('focusout', function () {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});


	/* magnificPopup video view */
	$('.popup-video, .popup-links').magnificPopup({
		type: 'iframe'
	});

	$('.popup-img').magnificPopup({
		type: 'image',
		// other options
		gallery: {
			enabled: true
		},
	});



	// isotop
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: 0,
				gutter: 0
			}
		});
		// filter items on button click
		$('.portfolio-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
	});

	//for menu active class
	$('.portfolio-menu button').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});

	var scrollToTopBtn = $('#scrollToTopBtn');

	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			scrollToTopBtn.addClass('show');
		} else {
			scrollToTopBtn.removeClass('show');
		}
	});

	scrollToTopBtn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, '300');
	});



	/* Cart Plus Minus Js */
	$(".cart-plus-minus").append('<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>');
	$(".qtybutton").on("click", function () {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		if ($button.text() == "+") {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		$button.parent().find("input").val(newVal);
	});

	//jquiry-price-slider
	$(function () {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 500,
			values: [75, 300],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
			" - $" + $("#slider-range").slider("values", 1));
	});



	// wow animation - start
	// --------------------------------------------------
	function wowAnimation() {
		new WOW({
			offset: 100,
			mobile: true
		}).init()
	}
	wowAnimation();


	AOS.init();

	//counter
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});



})(jQuery);