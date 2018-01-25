> Helps create harmonograph inspired patterns

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/swing
```

### Usage
```sh
import swing from '@thewhodidthis/swing'

// Lissajous curve wrapper (no damping)
const driver = (a = 1, b = a, phase = Math.PI * 0.5, A = 1, B = A) => {
    // Shift both ends by half PI
    const x = swing(A, a, phase * 2)
    const y = swing(B, b, phase)

    return (t) => ({ x: x(t), y: y(t) })
}

// Points for Lemniscate of Gerono
const lookup = driver(100, 1, 2)

setInterval(() => {
    const t = Date.now()
    const { x, y } = lookup(t)
        
    console.log(x, y)
}, 1000)
```
