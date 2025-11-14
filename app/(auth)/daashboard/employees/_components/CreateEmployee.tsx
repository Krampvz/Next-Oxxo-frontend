import { LuPlus } from "react-icons/lu";
import { Button, Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";

export default function CreateEmployee({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Button onPress={onOpen} color="primary">
                <LuPlus size={20} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-full">
                    {(onClose) => (
                        <ModalBody>
                            {children}
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}