import { React, useEffect, useState } from 'react'
import { SubspaceClient, Identity } from '@subspace/subspace'
import WasmComp from '../../components/wasmComponent'
import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react'

const NODE_WS_PROVIDER = process.env.REACT_APP_NODE_WS_PROVIDER
const FARMER_WS_PROVIDER = process.env.REACT_APP_FARMER_WS_PROVIDER
const suri = '//Alice'

const Page = () => {
  return (
    <div>
      <Heading as="h1" size="lg">
        Page One
      </Heading>
      <Box
        m=".5em"
        p="1.5em"
        bg="lightgray"
        maxW={{ base: '100%', md: '700px' }}
      >
        {/* <p>Account address: {keyringPair && keyringPair.address}</p>
        <p>Account name: {keyringPair && keyringPair.meta.name}</p> */}
      </Box>
      <WasmComp />
    </div>
  )
}

export default Page
