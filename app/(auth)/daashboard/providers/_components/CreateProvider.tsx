'use client';
import { Modal, ModalContent, ModalBody, Button, useDisclosure } from '@nextui-org/react';
import { LuPlus } from 'react-icons/lu';
import CreateProviderForm from './CreateProviderForm';

export default function CreateProviderModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="w-fit" color="primary" onPress={onOpen}>
        <LuPlus size="20" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-full">
          {(onClose) => (
            <ModalBody>
              <CreateProviderForm onClose={onClose} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
