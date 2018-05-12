> Helps create harmonograph style patterns

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/swing
```

### Usage
```js
import swing from '@thewhodidthis/swing'

// Lissajous curve wrapper (no damping)
const driver = (A = 1, B = A, a = 1, b = a * 2, phase = Math.PI * 0.5) => {
    const x = swing(A, a, phase)
    const y = swing(B, b, phase)

    return t => ({ x: x(t), y: y(t) })
}

// Points for Lemniscate of Gerono
const lookup = driver(175, 100)

setInterval(() => {
    const t = Date.now()
    const { x, y } = lookup(t)
        
    console.log(x, y)
}, 1000)
```
