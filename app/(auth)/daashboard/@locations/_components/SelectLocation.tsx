'use client'

import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface SelectLocationProps {
  locations: Location[];
  store?: string | string[] | undefined;
}

export default function SelectLocation({ locations, store }: SelectLocationProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "0" || e.target.value === "") {
      router.push('/dashboard');
    } else {
      router.push(`/dashboard?store=${e.target.value}`);
    }
  };

  return (
    <Select
      placeholder="Selecciona una tienda"
      label="Tienda"
      classNames={{
        mainWrapper: "hover:ring-2 ring-red-300 rounded-xl transition-all duration-200",
        trigger: "bg-white border-2 border-gray-200 hover:border-red-300",
        value: "text-gray-700 font-medium",
        popoverContent: "bg-white shadow-lg"
      }}
      selectedKeys={store ? [store].flat() : ["0"]}
      onChange={handleChange}
    >
      {locations.map((location: Location) => (
        <SelectItem 
          key={location.locationId} 
          value={location.locationId.toString()}
          textValue={location.locationName}
        >
          {location.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}