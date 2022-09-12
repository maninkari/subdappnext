import Head from 'next/head'
import Image from 'next/image'
import { Box, Stack, Text, Heading } from '@chakra-ui/react'
import one from '../../public/one.png'
import two from '../../public/two.png'

const HEIGHT = 360
const WIDTH = 480

const Page = () => {
  return (
    <Box>
      <Heading as="h1" size="lg">
        Subspace
      </Heading>
      <Stack direction={{ md: 'row', base: 'column' }} align="center" m=".5em">
        <Box m="1em">
          <p>
            1. Go to <b>Page One</b> and wait for video to load
          </p>
          <Image src={one} width={WIDTH} height={HEIGHT}></Image>
        </Box>
        <Box m="1em">
          <p>
            2. Click <b>capture</b> to render frames and <b>save</b> to push to
            subspace
          </p>
          <Image src={two} width={WIDTH} height={HEIGHT}></Image>
        </Box>
      </Stack>
      <Text fontSize="xs">
        * if the video doesn't load try refreshing the page{' '}
      </Text>
    </Box>
  )
}

export default Page
