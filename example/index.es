import swing from '../index.mjs'

// Lissajous
const lookup = (t = 0, a = 1, b = a, delta = Math.PI * t, A = 1, B = A) => ({
  x: swing(A, a, delta)(t),
  y: swing(B, b)(t)
})

/* eslint no-unused-vars: 1 */
const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

target.fillStyle = '#888'

const turn = Math.PI * 2
const step = { x: canvas.width / 4, y: canvas.height / 3 }
const cell = { x: step.x * 0.5, y: step.y * 0.5 }
const size = cell.y * 0.75

const grid = (v, i) => ({ x: i % 4, y: Math.floor(i / 4) })

Array.from({ length: 4 * 3 }).map(grid).forEach((v, i) => {
  const x = (v.x * step.x) + cell.x
  const y = (v.y * step.y) + cell.y

  const a = 5 + (2 * (v.y - 2))
  const k = 1 + v.x
  const b = k === a ? 5 : k
  const n = i === a ? 180 : 400

  target.save()
  target.translate(x, y)

  const points = Array.from({ length: n }).map((_, j) => lookup(j, a, b))

  points.forEach((p) => {
    target.beginPath()
    target.arc(p.x * size, p.y * size, 1, 0, turn)
    target.fill()
  })

  target.restore()
})
