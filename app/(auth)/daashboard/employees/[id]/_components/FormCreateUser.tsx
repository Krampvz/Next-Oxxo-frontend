"use client";
import registerEmployee from "@/actions/users/register-employee";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { LuEye } from "react-icons/lu";

export default function FormCreateUserEmployee({ employee }: { employee: Employee }) {
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const { employeeId } = employee;
    const registerEmployeeById = registerEmployee.bind(null, employeeId);

    const generatePassword = () => {
        const length = 10;
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charset = lower + upper + numbers + symbols;

        const array = new Uint32Array(length);
        if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
            window.crypto.getRandomValues(array);
        } else {
            for (let i = 0; i < length; i++) {
                array[i] = Math.floor(Math.random() * 4294967295);
            }
        }

        const pwd = Array.from(array, (n) => charset[n % charset.length]).join("");
        setPassword(pwd);
        };
    
        return (
            <form>
                <h1 className="text-white text-xl font-bold text-center">
                    Crear Usuario
                </h1>
                <Input name="userEmail" label="Correo de cuenta" />
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
                <Button color="danger" onPress={generatePassword}>
                    Generar Contraseña
                </Button>
                <Button type="submit" color="primary">
                    Crear Usuario
                </Button>
            </form>
        );
    }
