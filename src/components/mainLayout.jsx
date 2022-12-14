import { React, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import MenuToggle from './menuToggle'
import MenuLinks from './menuLinks'

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Box width="100vw" height="100vh" id="mainbox">
      <Box bgGradient="linear(to-b, #EFEFEF, #FFFFFF)" boxShadow="base" p="1em">
        <MenuLinks isOpen={isOpen} />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
      </Box>
      <Box p="1em">{children}</Box>
    </Box>
  )
}

export default MainLayout
