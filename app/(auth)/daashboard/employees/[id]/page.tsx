import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Employee } from "@/entities";

function EmployeeDataCard({ employee }: { employee: Employee }) {
    return (
        <div className="w-[360px] p-4 border rounded">
            <h2 className="text-xl font-semibold mb-1">{(employee as any)?.name ?? 'Unknown'}</h2>
            <div className="text-sm text-gray-700">Email: {(employee as any)?.email ?? '—'}</div>
            <div className="text-sm text-gray-700">Role: {(employee as any)?.role ?? '—'}</div>
        </div>
    );
}
function FormUpdateEmployee({ employee }: { employee: Employee }) {
    return (
        <form className="w-[420px] p-4 border rounded">
            <h3 className="text-lg font-medium mb-2">Update {(employee as any)?.name ?? 'Employee'}</h3>
            <div className="text-sm text-gray-700 mb-2">Email: {(employee as any)?.email ?? '—'}</div>
            {}
        </form>
    );
}

export default async function EmployeePage({ params }: { params: { id: string } }) {
    const responseEmployee = await fetch(`${API_URL}/employees/${params.id}`, {
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