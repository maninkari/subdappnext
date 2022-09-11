import { React, useEffect, useState } from 'react'
import { SubspaceClient, Identity } from '@subspace/subspace'
import { stringToU8a, u8aToHex } from '@polkadot/util'
// import init, * as wasm from '../../assets/convoluted_mirror'
// import mirrorwasm from '../../assets/convoluted_mirror_bg.wasm'
import WasmComp from '../../components/wasmComponent'

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
          setSelectedAccount(identity.getKeyringPair().address)
        })
      }
    } catch (error) {
      setMessage(error)
    }
  }, [identity])

  const loadFile = (file) => {
    let reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        const value = new Uint8Array(reader.result)
        setFileData(value)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const getObject = async () => {
    try {
      const object = await subspaceClient.getObject(objectId)
      setObject(object)
    } catch (e) {
      setMessage(e)
    }
  }

  const putObject = async () => {
    try {
      const objectId = await subspaceClient.putObject(fileData)
      setObjectId(objectId)
    } catch (e) {
      setMessage(e)
    }
  }

  const handleAccountSelect = ({ target }) => setSelectedAccount(target.value)

  const getLabel = ({ address, meta }) => {
    return meta.name.toUpperCase() + ' | ' + address
  }

  const signdoc = () => {
    const msg = stringToU8a('this is our message')
    let p = subspaceClient.putObject(msg)
    console.log(p)
  }

  return (
    <div>
      <h1>Page One</h1>
      <h2>1</h2>
      <button onClick={() => signdoc()}>bton</button>
      <p>{JSON.stringify(identity)}</p>
      <WasmComp />
    </div>
  )
}

export default Page
