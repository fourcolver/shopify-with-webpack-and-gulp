/**
 * account dashboard message
 *
 * import dependencies
 * namespace
 * account dashboard message
 */

/**
 * import dependencies
 */
import Vue from 'vue';
import dc from '../components/account-dashboard/config/config'; // dc = dashboard config

/**
 * namespace
 */
SDG.Dashboard = SDG.Dashboard || {};

// view model instance
SDG.Dashboard.VmMsg = {};

/**
 * account dashboard message
 */
function accountDashboardMessage() {
	const c = {
		expire: true,
		target: dc.vm.msg,
		timeout: null, // timeout variable
		timer: 8000,
	};

	/**
	 * init
	 */
	function init() {
		initVue();
	}

	/**
	 * init view model
	 */
	function initVue() {

		/**
		 * message view model
		 * @type {Vue}
		 */
		SDG.Dashboard.VmMsg = new Vue({
			el: c.target,
			data: {
				show: false,
				text: '',
				type: '',
			},
			computed: {
				messageTypeClass() {
					return {
						'message--success': this.type === 'success',
						'message--error': this.type === 'error',
					};
				}
			}
		});
	}

	/**
	 * update
	 * @param  {Object} opts optional props - text: string, type: success|error,
	 *                       show: true|false
	 */
	function update(opts) {

		// loop through props
		Object.keys(opts).forEach((prop) => {
			updateOption(opts, prop);
		});

		// if set to expire, and show has been flagged
		if (c.expire && opts.show) {
			clearTimer();
			setTimer();
		}
	}

	/**
	 * update option
	 * @param {Object} opts
	 * @param {string} prop
	 */
	function updateOption(opts, prop) {
		const val = opts[prop];
		const propAndValueExist = prop in SDG.Dashboard.VmMsg && val !== 'undefined';

		// update view model's data with value
		if (propAndValueExist) {
			SDG.Dashboard.VmMsg[prop] = val;
		}
	}

	/**
	 * hide
	 */
	function hide() {
		SDG.Dashboard.VmMsg.show = false;
	}

	/**
	 * set timer
	 */
	function setTimer() {
		c.timeout = setTimeout(hide, c.timer);
	}

	/**
	 * clear timer
	 */
	function clearTimer() {
		clearTimeout(c.timeout);
	}

	/**
	 * return
	 * @type {Object}
	 */
	return {
		init,
		update,
	};
}

export default accountDashboardMessage;