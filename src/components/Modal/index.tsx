import { useContext, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import ReactModal from 'react-modal';
import { AppContext } from '../../AppContext';

interface IProps {
  children: ReactNode;
  action: string;
  onRequestClose(event?: MouseEvent | KeyboardEvent): void;
}

export let onRequestCloseDefault = () => {};

export function Modal({ children, action, onRequestClose }: IProps) {
  const { useRegisterModal, toggleModal } = useContext(AppContext);

  onRequestCloseDefault = (event?: MouseEvent | KeyboardEvent) => {
    toggleModal();
  };

  const [isOpen] = useRegisterModal(action);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
