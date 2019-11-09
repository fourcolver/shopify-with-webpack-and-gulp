/**
 * video embed
 * @param  {Object}  Config object
 * @requires [lib/util.js,lib/modal.js,lib/modal-get.js,lib/modal-clear.js]
 */
SDG.videoEmbed = function(opts) {
	const config = {
		id: 'vid',
		image: '.js-vid-image',
		class: {
			embed: 'vid__embed',
			fade_out: 'is-fading-out',
			has_embed: 'has-embed',
			ir: 'ir ir--vid'
		},
		video_url: {
			youtube: 'https://www.youtube.com/embed/',
			vimeo: 'https://player.vimeo.com/video/'
		},
		show_in_modal: false,
		modal: null // keys: id, modifier, overlay
	};
	const c = _.extend(config, opts);

	// globals
	const video = document.getElementById(c.id);

	/**
	 * init
	 * @return {Function}
	 */
	function init() {
		bindEvents();
	}

	/**
	 * bind events
	 * @return {Function}
	 */
	function bindEvents() {
		if (video) {
			if (c.show_in_modal) {
				video.addEventListener('click', generateModal, false);
			} else {
				video.addEventListener('click', insertVideo, false);
			}
		}
	}

	/**
	 * unbind events
	 * @return {Function}
	 */
	function unbindEvents() {
		if (c.show_in_modal) {
			video.removeEventListener('click', generateModal, false);
		} else {
			video.removeEventListener('click', insertVideo, false);
		}
	}

	/**
	 * insert video
	 * @return {Function}
	 */
	function insertVideo() {
		const videoId = this.getAttribute('data-video-id');
		const videoPlayer = this.getAttribute('data-video-player');
		const videoImage = video.querySelector(c.image);
		const videoEmbed = buildEmbed(videoId, videoPlayer);

		// unbind events
		unbindEvents();

		// transition image-to-video
		_.transition({
			before: () => {

				// add fade-out class to image
				_.addClass(videoImage, c.class.fade_out);
			},
			after: () => {
				// hide image
				videoImage.style.display = 'none';

				// remove fade-out class from image
				_.removeClass(videoImage, c.class.fade_out);

				// prepend video embed to video container
				video.insertBefore(videoEmbed, videoImage);
			}
		});
	}

	/**
	 * video player chocie
	 * @param {String} videoPlayer
	 * @return {Function}
	 */
	function videoPlayerChoice(videoPlayer) {
		let videoUrlPlayer;

		switch (videoPlayer) {
		case 'vimeo':
			videoUrlPlayer = c.video_url.vimeo;
			break;
		default:
			videoUrlPlayer = c.video_url.youtube;
			break;
		}
		return videoUrlPlayer;
	}

	/**
	 * build embed
	 * @param  {String} videoId     Id of the video on youtube or vimeo
	 * @param  {String} videoPlayer Type of player, youtube or vimeo. Default is youtube
	 * @return {String}             Html for the iframe embed
	 */
	function buildEmbed(videoId, videoPlayer) {

		const videoChoice = videoPlayerChoice(videoPlayer);
		const videoUrl = `${videoChoice}${videoId}?autoplay=1&rel=0`;
		const videoEmbed = document.createElement('div');
		const videoIframe = `<iframe width="1280" height="720" src="${videoUrl}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;

		// set class name
		videoEmbed.className = `${c.class.embed} ${c.class.ir}`;

		// append iframe html to embed div
		videoEmbed.innerHTML = videoIframe;

		return videoEmbed;
	}

	/**
	 * generate modal
	 * @return {Function}
	 */
	function generateModal() {
		const videoId = this.getAttribute('data-video-id');
		const videoPlayer = this.getAttribute('data-video-player');
		const videoChoice = videoPlayerChoice(videoPlayer);
		const videoUrl = `${videoChoice}${videoId}?autoplay=1&rel=0`;
		const html = `<div class="vid__embed ir ir--vid">
				<iframe width="1280" height="720" src="${videoUrl}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
			</div>`;

		let md;
		let modalWrap;

		if (c.modal) {
			md = SDG.Modal.getHtml({
				modal: c.modal.id,
				modifier: c.modal.modifier,
				overlay: c.modal.overlay,
				html
			}).render();

			modalWrap = document.createElement('div');
			modalWrap.innerHTML = md;
			document.body.appendChild(modalWrap);

			setTimeout(() => initVideo, 20);
		}

		function initVideo() {
			const videoModal = SDG.Modal({
				dom: {
					modal_id: c.modal.id
				},
				cb: {
					close: attachCloseEvent
				}
			});
			videoModal.init();
			videoModal.open(c.modal.id);
		}

		function attachCloseEvent() {
			setTimeout(() => {
				const clear = SDG.Modal.clear({
					modal: c.modal.id,
					overlay: c.modal.overlay
				});
				clear.init();
			}, 500);
		}
	}

	return { init };
};

export default SDG.videoEmbed;
