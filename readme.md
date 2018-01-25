> Helps create harmonograph inspired patterns

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/swing
```

### Usage
```sh
import swing from '@thewhodidthis/swing'

// Lissajous wrapper (no damping)
const lookup = (t = 0, a = 1, b = a, ph = Math.PI * t, A = 1, B = A) => ({
    x: swing(A, a, ph)(t),
    y: swing(B, b)(t)
})

// X-path
setInterval(() => {
    const { x, y } = lookup(Date.now(), 100)
        
    console.log(x, y)
}, 1000)
```
