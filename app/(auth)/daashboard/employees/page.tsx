import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee, Location } from "@/entities";
import ListEmployees from "./_components/ListEmployees";
import CreateEmployee from "./_components/CreateEmployee";
import FormCreateEmployee from "./_components/FormCreateEmployee";

export default async function EmployeesPage() {
    // Fetch employees
    const responseEmployees = await fetch(`${API_URL}/employees`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: ["dashboard:employees"],
        },
    });

    // Fetch locations
    const responseLocations = await fetch(`${API_URL}/locations`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: ["dashboard:locations"],
        },
    });

    if (!responseEmployees.ok || !responseLocations.ok) {
        throw new Error('Failed to fetch data');
    }

    const employees: Employee[] = await responseEmployees.json();
    const locations: Location[] = await responseLocations.json();

    return (
        <div className="relative">
            <div className="flex flex-wrap flex-grow-0 h-[90vh] gap-4 overflow-y-auto p-10">
                <ListEmployees employees={employees} locations={locations} />
            </div>
            <div className="absolute bottom-10 right-10">
                <CreateEmployee>
                    <FormCreateEmployee />
                </CreateEmployee>
            </div>
        </div>
    );
}