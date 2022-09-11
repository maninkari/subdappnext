import { Text } from "@chakra-ui/react"
import Link from 'next/link'

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
      <Link href={to}>
        <a>
            <Text display="block" {...rest}>
            {children}
            </Text>
        </a>
      </Link>
    )
  }

export default MenuItem