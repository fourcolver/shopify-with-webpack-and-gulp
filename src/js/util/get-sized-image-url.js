/**
 * get sized image url
 * @param  {string} imgUrl
 * @param  {string} size   image width, e.x. '250x'
 * @return {string}        resized image url
 */
_.getSizedImageUrl = function(imgUrl, size) {
	var i,
		n,
		r;

	if (! imgUrl) return '//cdn.searchspring.net/ajax_search/img/missing-image-75x75.gif';
	if (! size) return imgUrl;
	if (size === 'master') return _.removeProtocol(imgUrl);

	n = imgUrl.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

	if (n !== null) {
		r = imgUrl.split(n[0]);
		i = n[0];
		return _.removeProtocol(r[0] + '_' + size + i);
	}
};