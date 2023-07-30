import checkFieldsValidity from "./check-validity.js";
import makeRequest from "./makeRequest.js";

const successIcon = document.querySelector(".success");
const subscribeButton1 = document.querySelector("#subcribeButton1");
const subscribeButton2 = document.querySelector("#subcribeButton2");
const feedbackButton = document.querySelector("#buttonFeedback");

let subscribeButtonArray = [subscribeButton1, subscribeButton2];

subscribeButtonArray.forEach((element) => {
	element.addEventListener("click", function (e) {
		let isRequestArray = [false, false];

		const form = this.closest("form");

		proccessInputs(e, form, isRequestArray);

		if (isRequestArray[0] && isRequestArray[1]) {
			makeRequest(e, form);
			toggleSuccess();
			setTimeout(toggleSuccess, 500);
		}
	});
});

feedbackButton.addEventListener("click", function (e) {
	let isRequestArray = [false, false, false];

	const form = this.closest("form");
	const textareaFeedback = form.querySelector("textarea");

	proccessInputs(e, form, isRequestArray);

	if (!checkFieldsValidity(textareaFeedback)) {
		e.preventDefault();
		isRequestArray[2] = false;
		return;
	} else {
		isRequestArray[2] = true;
	}

	if (isRequestArray[0] && isRequestArray[1] && isRequestArray[2]) {
		makeRequest(e, form);
		togglePopup();
		toggleSuccess();
		setTimeout(toggleSuccess, 1000);
	}
});

function proccessInputs(e, form, isRequestArray) {
	e.preventDefault();

	const inputArray = form.querySelectorAll("input");

	inputArray.forEach((element, index) => {
		if (!checkFieldsValidity(element)) {
			e.preventDefault();
			isRequestArray[index] = false;
			return;
		} else {
			isRequestArray[index] = true;
		}
	});
}

function toggleSuccess() {
	successIcon.classList.toggle("success--show");
}
