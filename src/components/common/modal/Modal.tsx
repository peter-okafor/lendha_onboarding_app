import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ModalContentProps {
  header?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
  size?: string;
  props?: ModalContentProps;
}

const Modal = ({
  header,
  children,
  isOpen = false,
  onClose = () => null,
  showCloseButton = true,
  size = 'sm',
  ...props
}: Props) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent pb={3} {...props}>
        {header && <ModalHeader>{header}</ModalHeader>}
        {showCloseButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
