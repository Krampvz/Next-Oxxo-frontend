'use client';

interface Seat {
  numero: string;
  estado: 'AVAILABLE' | 'LOCKED' | 'SOLD';
  [key: string]: any;
}

interface SeatMapProps {
  seats: Seat[];
  onSelect: (seatNumber: string) => void;
}

export default function SeatMap({ seats, onSelect }: SeatMapProps) {
  const getColorClass = (estado: string) => {
    switch (estado) {
      case 'AVAILABLE':
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
      case 'LOCKED':
        return 'bg-yellow-500 cursor-not-allowed opacity-75';
      case 'SOLD':
        return 'bg-red-500 cursor-not-allowed opacity-75';
      default:
        return 'bg-gray-300';
    }
  };

  const getSortedSeats = () => {
    return [...seats].sort((a, b) => {
      const numA = parseInt(a.numero) || 0;
      const numB = parseInt(b.numero) || 0;
      return numA - numB;
    });
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.estado === 'AVAILABLE') {
      onSelect(seat.numero);
    }
  };

  const sortedSeats = getSortedSeats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="max-w-2xl mx-auto">
        {/* Simulación de pantalla del autobús */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gray-300 text-gray-700 py-2 px-4 rounded-b-full">
            Pantalla
          </div>
        </div>

        {/* Grid de asientos */}
        <div className="grid gap-3 justify-center" style={{ 
          gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 40px))',
          maxWidth: '300px',
          margin: '0 auto'
        }}>
          {sortedSeats.map((seat) => (
            <button
              key={seat.numero}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.estado !== 'AVAILABLE'}
              className={`w-10 h-10 rounded text-white font-semibold text-xs transition-all ${getColorClass(seat.estado)}`}
              title={`Asiento ${seat.numero} - ${seat.estado}`}
            >
              {seat.numero}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
