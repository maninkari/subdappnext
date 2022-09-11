import { React, useEffect, useState } from 'react'
import { SubspaceClient, Identity } from '@subspace/subspace'
import WasmComp from '../../components/wasmComponent'
import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react'

const NODE_WS_PROVIDER = process.env.REACT_APP_NODE_WS_PROVIDER
const FARMER_WS_PROVIDER = process.env.REACT_APP_FARMER_WS_PROVIDER

const Page = () => {
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [identity, setIdentity] = useState(null)
  const [subspaceClient, setSubspaceClient] = useState(null)
  const [objectId, setObjectId] = useState(null)
  const [object, setObject] = useState(null)
  const [message, setMessage] = useState(null)
  const [fileData, setFileData] = useState(null)
  const [keyringPair, setKeyringPair] = useState(null)

  const availableAccounts = identity ? identity.getKeyring().getPairs() : []

  useEffect(() => {
    console.log('useEffect 1')
    Identity.fromWeb3()
      .then((identity) => {
        setIdentity(identity)
        console.log('identity: ', identity)
      })
      .catch((error) => {
        setMessage(error)
      })
  }, [])

  useEffect(() => {
    try {
      if (identity) {
        console.log('connected')

        SubspaceClient.connect(
          identity,
          NODE_WS_PROVIDER,
          FARMER_WS_PROVIDER
        ).then((subspaceClient) => {
          setSubspaceClient(subspaceClient)
          setKeyringPair(identity.getKeyringPair())
          setSelectedAccount(identity.getKeyringPair().address)
        })
      }
    } catch (error) {
      setMessage(error)
    }
  }, [identity])

  const handleAccountSelect = ({ target }) => setSelectedAccount(target.value)

  const getLabel = ({ address, meta }) => {
    return meta.name.toUpperCase() + ' | ' + address
  }

  return (
    <div>
      <Heading>Page One</Heading>
      <Box
        m=".5em"
        p="1.5em"
        bg="lightgray"
        maxW={{ base: '100%', md: '700px' }}
      >
        <p>Account address: {keyringPair && keyringPair.address}</p>
        <p>Account name: {keyringPair && keyringPair.meta.name}</p>
      </Box>
      {subspaceClient && <WasmComp client={subspaceClient} />}
    </div>
  )
}

export default Page
