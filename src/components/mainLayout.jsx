import { useState } from 'react'
import {Box} from '@chakra-ui/layout'

const MainLayout = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <Box width='100vw' height='100vh'>
            <Box backgroundColor={'lightgray'} p="1em"></Box>
            <Box p="1em">{children}</Box>
        </Box>
    )
}

export default MainLayout