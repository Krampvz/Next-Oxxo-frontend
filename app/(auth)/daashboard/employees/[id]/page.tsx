import { APL_URL } from "@/constants";
import EmployeeDataCard from "../_components/EmployeeDataCard";
import FormUpdateEmployee from "../_components/FormUpdateEmployee";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee } from "@/entities";

export default async function EmployeePage({ params }: { params: { id: string } }) {
    const responseEmployee = await fetch(`${APL_URL}/employees/${params.id}`, {
        headers: {
            ...authHeaders()
        }
    });
    
    const employee: Employee = await responseEmployee.json();
    
    return (
        <div className="w-full h-[90vh] flex flex-row items-center justify-center gap-6">
            <EmployeeDataCard employee={employee} />
            <FormUpdateEmployee employee={employee} />
        </div>
    );
}