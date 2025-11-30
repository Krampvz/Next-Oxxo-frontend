"use client";
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Image,
} from "@nextui-org/react";
import { ReactNode } from "react";

export default function CreateUser({
    children,
    photo,
}: {
    children: ReactNode;
    photo: string | undefined;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <Image 
                src={photo} 
                onClick={onOpen}
                isZoomed
                className="object-cover"
                classNames={{
                    img: "size-60",
                }}
                alt="User photo"
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-full">
                    {() => (
                        <ModalBody>
                            {children}
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}