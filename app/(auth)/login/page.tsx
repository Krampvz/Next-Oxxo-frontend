// app/(auth)/login/page.tsx
"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/constants";

export default function LoginPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        let authData: any = {};
        authData.userEmail = formData.get("userEmail");
        authData.userPassword = formData.get("userPassword");

        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, authData, {
                withCredentials: true,
            });
            
            console.log(data);
            return;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <form className="bg-orange-500 px-10 py-6 rounded-md w-80" onSubmit={handleSubmit}>
            <p className="text-2xl my-4 text-white font-bold text-center">
                Iniciar sesión
            </p>
            <div className="flex flex-col gap-3 my-4">
                <Input 
                    label="Email" 
                    name="userEmail" 
                    type="email" 
                    isRequired={true} 
                    size="sm" 
                />
                <Input 
                    label="Contraseña" 
                    name="userPassword" 
                    type="password" 
                    isRequired={true} 
                    size="sm" 
                />
            </div>
            <div className="flex flex-col items-center gap-3">
                <Button 
                    color="primary" 
                    className="w-full" 
                    type="submit"
                >
                    Iniciar sesión
                </Button>
                <p className="text-white text-sm">
                    ¿No tienes cuenta? <Link href="/signup" className="text-red-600 underline">Regístrate</Link>
                </p>
            </div>
        </form>
    );
}