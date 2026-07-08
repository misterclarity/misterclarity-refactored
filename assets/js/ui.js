/* ========================================================================= */
/*	Shared UI behaviors: scroll animations (AOS) + back-to-top button
/* ========================================================================= */

(function () {
	'use strict';

	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// AOS scroll-reveal animations (only where the library is loaded)
	if (typeof AOS !== 'undefined') {
		AOS.init({
			duration: 650,
			easing: 'ease-out-cubic',
			once: true,
			offset: 80,
			disable: reducedMotion
		});
	}

	// Back-to-top button
	var topBtn = document.querySelector('.back-to-top');
	if (topBtn) {
		var toggle = function () {
			topBtn.classList.toggle('visible', window.scrollY > 500);
		};
		window.addEventListener('scroll', toggle, { passive: true });
		toggle();

		topBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: reducedMotion ? 'auto' : 'smooth'
			});
		});
	}
})();
