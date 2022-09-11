import { Stack } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import MenuItem from './menuItem'

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/pageone">Page One</MenuItem>
        <MenuItem to="/contact-us">Contact Us</MenuItem>
      </Stack>
    </Box>
  )
}

export default MenuLinks
