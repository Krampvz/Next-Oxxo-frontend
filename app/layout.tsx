// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css"
import { Providers } from "./providers";  // ← Importa los providers

export const metadata: Metadata = {
    title: "0cso",
    description: "Página web de administración de 0csos",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Providers>  {/* ← Envuelve con Providers */}
                    {children}
                </Providers>
            </body>
        </html>
    );
}