import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";
import { Manager } from "@/entities";
import Link from "next/link";

export default function ManagerCard({ manager }: { manager: Manager }) {
    return (
        <Card className="mx-20 py-2 text-center">
            <CardHeader>
                <p className="w-full">
                    <b className="text-4xl">{manager.managerFullName}</b>
                </p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="w-full">
                    Email: <b>{manager.managerEmail}</b>
                </p>
                <p className="w-full">
                    Teléfono: <b>{manager.managerPhoneNumber}</b>
                </p>
                <p className={manager.location ? "" : "hidden"}>
                    Tienda:{" "}
                    <Link
                        href={{
                            pathname: '/dashboard/locations',
                            query: {
                                store: manager?.location?.locationId
                            }
                        }}
                    >
                        <b className="underline">{manager?.location?.locationName}</b>
                    </Link>
                </p>
            </CardBody>
            {manager.location ? (
                <iframe
                    className="border-2 border-orange-800 rounded-md my-2"
                    // ... resto del iframe
                />
            ) : null}
        </Card>
    );
}