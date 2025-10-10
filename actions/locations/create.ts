"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createLocation(formData: FormData) {
  let location: any = {};
  let locationLatLng = [0, 0];
  
  const formDataEntries = Array.from(formData.entries());
  for (const [key, value] of formDataEntries) {
    if (value) {
      if (key === "locationLat") {
        locationLatLng[0] = +value;
      } else if (key === "locationLng") {
        locationLatLng[1] = +value;
      } else {
        location[key] = value;
      }
    }
  }

  location.locationLatLng = locationLatLng;

  const response = await fetch(`${API_URL}/locations`, {
    method: "POST",
    body: JSON.stringify(location),
    headers: {
      "Content-Type": "application/json",
      ...authHeaders()
    }
  });

  const { locationId }: { locationId: string } = await response.json();

  if (response.status === 201) {
    revalidateTag("dashboard:locations");
    redirect(`/dashboard?store=${locationId}!`);
  }
}