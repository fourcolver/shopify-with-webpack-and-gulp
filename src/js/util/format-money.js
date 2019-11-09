/**
 * format money
 * edited version of the following script:
 * @see    https://gist.github.com/stewartknapman/8d8733ea58d2314c373e94114472d44c
 * @param  {Number|String} cents    e.g. "1200"
 * @param  {String}        format   e.g. "amount_with_currency"
 * @param  {String}        currency e.g. "$"
 * @return {String}
 */
function formatMoney(cents, format, currency = '$') {
	if (typeof cents == 'string') {
		cents = cents.replace('.', '');
	}
	var value = '';
	var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

	function defaultOption(opt, def) {
		return (typeof opt == 'undefined' ? def : opt);
	}

	function formatWithDelimiters(number, precision, thousands, decimal) {
		precision = defaultOption(precision, 2);
		thousands = defaultOption(thousands, ',');
		decimal   = defaultOption(decimal, '.');

		if (isNaN(number) || number == null) { return 0; }

		number = (number/100.0).toFixed(precision);

		var parts = number.split('.'),
			dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
			cents   = parts[1] ? (decimal + parts[1]) : '';

		return dollars + cents;
	}

	switch (format) {
	case 'amount':
		value = formatWithDelimiters(cents, 2);
		break;
	case 'amount_with_currency':
		value = currency + formatWithDelimiters(cents, 2);
		break;
	case 'amount_with_currency_without_trailing_zeros':
		value = currency + formatWithDelimiters(cents, 2);
		if (value.indexOf('.00') !== -1) {
			value = value.replace('.00', '');
		}
		break;
	case 'amount_no_decimals':
		value = formatWithDelimiters(cents, 0);
		break;
	case 'amount_with_comma_separator':
		value = formatWithDelimiters(cents, 2, '.', ',');
		break;
	case 'amount_no_decimals_with_comma_separator':
		value = formatWithDelimiters(cents, 0, '.', ',');
		break;
	}

	return value;
}

export default formatMoney;