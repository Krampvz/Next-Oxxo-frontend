// app/(auth)/login/page.tsx
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="bg-orange-500 px-10 py-6 rounded-md w-80">
            <p className="text-2xl my-4 text-white font-bold text-center">
                Iniciar sesión
            </p>
            <div className="flex flex-col gap-3 my-4">
                <Input label="Email" type="email" isRequired={true} size="sm" />
                <Input label="Contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-3">
                <Button color="primary" className="w-full">Iniciar sesión</Button>
                <p className="text-white text-sm">
                    ¿No tienes cuenta? <Link href="/signup" className="text-red-600 underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );
}