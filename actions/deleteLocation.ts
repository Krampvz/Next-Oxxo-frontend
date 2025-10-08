"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function deleteLocation(formData: FormData) {
  const token = cookies().get(TOKEN_NAME)?.value;
  const locationId = formData.get("locationId");

  if (!locationId) {
    throw new Error("Se requiere locationId");
  }

  try {
    await axios.delete(`${API_URL}/locations/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    revalidatePath("/dashboard");
    
    return;
    
  } catch (error) {
    console.error("Error eliminando locación:", error);

    throw new Error("Error al eliminar la locación");
  }
}