/**
 * product templates
 *
 * namespace
 * grid item
 */

/**
 * grid item
 * @param {Object} data
 * @param {String} namespace
 * @return {string}
 */

import namespacedClasses from '../lib/class-name-module';

function productItem(data, namespace) {
	const realPrice = _.formatPriceDisplay(data.price * 100);

	const html = `
	<article class="grid-item ${namespacedClasses('pi', namespace)}">
		<div class="${namespacedClasses('pi__img', namespace)}">
			<a class="is-loading ir ir--product ${namespacedClasses('pi__link', namespace)}" href="${data.url}">
				<img class="lazyload" data-src="${data.image}" alt="${data.name}" />
			</a>
		</div>

		<div class="${namespacedClasses('pi__info', namespace)}">
			<h3 class="${namespacedClasses('pi__title', namespace)}">
				<a href="${data.url}">
					${data.name}
				</a>
			</h3>
			<p class="${namespacedClasses('pi__sku', namespace)} hide-phone">
				#${data.sku}
			</p>
			<p class="${namespacedClasses('pi__price', namespace)}">
				${realPrice}
			</p>
		</div>
	</article>
	`;

	return html.trim();
}

export default productItem;