export default function makeRequest(e, form, actionSuccess, disableDecodeButton, responseData) {
	e.preventDefault();

	const formData = new FormData(form);

	if (disableDecodeButton) {
		disableDecodeButton();
	}

	fetch("https://httpbin.org/post", {
		method: "POST",
		body: formData,
	})
		.then(function (response) {
			return response.text();
		})
		.then(function (text) {
			console.log(text);
			if (responseData) {
				responseData.data = JSON.parse(text);
			}
			if (actionSuccess) {
				actionSuccess();
			}
		})
		.catch((err) => {
			if (disableDecodeButton) {
				disableDecodeButton();
			}
			console.log(err);
		});
}
