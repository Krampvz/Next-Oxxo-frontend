import deleteLocation from "@/actions/deleteLocation";
import { Button } from "@nextui-org/react";

export default function DeleteLocationButton({ store }: { store: string | string[] | undefined }) {
    if (!store) return null;
    
    return (
        <form action={deleteLocation} className="my-4">
            <input type="hidden" name="locationId" value={store} />
            <Button type="submit" color="danger">
                Borrar tienda
            </Button>
        </form>
    );
};