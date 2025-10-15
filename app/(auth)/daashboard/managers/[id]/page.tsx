import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ManagerCard from "./_components/ManagerCard";
function UpdateManager({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

function FormUpdateManager({ manager }: { manager: Manager }) {
    return (
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    defaultValue={(manager as any)?.name ?? ""}
                    className="mt-1 block w-full border rounded px-2 py-1"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    defaultValue={(manager as any)?.email ?? ""}
                    className="mt-1 block w-full border rounded px-2 py-1"
                />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">
                    Save
                </button>
            </div>
        </form>
    );
}
import DeleteManagerButton from "./_components/DeleteManagerButton";

export default async function ManagerPage({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const response = await fetch(`${API_URL}/managers/${params.id}`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: [`dashboard:managers:${params.id}`, 'dashboard:managers'],
        },
    });

    const data: Manager = await response.json();
    
    return (
        <div className="flex flex-col gap-10 flex-grow-0 items-center justify-center">
            <ManagerCard manager={data} />
            <div className="bg-white shadow-medium rounded-md px-10 py-2">
                <UpdateManager>
                    <FormUpdateManager manager={data} />
                </UpdateManager>
                <DeleteManagerButton managerId={data.managerId} />
            </div>
        </div>
    );
}