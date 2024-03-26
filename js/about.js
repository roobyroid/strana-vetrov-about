document.addEventListener('DOMContentLoaded', function () {
	// parallax
	try {
		const parallaxBlocks = document.querySelectorAll('.js_parallax');
		parallaxBlocks.forEach((parallaxBlock) => {
			gsap.to(parallaxBlock, {
				y: -100,
				ease: 'none',
				scrollTrigger: {
					trigger: 'body',
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			});
		});
	} catch (e) {}

	//  move text
	try {
		let mySwiper = new Swiper('.js_text-slider .swiper', {
			direction: 'vertical',
			effect: 'slide',
			slidesPerView: 1,
			loop: true,
			speed: 1000,
			allowTouchMove: false,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
		});
	} catch (e) {}

	// quote move
	try {
		const aboutCreator = document.querySelector('.js_about-creator');
		const quote = aboutCreator.querySelector('.js_about-quote');

		gsap.to(quote, {
			x: 0,
			opacity: 1,
			duration: 1,
			scrollTrigger: {
				trigger: aboutCreator,
				start: 'top 50%',
				end: 'bottom top',
				toggleActions: 'play none none none',
			},
		});
	} catch (e) {}

	// video play
	try {
		const videoParents = document.querySelectorAll('.js_video');
		videoParents.forEach((videoParent) => {
			const video = videoParent.querySelector('.js_video-content');
			const videoPoster = videoParent.querySelector('.js_video-poster');
			videoPoster.addEventListener('click', () => {
				videoParent.classList.add('show');
				video.play();
				video.volume = 0.5;
			});
		});
	} catch (e) {}

	try {
		const controller = new ScrollMagic.Controller();

		const dots = document.querySelectorAll('.js_history-dot');
		const cards = document.querySelectorAll('.js_history-card');
		const cardsWrap = document.querySelector('.about-history__cards-inner');

		// cards animation
		let tl = new TimelineMax();
		cards.forEach((card, index) => {
			cardsWrap.style.transform = `translateX(0%)`;
			tl.to(card, {
				onStart: function () {
					toggleActiveClass(index + 1, true);
					cardsWrap.style.transform = `translateX(calc(-${index * 100}% - ${
						index * 16
					}px))`;
					dotsMobActive(index);
				},
				onReverseComplete: function () {
					toggleActiveClass(index + 1, false);
				},
			}).to(card, {
				onStart: function () {
					toggleActiveClass(index + 1, false);
				},
				onReverseComplete: function () {
					toggleActiveClass(index + 1, true);
					cardsWrap.style.transform = `translateX(calc(-${index * 100}% - ${
						index * 16
					}px))`;
					dotsMobActive(index);
				},
			});

			card.style.zIndex = index + 1;
		});

		function toggleActiveClass(index, add) {
			const selector = `.js_history-card:nth-of-type(${index})`;
			const classList = document.querySelector(selector).classList;

			if (add) {
				dots[index - 1].classList.add('active');
				classList.add('active');
			} else {
				dots[index - 1].classList.remove('active');
				classList.remove('active');
			}
		}

		function dotsMobActive(index) {
			dots.forEach((dot) => {
				dot.classList.remove('active-mob');
				if (dot.classList.contains(`about-history__dot--${index + 1}`)) {
					dot.classList.add('active-mob');
				}
			});
		}

		let triggerHookValue = window.innerWidth < 992 ? 'onLeave' : 0.3;
		let offsetValue = window.innerWidth < 992 ? -30 : 0;

		// section pin
		const pinScene = new ScrollMagic.Scene({
			triggerElement: '.js_history-section',
			triggerHook: triggerHookValue,
			duration: '400%',
			offset: offsetValue,
		})
			.setTween(tl)
			.setPin('.js_history-section')
			.addTo(controller);
	} catch (e) {}
});
