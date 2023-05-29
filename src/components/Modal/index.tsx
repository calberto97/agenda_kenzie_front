import { StyledDiv } from './styles';
import { IoClose } from 'react-icons/io5';
import Modal from 'styled-react-modal';
import { ReactNode } from 'react';

interface iProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: ReactNode;
}

export const ContactModal = ({
  isOpen,
  toggleModal,
  children,
}: iProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <StyledDiv>
        <div className="top-bar">
          <IoClose onClick={toggleModal} />
        </div>
        <div className="children">{children}</div>
        <div className="bottom-bar" />
      </StyledDiv>
    </Modal>
  );
};
