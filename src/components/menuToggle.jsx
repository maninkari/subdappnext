import { Box } from "@chakra-ui/layout"
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <AiOutlineClose/> : <AiOutlineMenu/>}
    </Box>
  )
}

export default MenuToggle