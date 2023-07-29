const faqHeaderArray = document.querySelectorAll(".faq__header");
const faqItemArray = document.querySelectorAll(".faq__item");

faqHeaderArray.forEach((item, index) => {
	item.addEventListener("click", function () {
		document.querySelector(".faq__item--active").classList.remove("faq__item--active");
		faqItemArray[index].classList.add("faq__item--active");
	});
});
