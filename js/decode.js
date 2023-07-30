import checkFieldsValidity from "./check-validity.js";
import makeRequest from "./makeRequest.js";

const subscribe = document.querySelector(".subscribe");
const decodeForm = document.querySelector("#decodeForm");
const decodeButton = document.querySelector("#decodeButton");
const decodedSection = document.querySelector(".decoded");
const decodedArticle = document.querySelector(".decoded__content");

let responseData = { data: "" };

let responseText = "";

decodeButton.addEventListener("click", function (e) {
	if (!checkFieldsValidity(decodeForm.querySelector("textarea"))) {
		e.preventDefault();
		return;
	}
	subscribe.classList.add("subscribe--active");
	scrollTo(subscribe);
	makeRequest(e, decodeForm, actionSuccess, disableDecodeButton, responseData);
});

function disableDecodeButton() {
	decodeButton.disabled = !decodeButton.disabled;
	decodeButton.classList.toggle("loading");
}

function actionSuccess() {
	responseText = responseData.data.form.dream;
	disableDecodeButton();
	pasteResponse();
	decodedSection.classList.add("decoded--show");
	scrollTo(decodedSection);
}

function pasteResponse() {
	let response = `<div class="decoded__article-inner">
<p>
	<strong>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</strong> Aenean
	commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
	parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque
	eu, pretium quis, sem. Nulla consequat massa quis enim.
</p>
<p>
	Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
	rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis
	pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
	vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
	ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
	viverra nulla ut metus varius laoreet.
</p>
<p>
	<strong>
		Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
		ullamcorper ultricies nisi. Nam eget dui.
	</strong>
</p>
<p>
	<strong>
	${responseText}
	</strong>
	</p>

</div>`;
	decodedArticle.insertAdjacentHTML("afterbegin", response);
}

function scrollTo(gotoBlock) {
	const gotoBlockValue =
		gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector(".header").offsetHeight;
	window.scrollTo({
		top: gotoBlockValue - 20,
		behavior: "smooth",
	});
}
