import {PropsWithChildren} from 'react'
import { Alert } from 'react-bootstrap'
type Props = {
  variant: string,
 
}
const Message = ({ variant, children }: PropsWithChildren<Props>) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
