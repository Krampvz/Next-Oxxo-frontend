import { API_URL } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./components/EmployeeCard";

const EmployeesPage = async () => {
    const response = await fetch(`${API_URL}/employees`, {
        headers: {
            ...authHeaders(),
        },
    });
    const employees: Employee[] = await response.json();

    return (
        <>
            {employees.map((employee: Employee) => {
                return <EmployeeCard key={employee.employeeId} employee={employee} />;
            })}
        </>
    );
};

export default EmployeesPage;