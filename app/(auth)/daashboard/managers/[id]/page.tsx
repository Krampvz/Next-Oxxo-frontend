import { API_URL } from "@/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ManagerCard from "./_components/ManagerCard";

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

    // @ts-ignore - the component file may not export a default; import the module and pick available export
    const DeleteManagerModule = await import("./_components/DeleteManagerButton");
    const DeleteManagerButton = (DeleteManagerModule.default ?? DeleteManagerModule.DeleteManagerButton) as any;

    return (
        <div className="flex flex-col gap-10 flex-grow-0 items-center justify-center">
            <ManagerCard manager={data} />
            <div className="bg-white shadow-medium rounded-md px-10 py-2">
                <DeleteManagerButton managerId={data.managerId} />
            </div>
        </div>
    );
}