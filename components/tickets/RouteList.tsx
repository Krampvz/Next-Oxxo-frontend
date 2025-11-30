'use client';

import { useRouter } from 'next/navigation';

interface Route {
  id: string;
  origen: string;
  destino: string;
  [key: string]: any;
}

interface RouteListProps {
  routes: Route[];
}

export default function RouteList({ routes }: RouteListProps) {
  const router = useRouter();

  const handleSelectRoute = (routeId: string) => {
    router.push(`/routes/${routeId}/trips`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map((route) => (
        <div
          key={route.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {route.origen} → {route.destino}
            </h2>
            <p className="text-gray-600 text-sm">ID: {route.id}</p>
          </div>
          
          <button
            onClick={() => handleSelectRoute(route.id)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Ver viajes
          </button>
        </div>
      ))}
    </div>
  );
}
