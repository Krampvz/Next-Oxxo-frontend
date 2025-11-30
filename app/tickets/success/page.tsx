'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TicketData {
  confirmationNumber?: string;
  seatNumber?: string;
  tripId?: string;
  routeName?: string;
  date?: string;
  price?: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ticketData, setTicketData] = useState<TicketData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extraer parámetros de query si existen
    const params: TicketData = {
      confirmationNumber: searchParams.get('confirmationNumber') || undefined,
      seatNumber: searchParams.get('seatNumber') || undefined,
      tripId: searchParams.get('tripId') || undefined,
      routeName: searchParams.get('routeName') || undefined,
      date: searchParams.get('date') || undefined,
      price: searchParams.get('price') || undefined,
    };

    setTicketData(params);
    setIsLoading(false);
  }, [searchParams]);

  const handleReturnHome = () => {
    router.push('/routes');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        {/* Icono de éxito */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Encabezado */}
        <h1 className="text-4xl font-bold text-center mb-2 text-green-600">
          ¡Compra confirmada!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Tu boleto ha sido comprado exitosamente
        </p>

        {/* Información del ticket */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            {ticketData.confirmationNumber && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Número de confirmación:</span>
                <span className="text-blue-600 font-mono font-bold">
                  {ticketData.confirmationNumber}
                </span>
              </div>
            )}

            {ticketData.seatNumber && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Asiento:</span>
                <span className="text-lg font-bold text-blue-600">
                  {ticketData.seatNumber}
                </span>
              </div>
            )}

            {ticketData.routeName && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Ruta:</span>
                <span className="text-gray-800">{ticketData.routeName}</span>
              </div>
            )}

            {ticketData.date && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Fecha y hora:</span>
                <span className="text-gray-800">{ticketData.date}</span>
              </div>
            )}

            {ticketData.price && (
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-700 font-semibold">Total pagado:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${ticketData.price}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mensajes informativos */}
        <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-700">
                Se ha enviado un correo de confirmación a tu email con los detalles del boleto.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-700">
                Guarda tu número de confirmación para presentarlo en la terminal.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-700">
                Presenta tu identificación y número de confirmación para recoger tu boleto.
              </p>
            </div>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={handleReturnHome}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
        >
          Volver a comprar más boletos
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          O espera a ser redirigido automáticamente en unos segundos...
        </p>
      </div>
    </div>
  );
}
