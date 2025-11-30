'use client';

import { useEffect, useState } from 'react';
import RouteList from '@/components/tickets/RouteList';

interface Route {
  id: string;
  origen: string;
  destino: string;
  [key: string]: any;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/tickets/routes');
        
        if (!response.ok) {
          throw new Error('Error al cargar las rutas');
        }
        
        const data = await response.json();
        setRoutes(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Selecciona una ruta</h1>
      
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
      
      {!loading && !error && routes.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">No hay rutas disponibles</p>
        </div>
      )}
      
      {!loading && !error && routes.length > 0 && (
        <RouteList routes={routes} />
      )}
    </div>
  );
}
