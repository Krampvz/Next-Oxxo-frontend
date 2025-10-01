"use client";

import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubmitting(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let authData: any = {};
        authData.userEmail = formData.get("userEmail");
        authData.userPassword = formData.get("userPassword");

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                ...authData
            }, { 
                withCredentials: true,
            });
            if (response.status === 201) router.push('/dashboard');
            console.log(response.data);
            return;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        } finally {
            setSubmitting(false);
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
                    disabled={submitting}
                />
                <Input
                    label="Contraseña"
                    name="userPassword"
                    type="password"
                    isRequired={true}
                    size="sm"
                    disabled={submitting}
                />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button
                    color="primary"
                    type="submit"
                    disabled={submitting}
                    className="w-full"
                >
                    {submitting ? <Spinner size="md" /> : "Iniciar sesión"}
                </Button>
                <p className="text-white">
                    ¿No tienes cuenta? <Link href="/signup" className="text-red-600 underline">Regístrate</Link>
                </p>
            </div>
        </form>
    );
}