/**
 * account dashboard
 *
 * import dependencies
 * namespace
 * fire functions
 */

/**
 * import dependencies
 */
import accountDashboard from '../lib/account-dashboard';
import accountDashboardMessage from '../lib/account-dashboard-message';

/**
 * namespace
 */
SDG.Dashboard = SDG.Dashboard || {};

// message instance
SDG.Dashboard.Message = {};

/**
 * fire functions
 */
(function() {

	// account dashboard message
	SDG.Dashboard.Message = accountDashboardMessage();
	SDG.Dashboard.Message.init();

	// account dashboard
	accountDashboard();
}());