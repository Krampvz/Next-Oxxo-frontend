// app/(auth)/layout.tsx
import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-orange-200 w-screen h-screen overflow-hidden grid">
            <div className="place-content-center place-self-center place-items-center text-center">
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/Oxco_Logo.svg.png" 
                        alt="No agarra la foto"
                        width={250}
                        height={60}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}