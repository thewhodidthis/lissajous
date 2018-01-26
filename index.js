'use strict';

/**
 * Damped harmonic oscillator
 * @module swing
 * @param {Number} A - Amplitude
 * @param {Number} f - Frequency
 * @param {Number} p - Phase (offset)
 * @param {Number} d - Damping
 * @returns {Number} - Displacement
 * @see {@link https://en.wikipedia.org/wiki/Harmonograph}
 * @example
 * swing(10, 10)();
 */
var index = function (A, f, p, d) {
	if ( A === void 0 ) A = 0;
	if ( f === void 0 ) f = 1;
	if ( p === void 0 ) p = 0;
	if ( d === void 0 ) d = 0;

	return function (t) {
	if ( t === void 0 ) t = 0;

	return A * Math.cos((t * f) + p) * Math.exp(-d * t);
;
}	};

module.exports = index;

