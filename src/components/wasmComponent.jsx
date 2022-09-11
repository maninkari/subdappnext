import { React, useEffect, useRef, createRef } from 'react'
import dynamic from 'next/dynamic'

const WIDTH = 720.0
const HEIGHT = 480.0
const mirrorCanvas = createRef()

const WasmComponent = dynamic({
  loader: async () => {
    const wasm = await import('../wasm/mirror/pkg')
    console.log('wasm: ', wasm)
    const bytes = await fetch('http://localhost:3000/convoluted_mirror_bg.wasm')
    const buffer = await bytes.arrayBuffer()
    await wasm.default(buffer)

    console.log('wasm: ', wasm)
    const m = new wasm.Mirror(mirrorCanvas.current, WIDTH, HEIGHT)

    return () => <div>m: {m && m.talk()}</div>
  },
  ssr: false,
})

export default function WasmComp() {
  useEffect(() => {
    console.log('useEffect 1')
  }, [])

  return (
    <div>
      Our WASM component:
      <canvas
        id="mirrorCanvas"
        width="720"
        height="480"
        ref={mirrorCanvas}
        style={{ backgroundcolor: 'red' }}
      ></canvas>
      <WasmComponent />
    </div>
  )
}
