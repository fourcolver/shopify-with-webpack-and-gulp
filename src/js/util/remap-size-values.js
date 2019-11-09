/**
 * remap size values
 * @type {Function}
 * @return {String}
 * @desc This is used to remap short hand size values to full words
 */
_.remapSizeValues = function(val) {
	let label;

	if (val) {
		val = val.toLowerCase();
	}

	switch(val) {
	case 'xs':
		label = 'extra small';
		break;
	case 's':
		label = 'small';
		break;
	case 'm':
		label = 'medium';
		break;
	case 'l':
		label = 'large';
		break;
	case 'xl':
		label = 'extra large';
		break;
	case 'xxl':
		label = '2x Large';
		break;
	case '2xl':
		label = '2x Large';
		break;
	case 'xxxl':
		label = '3x Large';
		break;
	case '3xl':
		label = '3x Large';
		break;
	default:
		label = val;
		break;
	}

	return label;
};