"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { Manager } from "@/entities";

export default function SelectManager({ managers }: { managers: Manager[] }) {
    return (
        <Select name="manager">
            {managers.map((manager: Manager) => {
                return (
                    <SelectItem key={manager.managerId}>
                        {manager.managerFullName}
                    </SelectItem>
                );
            })}
        </Select>
    );
}
