const swiper = new Swiper(".swiper", {
	spaceBetween: 0,
	slidesPerView: 1,
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
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 4,
		},
	},
});
