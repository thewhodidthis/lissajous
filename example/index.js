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

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

target.lineCap = 'round';

var step = { x: canvas.width / 3, y: canvas.height / 2 };
var cell = { x: step.x * 0.5, y: step.y * 0.5 };
var size = cell.y * 0.75;

var colors = 'ff0000 ffff00 ff00ff ffffff 00ffff 0000ff'.split(' ').map(function (v) {
  var hex = parseInt(v, 16);
  var rgb = [hex >> 16, hex >> 8, hex].map(function (c) { return c & 255; }).join(',');

  return ("rgba(" + rgb + ", 0.2)")
});

var driver = function (A, a, b, phase, B) {
  if ( A === void 0 ) A = 1;
  if ( a === void 0 ) a = 1;
  if ( b === void 0 ) b = a;
  if ( phase === void 0 ) phase = Math.PI;
  if ( B === void 0 ) B = A;

  var x = swing(A, a, phase);
  var y = swing(B, b);

  return function (t) { return ({ x: x(t), y: y(t) }); }
};

var render = function (wave, t) {
  if ( t === void 0 ) t = 0;

  if (t < 1) {
    return false
  }

  var p = wave(t * 0.006);

  target.beginPath();
  target.moveTo(p.x, p.y);
  target.lineTo(0, 0);
  target.stroke();

  return render(wave, t - 1)
};

var grid = function (v, i) { return ({ x: i % 3, y: Math.floor(i / 3) }); };

Array.from({ length: 3 * 2 }).map(grid).forEach(function (v, i) {
  var x = (v.x * step.x) + cell.x;
  var y = (v.y * step.y) + cell.y;

  // Odd numbers repeated, A109613
  var k = 2 * Math.floor(i * 0.5);
  var a = k + 1;

  // Flip on each turn
  var b = i % 2 ? 2 : 4;

  var lookup = driver(size, a, b);

  target.strokeStyle = colors[i];

  target.save();
  target.translate(x, y);

  render(lookup, 525);

  target.restore();
});

}());

