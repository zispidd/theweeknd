import Modal from 'react-modal'

interface IProps {
  open: boolean
}

const ModalComponent: React.FC<IProps> = ({ open }) => {
  return (
    <Modal
      isOpen={open ?? false}
    >

    </Modal>
  )
}

export default ModalComponent
