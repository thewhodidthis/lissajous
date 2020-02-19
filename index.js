'use strict';

/**
 * Damped pendulum
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
const index = (A = 0, f = 1, p = 0, d = 0) => (t = 0) => A * Math.cos((t * f) + p) * Math.exp(-d * t);

module.exports = index;
