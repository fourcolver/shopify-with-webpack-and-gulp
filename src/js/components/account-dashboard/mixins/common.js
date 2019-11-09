import c from '../config/config';

/**
 * common
 * @type {Object}
 */
const common = {

	activated() {
		const component = this;
		const data = component.componentDataToSet;

		// if component has data to set
		if (data) {
			Object.keys(data).forEach((key) => {
				component[key] = SDG.Dashboard.Vm[data[key]];
			});
		}
	},

	methods: {

		/**
		* set view model data
		* @param {string} viewModelProp prop name
		* @param {Object} data          data object to be set
		* @param {string} view          view to transition to
		*/
		setViewModelData(viewModelProp, data, view) {
			SDG.Dashboard.Vm[viewModelProp] = data;
			SDG.Dashboard.Vm.currentView = view;
		},

		/**
		* remove content active class
		*/
		removeContentActiveClass() {
			_.removeClass(this.$parent.$el, c.cls.content_active);
		},

		/**
		* set view
		*/
		setView(view) {
			SDG.Dashboard.Vm.currentView = view;
		}
	},
};

export default common;