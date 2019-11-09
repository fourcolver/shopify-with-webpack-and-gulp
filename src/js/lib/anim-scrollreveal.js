import ScrollReveal from 'scrollreveal';


SDG.ToutsReveal = function() {

	const sr = ScrollReveal();

	sr.reveal('.b-touts__item:nth-child(1)', {
		duration: 400,
		origin: 'left',
		distance: '150px'
	});

	sr.reveal('.b-touts__item:nth-child(2)', {
		duration: 400,
		origin: 'left',
		delay: 400,
		distance: '150px'
	});

	sr.reveal('.b-touts__item:nth-child(3)', {
		duration: 400,
		origin: 'left',
		delay: 800,
		distance: '150px'
	});

	sr.reveal('.vid__image', {
		duration: 700,
		origin: 'top',
		distance: '400px'
	});
};

export default SDG.ToutsReveal;
