// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css"
import { Providers } from "./providers";  // ← Importa los providers

export const metadata: Metadata = {
    title: "Sistema de Boletos",
    description: "Plataforma de compra de boletos - OCSO",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
                <Providers>  {/* ← Envuelve con Providers */}
                    {/* Header */}
                    <header className="bg-white shadow-sm sticky top-0 z-40">
                        <div className="max-w-4xl mx-auto px-6 py-4">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-blue-600">
                                    🎫 Sistema de Boletos
                                </h1>
                                <nav className="hidden md:flex gap-6">
                                    <a href="/routes" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                        Rutas
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                        Mis Boletos
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                        Ayuda
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="max-w-4xl mx-auto p-6">
                            {children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-gray-800 text-gray-300 mt-auto">
                        <div className="max-w-4xl mx-auto px-6 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Sobre nosotros</h3>
                                    <p className="text-sm text-gray-400">
                                        Plataforma confiable para la compra de boletos de transporte en línea.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Enlaces útiles</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos y condiciones</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de privacidad</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-3">Soporte</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="text-gray-400">📧 soporte@boletos.com</li>
                                        <li className="text-gray-400">📞 1-800-BOLETOS</li>
                                        <li className="text-gray-400">⏰ Lunes - Viernes 8am - 6pm</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                                <p>&copy; 2025 Sistema de Boletos. Todos los derechos reservados.</p>
                            </div>
                        </div>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}