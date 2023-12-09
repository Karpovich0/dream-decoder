export default function makeRequest(url, e, form, responseData, actionSuccess, disableDecodeButton) {
	e.preventDefault();

	const formData = new FormData(form);

	if (disableDecodeButton) {
		disableDecodeButton();
	}

	fetch(url, {
		method: "POST",
		body: formData,
	})
		.then(function (response) {
			return response.text();
		})
		.then(function (text) {
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
