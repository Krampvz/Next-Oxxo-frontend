"use server";

import { APL_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function updateEmployee(employeeId: string, formData: FormData) {
    const response = await fetch(`${APL_URL}/employees/${employeeId}`, {
        method: "PATCH",
        headers: {
            ...authHeaders()
        },
        body: formData,
    });

    console.log(response);
    return response;
}