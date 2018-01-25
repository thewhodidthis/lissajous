import swing from '../index.mjs'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

target.lineCap = 'round'

const step = { x: canvas.width / 3, y: canvas.height / 2 }
const cell = { x: step.x * 0.5, y: step.y * 0.5 }
const size = cell.y * 0.75

const colors = [
  'rgba(255, 0, 0, 0.2)',
  'rgba(255, 255, 0, 0.2)',
  'rgba(255, 0, 255, 0.2)',
  'rgba(255, 255, 255, 0.2)',
  'rgba(0, 255, 255, 0.2)',
  'rgba(0, 0, 255, 0.2)'
]

const driver = (A = 1, a = 1, b = a, phase = Math.PI, B = A) => {
  const x = swing(A, a, phase)
  const y = swing(B, b)

  return t => ({ x: x(t), y: y(t) })
}

const render = (wave, t = 0) => {
  if (t < 1) {
    return false
  }

  const p = wave(t * 0.006)

  target.beginPath()
  target.moveTo(p.x, p.y)
  target.lineTo(0, 0)
  target.stroke()

  return render(wave, t - 1)
}

const grid = (v, i) => ({ x: i % 3, y: Math.floor(i / 3) })

Array.from({ length: 3 * 2 }).map(grid).forEach((v, i) => {
  const x = (v.x * step.x) + cell.x
  const y = (v.y * step.y) + cell.y

  // Odd numbers repeated, A109613
  const k = 2 * Math.floor(i * 0.5)
  const a = k + 1

  // Flip on each turn
  const b = i % 2 ? 2 : 4

  const lookup = driver(size, a, b)

  target.strokeStyle = colors[i]

  target.save()
  target.translate(x, y)

  render(lookup, 525)

  target.restore()
})
