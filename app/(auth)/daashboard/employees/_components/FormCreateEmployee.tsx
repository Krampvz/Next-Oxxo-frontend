import { Button, Input } from "@nextui-org/react";
import createEmployee from "@/actions/employees/create";
import { APL_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import SelectLocations from "./SelectLocation";

export default async function FormCreateEmployee() {
    const responseLocations = await fetch(`${APL_URL}/locations`, {
        headers: {
            ...authHeaders()
        }
    });
    
    const locations = await responseLocations.json();

    return (
        <form action={createEmployee} className="flex flex-col gap-2 p-8 rounded-md m-2 bg-orange-50 h-fit">
            <Input 
                isRequired 
                label="Nombre" 
                name="employeeName" 
                placeholder="Marco" 
            />
            <Input 
                isRequired 
                label="Apellidos" 
                name="employeeLastName" 
                placeholder="Aurelio" 
            />
            <Input 
                isRequired 
                label="Correo electrónico" 
                name="employeeEmail" 
                placeholder="marco@marco.com" 
            />
            <Input 
                isRequired 
                label="Num. de Teléfono" 
                name="employeePhoneNumber" 
                placeholder="444XXXXXXX" 
            />
            <Input 
                type="file" 
                name="employeePhoto" 
            />
            <SelectLocations stores={locations} />
            <Button type="submit" color="primary">
                Crear empleado
            </Button>
        </form>
    );
}