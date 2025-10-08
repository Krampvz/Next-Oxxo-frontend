"use server";

export async function createLocation(formData: FormData) {
    let location: any = {};
    let locationLatLng = [0, 0];
    
    const keys = Array.from(formData.keys());
    
    for (const key of keys) {
        const value = formData.get(key);
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
    console.log(location);
}