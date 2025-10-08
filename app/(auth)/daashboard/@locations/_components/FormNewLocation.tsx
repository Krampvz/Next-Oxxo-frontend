import { Button, Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import axios from "axios";
import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import SelectManager from "./SelectManager";

interface FormNewLocationProps {
  store?: string | string[] | undefined;
}

export default async function FormNewLocation({ store }: FormNewLocationProps) {
  // Si hay store, no mostrar el formulario
  if (store) return null;

  const token = cookies().get(TOKEN_NAME)?.value;
  
  // Solo obtener managers (ya no necesitamos locations aquí)
  const responseManagers = await axios.get(`${API_URL}/managers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return (
    <form 
      action={createLocation} 
      className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3xl text-white text-center">Crear Tienda</h1>
      
      <Input 
        label="Nombre" 
        placeholder="Ocso Jurikiya" 
        name="locationName" 
      />
      <Input 
        label="Direccion" 
        placeholder="Av De La Luz S/N" 
        name="locationAddress" 
      />
      <Input 
        label="Latitud" 
        placeholder="-120" 
        name="locationLat" 
      />
      <Input 
        label="Longitud" 
        placeholder="20" 
        name="locationLng" 
      />
      
      <SelectManager managers={responseManagers.data} />
      
      <Button type="submit" color="primary">
        Subir
      </Button>
    </form>
  );
}