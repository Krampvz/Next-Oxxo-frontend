import { LuTrash } from "react-icons/lu";
import { Button } from "@nextui-org/react";
import deleteEmployee from "@/actions/employees/delete";

export default function DeleteEmployee({ employeeId }: { employeeId: string }) {
    const deleteEmployeeById = async (formData: FormData) => {
        await deleteEmployee(employeeId, formData);
    };
    
    return (
        <form action={deleteEmployeeById}>
            <Button color="danger" type="submit">
                <LuTrash size={20} />
            </Button>
        </form>
    );
}