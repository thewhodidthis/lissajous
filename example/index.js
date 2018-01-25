(function () {
'use strict';

/**
 * Helps produce damped harmonic motion
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
var swing = function (A, f, p, d) {
  if ( A === void 0 ) A = 0;
  if ( f === void 0 ) f = 1;
  if ( p === void 0 ) p = 0;
  if ( d === void 0 ) d = 0;

  return function (t) {
  if ( t === void 0 ) t = 0;

  return A * Math.cos((t * f) + p) * Math.exp(-d * t);
;
}  };

// Lissajous
var lookup = function (t, a, b, delta, A, B) {
  if ( t === void 0 ) t = 0;
  if ( a === void 0 ) a = 1;
  if ( b === void 0 ) b = a;
  if ( delta === void 0 ) delta = Math.PI * t;
  if ( A === void 0 ) A = 1;
  if ( B === void 0 ) B = A;

  return ({
  x: swing(A, a, delta)(t),
  y: swing(B, b)(t)
});
};

/* eslint no-unused-vars: 1 */
var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

target.fillStyle = '#888';

var turn = Math.PI * 2;
var step = { x: canvas.width / 4, y: canvas.height / 3 };
var cell = { x: step.x * 0.5, y: step.y * 0.5 };
var size = cell.y * 0.75;

var grid = function (v, i) { return ({ x: i % 4, y: Math.floor(i / 4) }); };

Array.from({ length: 4 * 3 }).map(grid).forEach(function (v, i) {
  var x = (v.x * step.x) + cell.x;
  var y = (v.y * step.y) + cell.y;

  var a = 5 + (2 * (v.y - 2));
  var k = 1 + v.x;
  var b = k === a ? 5 : k;
  var n = i === a ? 180 : 400;

  target.save();
  target.translate(x, y);

  var points = Array.from({ length: n }).map(function (_, j) { return lookup(j, a, b); });

  points.forEach(function (p) {
    target.beginPath();
    target.arc(p.x * size, p.y * size, 1, 0, turn);
    target.fill();
  });

  target.restore();
});

}());

