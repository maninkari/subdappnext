import { React, useEffect, createRef } from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Heading,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const WIDTH = 480.0
const HEIGHT = 360.0
const mirrorCanvas = createRef()
const mirrorConvolute = createRef()

// this is a server side redered app, components that refer to elements in the DOM need to be dynamicaly loaded
const WasmComponent = dynamic({
  loader: async () => {
    const wasm = await import('../wasm/mirror/pkg')
    const bytes = await fetch(
      'http://randomendpoint.org/convoluted_mirror_bg.wasm'
    )
    const buffer = await bytes.arrayBuffer()
    await wasm.default(buffer)

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: WIDTH,
        height: HEIGHT,
      },
    })

    video.srcObject = stream
    await video.play()

    const mirror = new wasm.Mirror(mirrorCanvas.current, WIDTH, HEIGHT)

    const capture = async () => {
      mirror.convolute(mirrorConvolute.current.getContext('2d'))
    }

    async function animate() {
      // draw frame coming from the video stream
      if (mirrorCanvas && mirrorCanvas.current) {
        mirrorCanvas.current.getContext('2d').drawImage(video, 0, 0)
      }

      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

    return () => (
      <Button id="btn-capture" colorScheme="whatsapp" onClick={() => capture()}>
        capture
      </Button>
    )
  },
  ssr: false,
})

export default function WasmComp({ client }) {
  useEffect(() => {}, [])

  const save = async () => {
    let canvasUrl = mirrorConvolute.current.toDataURL('image/png', 1)
    client.putObject(new Uint8Array(canvasUrl))
  }

  return (
    <Box m=".5em">
      <Stack spacing={4} direction="row" align="center" mb=".5em">
        <WasmComponent />
        <Button id="btn-save" colorScheme="green" onClick={() => save()}>
          save
        </Button>
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} align="center">
        <Box bg="tomato" boxShadow="lg" minW={WIDTH} maxW={WIDTH}>
          <canvas
            id="mirrorConvolute"
            width={WIDTH}
            height={HEIGHT}
            ref={mirrorConvolute}
          ></canvas>
        </Box>
        <Box boxShadow="lg">
          <canvas
            id="mirrorCanvas"
            width={WIDTH}
            height={HEIGHT}
            ref={mirrorCanvas}
          ></canvas>
        </Box>
      </Stack>

      <Box display={'none'}>
        <video id="video" width={WIDTH} height={HEIGHT}></video>
      </Box>
    </Box>
  )
}
