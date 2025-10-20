import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateManager(managerId: string, formData: FormData) {
    let manager: any = {};
    formData.forEach((value, key) => {
        manager[key] = value;
    });
    
    // Convertir campos numéricos
    manager['managerSalary'] = +manager['managerSalary'];
    manager.location = +manager.location;
    
    // Eliminar location si no existe
    if (!manager?.location) delete manager?.location;
    
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
        method: "PATCH",
        body: JSON.stringify(manager),
        headers: {
            ...authHeaders(),
            'content-type': 'application/json'
        },
    });
    
    console.log(await response.json());
    
    if (response.status == 200) {
        revalidateTag("dashboard:managers");
        redirect("/dashboard/managers");
    }
}