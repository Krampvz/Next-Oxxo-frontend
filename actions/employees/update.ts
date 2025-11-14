import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateEmployee(employeeId: string, formData: FormData) {
    try {
        const cleanData = new FormData();
        
        Array.from(formData.entries()).forEach(([key, value]) => {
            if (!key.startsWith("$ACTION") && !key.startsWith("$")) {
                cleanData.append(key, value);
            }
        });

        const response = await fetch(`${API_URL}/employees/${employeeId}`, {
            method: "PATCH",
            headers: {
                ...authHeaders()
            },
            body: cleanData,
        });

        const result = await response.json();
        console.log("Update response:", result);

        if (response.ok) {
            revalidateTag("dashboard:employees");
            revalidateTag(`dashboard:employees:${employeeId}`);
        }

        return { success: response.ok, data: result, status: response.status };
        
    } catch (err) {
        console.error("Error updating employee:", err);
        const message = err instanceof Error ? err.message : String(err);
        return { success: false, error: message, status: 500 };
    }
}