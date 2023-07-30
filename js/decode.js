const decodeForm = document.querySelector("#decodeForm");
const decodeButton = document.querySelector("#decodeButton");
const decodedSection = document.querySelector(".decoded");
const decodedArticle = document.querySelector(".decoded__content");

decodeButton.addEventListener("click", function (e) {
	makerequest(e, decodeForm);
});

function makerequest(e, form) {
	e.preventDefault();

	if (!checkFieldsValidity(form.querySelector("textarea"))) {
		return;
	}

	const formData = new FormData(form);

	disableDecodeButton();

	fetch("https://httpbin.org/post", {
		method: "POST",
		body: formData,
	})
		.then(function (response) {
			return response.text();
		})
		.then(function (text) {
			console.log(text);
			disableDecodeButton();
			decodedSection.classList.add("decoded--show");
			pasteResponse();
			scrollToDecoded();
		})
		.catch((err) => {
			console.log(err);
			disableDecodeButton();
		});
}

function disableDecodeButton() {
	decodeButton.disabled = !decodeButton.disabled;
	decodeButton.classList.toggle("loading");
}

function checkFieldsValidity(input) {
	if (input.value !== "") {
		if (!input.validity.typeMismatch && !input.validity.tooShort) {
			showValididyMessage(input);
			return true;
		} else {
			showValididyMessage(input);
			return false;
		}
	} else {
		showValididyMessage(input);
		return false;
	}
}

function showValididyMessage(input) {
	input.reportValidity();
}

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

</div>`;

function pasteResponse() {
	decodedArticle.insertAdjacentHTML("afterbegin", response);
}

function scrollToDecoded() {
	const gotoBlock = document.querySelector(".decoded");
	const gotoBlockValue =
		gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector(".header").offsetHeight;
	window.scrollTo({
		top: gotoBlockValue - 20,
		behavior: "smooth",
	});
}
