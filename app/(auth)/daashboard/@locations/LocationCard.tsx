import axios from "axios";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { cookies } from "next/headers";
import Link from "next/link";
import { API_URL, TOKEN_NAME } from "@/constants";
import { Location } from "@/entities";

export default async function LocationCard({ store }: { store: string | string[] | undefined }) {
  if (!store) return null;
  
  const token = cookies().get(TOKEN_NAME)?.value;
  const { data } = await axios.get<Location>(
    `${API_URL}/locations/${store}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return (
    <Card>
      <CardHeader>
        <b className="w-full">{data.locationName}</b>
      </CardHeader>
      <Divider />
      <CardBody>
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