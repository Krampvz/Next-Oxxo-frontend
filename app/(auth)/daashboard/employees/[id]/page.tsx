import { APL_URL } from "@/constants";
import EmployeeCard from "../_components/EmployeeCard";
import FormUpdateEmployee from "../_components/FormUpdateEmployee";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee } from "@/entities";
import { Image } from "@nextui-org/react";

export default async function EmployeePage({ params }: { params: { id: string } }) {
    const responseEmployee = await fetch(`${APL_URL}/employees/${params.id}`, {
        headers: {
            ...authHeaders()
        }
    });
    
    const employee: Employee = await responseEmployee.json();
    
    return (
        <div className="w-full h-[90vh] flex flex-row">
            <div className="flex flex-col items-center gap-4">
                <EmployeeCard employee={employee}/>
                <Image 
                    src={employee.employeePhoto}
                    isZoomed
                    className="object-cover"
                    classNames={{
                        img: "size-60"
                    }}
                />
            </div>
            <FormUpdateEmployee employee={employee}/>
        </div>
    );
}