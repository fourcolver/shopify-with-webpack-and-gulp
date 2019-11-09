/**
 * variable menu
 *
 * import dependencies
 * variable menu
 */

/**
 * import dependencies
 */
import ClipboardJS from 'clipboard';

/**
 * variable menu
 * @param  {Object} opts
 * @return {SDG.variableMenu~init}
 */
SDG.variableMenu = (function(opts) {
	const config = {
		id: 'variableMenu',
		open: false,
		open_class: 'open'
	};
	const c = _.extend(config, opts);

	// cached globals
	const menu = document.getElementById(c.id);

	function init() {
		bindHotKeys();
		initClipboard();
	}

	function bindHotKeys() {
		document.addEventListener('keydown', hotKeyAction, false);
	}

	function hotKeyAction(e) {
		if (e.ctrlKey && e.keyCode === 71) {

			if (_.hasClass(menu, c.open_class)) {
				close();
			} else {
				open();
			}
		}
	}

	function open() {
		c.open = true;
		_.addClass(menu, c.open_class);
	}

	function close() {
		c.open = false;
		_.removeClass(menu, c.open_class);
	}

	function initClipboard() {
		const clipboard = new ClipboardJS('.code', {
			text(trigger) {
				return trigger.textContent;
			}
		});

		clipboard.on('success', (e) => {
			showTooltip(e.trigger, 'Copied!');
			e.clearSelection();
		});
	}

	function showTooltip(elem, msg) {
		elem.setAttribute('aria-label', msg);

		elem.addEventListener('mouseout', () => {
			elem.removeAttribute('arial-label');
		});
	}

	return init();
}());
