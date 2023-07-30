export default function checkFieldsValidity(input) {
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
