import { Button, Input } from "@nextui-org/react";
import { updateLocation } from "@/actions/locations/update";
import { API_URL } from "@/constants";
import SelectManager from "./SelectManager";
import { authHeaders } from "@/helpers/authHeaders";
import { Location, Manager } from "@/entities";

export default async function FormUpdateLocation({ store }: { store: string | string[] | undefined }) {
    if (!store) return null;
    
    const responseManagers = await fetch(`${API_URL}/managers`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:managers"]
        }
    });
    const dataManagers: Manager[] = await responseManagers.json();
    
    const responseLocations = await fetch(`${API_URL}/locations`, {
        headers: {
            ...authHeaders()
        },
        next: {
            tags: ["dashboard:locations"]
        }
    });
    const dataLocations: Location[] = await responseLocations.json();

    let foundLocation = dataLocations.find((location) => location.locationId == +store);
    let foundManager = dataManagers.find((manager) => manager.managerId == foundLocation?.manager?.managerId);

    return (
        <form action={updateLocation.bind(null, store as string)} className="bg-orange-400 py-2 px-10 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear Tienda</h1>
            <Input 
                required 
                defaultValue={foundLocation?.locationName} 
                label="Nombre" 
                placeholder="Ocso Jurikiya" 
                name="locationName" 
            />
            <Input 
                required 
                defaultValue={foundLocation?.locationAddress} 
                label="Direccion" 
                placeholder="Av De La Luz S/N" 
                name="locationAddress" 
            />
            <Input 
                required 
                defaultValue={foundLocation?.locationLatLng[0]?.toString()} 
                label="Latitud" 
                placeholder="-120" 
                name="locationLat" 
            />
            <Input 
                required 
                defaultValue={foundLocation?.locationLatLng[1]?.toString()} 
                label="Longitud" 
                placeholder="20" 
                name="locationLng" 
            />
            <SelectManager 
                defaultManager={foundManager?.managerId} 
                managers={dataManagers} 
                locations={dataLocations} 
            />
            <Button type="submit" color="primary">Actualizar</Button>
        </form>
    );
}