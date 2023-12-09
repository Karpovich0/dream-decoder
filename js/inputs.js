import checkFieldsValidity from "./check-validity.js";
import makeRequest from "./makeRequest.js";

const successIcon = document.querySelector(".success");
const subscribeButton1 = document.querySelector("#subcribeButton1");
const subscribeButton2 = document.querySelector("#subcribeButton2");
const feedbackButton = document.querySelector("#buttonFeedback");
const url = "https://dreamdecoder.efrox.network/subscribe.php";

let subscribeButtonArray = [subscribeButton1, subscribeButton2];

let responseData = {};

subscribeButtonArray.forEach((element) => {
	element.addEventListener("click", function (e) {
		let isRequestArray = [false, false];

		const form = this.closest("form");

		proccessInputs(e, form, isRequestArray);

		if (isRequestArray[0] && isRequestArray[1]) {
			makeRequest(url, e, form, responseData, successSubscription);
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
		makeRequest(url, e, form, responseData, successSubscription);
		togglePopup();
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

function successSubscription() {
	if (responseData.data.status === "ok") {
		toggleSuccess();
		setTimeout(toggleSuccess, 1000);
	}
}

function toggleSuccess() {
	successIcon.classList.toggle("success--show");
}
