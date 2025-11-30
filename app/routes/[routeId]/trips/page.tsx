'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TripList from '@/components/tickets/TripList';

interface Trip {
  id: string;
  fecha: string;
  hora: string;
  asientos_disponibles: number;
  [key: string]: any;
}

export default function TripsPage() {
  const params = useParams();
  const routeId = params.routeId as string;
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!routeId) return;

    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:3001/tickets/trips/${routeId}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los viajes');
        }
        
        const data = await response.json();
        setTrips(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [routeId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Selecciona un viaje</h1>
      <p className="text-gray-600 mb-6">Ruta: {routeId}</p>
      
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
      
      {!loading && !error && trips.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">No hay viajes disponibles para esta ruta</p>
        </div>
      )}
      
      {!loading && !error && trips.length > 0 && (
        <TripList trips={trips} />
      )}
    </div>
  );
}
