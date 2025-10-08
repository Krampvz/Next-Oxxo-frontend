import axios from "axios";
import { cookies } from "next/headers";
import { Location } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";

interface LocationsPageProps {
  
  searchParams: { 
    [key: string]: string | string[] | undefined 
  };
}

const LocationsPage = async ({ searchParams }: LocationsPageProps) => {
  const userCookies = cookies();
  const token = userCookies.get(TOKEN_NAME)?.value;

  let { data } = await axios.get<Location[]>(
    `${API_URL}/locations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  data = [
    {
      locationId: 0,
      locationName: "Ninguna",
      locationLatLng: [0, 0],
      locationAddress: "No existe",
      manager: undefined,
      region: undefined,
      employees: undefined,
    },
    ...data,
  ];

  return (
    <div className="w-7/12">
      <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
        
        <div className="w-1/2 my-10">
          <SelectLocation locations={data} store={searchParams.store} />
        </div>
        
        <div className="w-8/12">
          <LocationCard store={searchParams.store} />
        </div>
        
        <div className="w-6/12">
          <FormNewLocation store={searchParams.store} />
        </div>

        <DeleteLocationButton store={searchParams.store} />
        
      </div>
    </div>
  );
};

export default LocationsPage;