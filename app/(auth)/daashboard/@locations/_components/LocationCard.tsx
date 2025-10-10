import axios from "axios";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { authHeaders } from "@/helpers/authHeaders";
import Link from "next/link";
import { API_URL } from "@/constants";
import { Location } from "@/entities";

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
  if (!store) return null;
  
  const { data } = await axios.get<Location>(
    `${API_URL}/locations/${store}`,
    {
      headers: {
        ...authHeaders()
      }
    }
  );

  return (
    <Card>
      <CardHeader>
        <b className="w-full text-2xl">{data.locationName}</b>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col w-full items-center">
        <p className="w-full">
          Manager:
          <Link href={{ pathname: '/dashboard/managers' }}>
            <b>{data.manager?.managerFullName}</b>
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}