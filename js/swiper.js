const swiper = new Swiper(".swiper", {
	loop: false,
	slidesPerView: 3,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	grabCursor: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		575: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 3,
		},
		991: {
			slidesPerView: 4,
		},
		1200: {
			slidesPerView: 4,
		},
	},
});
