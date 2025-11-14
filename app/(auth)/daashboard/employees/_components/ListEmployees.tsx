import { Employee, Location } from "@/entities";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import EmployeeCard from "./EmployeeCard";
import EmployeePhotoCard from "./EmployeePhotoCard";
import CreateEmployee from "./CreateEmployee";
import FormCreateEmployee from "./FormCreateEmployee";

interface ListEmployeesProps {
  employees: Employee[];
  locations: Location[];
}

export default function ListEmployees({ employees, locations }: ListEmployeesProps) {
  const [filter, setFilter] = useState<string>("");
  console.log(locations);

  const filteredEmployees = employees.filter((employee: Employee) => {
    console.log(employee.location?.locationId);
    return filter === "" || String(employee.location?.locationId) === filter;
  });

  return (
    <div className="relative">
      {/* Filtro por ubicación */}
      <div className="flex flex-row mb-6">
        {locations && (
          <Select
            label="Tiendas"
            defaultSelectedKeys={[]}
            className="w-60 pr-20 py-10"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            {locations.map((location) => (
              <SelectItem key={location.locationId}>
                {location.locationName}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>

      {/* Lista de empleados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee: Employee) => (
          employee.employeePhoto === null ? (
            <EmployeePhotoCard 
              key={employee.employeeId} 
              employee={employee} 
            />
          ) : (
            <EmployeeCard 
              key={employee.employeeId} 
              employee={employee} 
            />
          )
        ))}
      </div>

      {/* Botón flotante para crear empleado */}
      <div className="absolute bottom-10 right-10">
        <CreateEmployee>
          <FormCreateEmployee />
        </CreateEmployee>
      </div>
    </div>
  );
}