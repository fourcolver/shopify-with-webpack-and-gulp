/**
 * ready
 * equivalent of jQuery's $(document).ready();
 * @param  {Function} fn function to run when the document is ready
 * @return {Function} Rturns passed function when document is ready.
 */
_.ready = function(fn) {
	if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};