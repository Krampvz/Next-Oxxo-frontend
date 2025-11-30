'use client';

import { useRouter } from 'next/navigation';

interface Trip {
  id: string;
  fecha: string;
  hora: string;
  asientos_disponibles: number;
  [key: string]: any;
}

interface TripListProps {
  trips: Trip[];
}

export default function TripList({ trips }: TripListProps) {
  const router = useRouter();

  const handleSelectTrip = (tripId: string) => {
    router.push(`/trips/${tripId}/seats`);
  };

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('es-ES', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="mb-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-600 text-sm">{formatDate(trip.fecha)}</p>
                <p className="text-2xl font-bold text-gray-800">{trip.hora}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                trip.asientos_disponibles > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {trip.asientos_disponibles} disponibles
              </span>
            </div>
            <p className="text-gray-600 text-sm">ID: {trip.id}</p>
          </div>
          
          <button
            onClick={() => handleSelectTrip(trip.id)}
            disabled={trip.asientos_disponibles <= 0}
            className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
              trip.asientos_disponibles > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {trip.asientos_disponibles > 0 ? 'Seleccionar asientos' : 'Sin disponibilidad'}
          </button>
        </div>
      ))}
    </div>
  );
}
