import checkFieldsValidity from "./check-validity.js";
import makeRequest from "./makeRequest.js";

const subscribe = document.querySelector(".subscribe");
const decodeForm = document.querySelector("#decodeForm");
const decodeButton = document.querySelector("#decodeButton");
const decodedSection = document.querySelector(".decoded");
const decodedArticle = document.querySelector(".decoded__content");
const url = "https://dreamdecoder.efrox.network/decode.php";

let responseData = { data: "" };

let responseText = "";

decodeButton.addEventListener("click", function (e) {
	if (!checkFieldsValidity(decodeForm.querySelector("textarea"))) {
		e.preventDefault();
		return;
	}
	subscribe.classList.add("subscribe--active");
	scrollTo(subscribe);
	makeRequest(url, e, decodeForm, responseData, actionSuccess, disableDecodeButton);
});

function disableDecodeButton() {
	decodeButton.disabled = !decodeButton.disabled;
	decodeButton.classList.toggle("loading");
}

function actionSuccess() {
	responseText = responseData.data.text;
	disableDecodeButton();
	pasteResponse();
	decodedSection.classList.add("decoded--show");
	scrollTo(decodedSection);
}

function pasteResponse() {
	decodedArticle.innerHTML = "";
	let result = "<p>" + responseText + "</p>";
	result = result.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
	result = result.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");
	decodedArticle.insertAdjacentHTML("afterbegin", result);
}

function scrollTo(gotoBlock) {
	const gotoBlockValue =
		gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector(".header").offsetHeight;
	window.scrollTo({
		top: gotoBlockValue - 20,
		behavior: "smooth",
	});
}

// copy to clipboad
const copyButtonDecoded = document.querySelector(".decoded__copy-button");

copyButtonDecoded.addEventListener("click", async function (event) {
	const content = responseText;
	await navigator.clipboard.writeText(content);
});
