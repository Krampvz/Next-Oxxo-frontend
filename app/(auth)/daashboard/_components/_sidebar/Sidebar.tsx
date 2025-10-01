// app/dashboard/_components/_sidebar/Sidebar.tsx
import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
    return (
        <nav className="w-1/12 h-[90vh] bg-orange-200 flex flex-col items-center py-20 justify-center gap-10">
            <NavItem icon={<LuStore size={32} />} path="/dashboard" />
            <NavItem icon={<LuTruck size={32} />} path="/dashboard/providers" />
            <NavItem icon={<LuWheat size={32} />} path="/dashboard/products" />
            <NavItem icon={<LuUser size={32} />} path="/dashboard/managers" />
            <NavItem icon={<LuUsers size={32} />} path="/dashboard/employees" />
        </nav>
    );
}