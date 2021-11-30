import Modal, { Styles } from 'react-modal'
import styled from 'styled-components'
import Link from 'next/dist/client/link'

const customStyles = {
  content: {
    padding: '20px',
    backgroundColor: '#1F1F1F',
    border: 0,
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
} as Styles

const HeaderStyled = styled.h1`
  font-size: 18px;
`

const LinkStyled = styled.a`
  color: #66D36E;
`
const HeaderBody = styled.div`
  
`

interface IProps {
  open: boolean
  onClose: () => void
}

const ModalComponent: React.FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal
      isOpen={open ?? false}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel='Thank you for download!'
    >
      <HeaderStyled>
        Thank you for using your website!
      </HeaderStyled>
      <HeaderBody className='mt-3'>
        We have some special for you! If you are using Spotify check out the
        <Link
          href='https://discify.bio'
          passHref
        >
          <LinkStyled target='_blank'> discify.bio </LinkStyled>
        </Link>
        service
      </HeaderBody>
    </Modal>
  )
}

export default ModalComponent
