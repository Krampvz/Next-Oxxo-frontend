import updateEmployee from "@/actions/employees/update";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import SelectLocations from "../../_components/SelectLocation";
import { APL_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function FormUpdateEmployee({ employee }: { employee: Employee }) {
    const { employeeId } = employee;
    // wrap the action so it returns void / Promise<void>, matching the expected form action signature
    const updateEmployeeById = async (formData: FormData) => {
        await updateEmployee(employeeId, formData);
    };
    
    const responseLocations = await fetch(`${APL_URL}/locations`, {
        headers: {
            ...authHeaders()
        }
    });
    
    const locations = await responseLocations.json();

    return (
        <form action={updateEmployeeById} className="flex flex-col gap-2 p-8 rounded-md m-2 bg-orange-50 h-fit">
            <Input label="Nombre" name="employeeName" defaultValue={employee.employeeName} />
            <Input label="Apellidos" name="employeeLastName" defaultValue={employee.employeeLastName} />
            <Input label="Correo electrónico" name="employeeEmail" defaultValue={employee.employeeEmail} />
            <Input label="Num. de Teléfono" name="employeePhoneNumber" defaultValue={employee.employeePhoneNumber} />
            <Input type="file" name="employeePhoto" />
            <SelectLocations stores={locations} defaultStore={employee.location?.locationId} />
            <Button type="submit" color="primary">
                Actualizar datos
            </Button>
        </form>
    );
}