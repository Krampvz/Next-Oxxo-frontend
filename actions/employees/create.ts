import { APL_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createEmployee(formData: FormData) {
    formData.delete("$ACTION_REF_0");
    formData.delete("$ACTION_0:1");
    formData.delete("$ACTION_0:0");
    
    const response = await fetch(`${APL_URL}/employees`, {
        method: "POST",
        headers: {
            ...authHeaders()
        },
        body: formData,
    });

    console.log(await response.json());
    
    if (response.status === 200) revalidateTag("dashboard:employees");
    return response;
}