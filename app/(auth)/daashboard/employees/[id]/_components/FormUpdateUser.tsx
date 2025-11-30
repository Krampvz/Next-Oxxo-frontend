"use client";
import updateUser from "@/actions/users/update";
import { User } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { generate } from "generate-password";
import { LuEye } from "react-icons/lu";

export default function FormUpdateUser({ user }: { user: User }) {
    const userId = ((user as any).userId ?? (user as any).id) as string;
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const updateUserById = updateUser.bind(null, userId);

    const generatePassword = () => {
        setPassword(generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true
        }));
    };

    return (
        <form action={updateUserById} className="py-10 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-center">
                Actualizar Usuario
            </h1>
            <Input 
                defaultValue={user.userEmail} 
                name="userEmail" 
                label="Correo de cuenta" 
            />
            <Input
                value={password}
                type={visible ? "text" : "password"}
                name="userPassword"
                label="Contraseña"
                endContent={
                    <button 
                        type="button" 
                        onMouseUp={() => setVisible(false)} 
                        onMouseDown={() => setVisible(true)}
                    >
                        <LuEye size={20} />
                    </button>
                }
            />
            <Button
                color="danger"
                onPress={generatePassword}
            >
                Generar Contraseña
            </Button>
            <Button type="submit" color="primary">
                Actualizar Usuario
            </Button>
        </form>
    );
}