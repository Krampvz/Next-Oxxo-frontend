// app/(auth)/signup/page.tsx
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="bg-orange-500 px-10 py-6 rounded-md w-80">
            <p className="text-2xl my-4 text-white font-bold text-center">
                Registrarse en la plataforma
            </p>
            <div className="flex flex-col gap-3 my-4">
                <Input label="Email" type="email" isRequired={true} size="sm" />
                <Input label="Contraseña" type="password" isRequired={true} size="sm" />
                <Input label="Repetir contraseña" type="password" isRequired={true} size="sm" />
            </div>
            <div className="flex flex-col items-center gap-3">
                <Button color="primary" className="w-full">Registrarse</Button>
                <p className="text-white text-sm">
                    ¿Ya tienes una cuenta? <Link href="/login" className="text-red-600 underline">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}