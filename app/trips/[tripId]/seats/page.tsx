'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SeatMap from '@/components/tickets/SeatMap';
import PurchaseModal from '@/components/tickets/PurchaseModal';

interface Seat {
  numero: string;
  estado: 'AVAILABLE' | 'LOCKED' | 'SOLD';
  [key: string]: any;
}

export default function SeatsPage() {
  const params = useParams();
  const tripId = params.tripId as string;
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!tripId) return;

    const fetchSeats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/tickets/seats/${tripId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los asientos');
        }
        
        const data = await response.json();
        setSeats(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setSeats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();

    // Polling cada 5 segundos
    const interval = setInterval(fetchSeats, 5000);

    return () => clearInterval(interval);
  }, [tripId]);

  const handleSelectSeat = (seatNumber: string) => {
    const seat = seats.find(s => s.numero === seatNumber);
    
    if (seat && seat.estado === 'AVAILABLE') {
      setSelectedSeat(seatNumber);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeat(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Selecciona tus asientos</h1>
      <p className="text-gray-600 mb-6">Viaje: {tripId}</p>
      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
      
      {!loading && !error && seats.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">No hay asientos disponibles para este viaje</p>
        </div>
      )}
      
      {!loading && !error && seats.length > 0 && (
        <>
          <div className="mb-6 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-gray-700">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              <span className="text-gray-700">Bloqueado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="text-gray-700">Vendido</span>
            </div>
          </div>
          
          <SeatMap seats={seats} onSelect={handleSelectSeat} />
        </>
      )}
      
      {isModalOpen && selectedSeat && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          seatNumber={selectedSeat}
          tripId={tripId}
        />
      )}
    </div>
  );
}
