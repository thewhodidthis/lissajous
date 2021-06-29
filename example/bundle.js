(() => {
  // ../main.js
  var config = (A = 0, f = 1, p = 0, d = 0) => (t = 0) => A * Math.cos(t * f + p) * Math.exp(-d * t);
  var main_default = config;

  // index.js
  var canvas = document.querySelector("canvas");
  var target = canvas.getContext("2d");
  target.lineCap = "round";
  target.strokeStyle = "rgba(0, 0, 0, 0.1)";
  var step = { x: canvas.width / 3, y: canvas.height / 2 };
  var cell = { x: step.x * 0.5, y: step.y * 0.5 };
  var size = cell.y * 0.75;
  var driver = (A = 1, a = 1, b = a, phase = Math.PI, B = A) => {
    const x = main_default(A, a, phase);
    const y = main_default(B, b);
    return (t) => ({ x: x(t), y: y(t) });
  };
  var render = (wave, t = 0) => {
    if (t < 1) {
      return false;
    }
    const p = wave(t * 6e-3);
    target.beginPath();
    target.moveTo(p.x, p.y);
    target.lineTo(0, 0);
    target.stroke();
    return render(wave, t - 1);
  };
  var grid = (_, i) => ({ x: i % 3, y: Math.floor(i / 3) });
  Array.from({ length: 3 * 2 }).map(grid).forEach((v, i) => {
    const x = v.x * step.x + cell.x;
    const y = v.y * step.y + cell.y;
    const k = 2 * Math.floor(i * 0.5);
    const a = k + 1;
    const b = i % 2 ? 2 : 4;
    const lookup = driver(size, a, b);
    target.save();
    target.translate(x, y);
    render(lookup, 525);
    target.restore();
  });
})();
