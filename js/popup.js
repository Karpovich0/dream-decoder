const popupClose = document.querySelector(".popup__close");
const popupWrapper = document.querySelector(".popup-wrapper");
const body = document.querySelector(".body");
const buttonFeedback = document.querySelector(".button-feedback");

popupClose.addEventListener("click", () => {
	togglePopup();
});
buttonFeedback.addEventListener("click", () => {
	togglePopup();
});

function togglePopup() {
	popupWrapper.classList.toggle("popup-wrapper--active");
	body.classList.toggle("body--lock");
}
