import axios from "axios";
import { cookies } from "next/headers";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Employee } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";

export default async function EmployeesLocation({ store }: { store: string | string[] | undefined }) {
  if (!store) return <p>No hay empleados</p>;
  
  const token = cookies().get(TOKEN_NAME)?.value;
  
  const { data } = await axios.get<Employee[]>(
    `${API_URL}/employees/location/${store}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return data?.map((employee) => {
    const fullName = employee.employeeName + " " + employee.employeeLastName;
    return (
      <Card key={employee.employeeId} className="mx-10 my-10">
        <CardHeader>
          <p className="w-full">Nombre: <b>{fullName}</b></p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="w-full">Email: <b>{employee.employeeEmail}</b></p>
          <p className="w-full">Teléfono: <b>{employee.employeePhoneNumber}</b></p>
        </CardBody>
      </Card>
    );
  });
}