'use client';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  seatNumber: string;
  tripId: string;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  seatNumber,
  tripId,
}: PurchaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Confirmar compra</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-gray-600 text-sm">Asiento seleccionado</p>
            <p className="text-4xl font-bold text-blue-600">{seatNumber}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Viaje ID:</span>
              <span className="font-semibold text-gray-800">{tripId}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-lg font-bold text-green-600">$250.00</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              console.log(`Compra confirmada - Asiento: ${seatNumber}, Viaje: ${tripId}`);
              onClose();
            }}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Comprar
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Al hacer clic en "Comprar" aceptas los términos y condiciones
        </p>
      </div>
    </div>
  );
}
