import { LuStore, LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./NavItem";

export default function Sidebar() {
    return (
        <nav className="w-1/12 h-[90vh] bg-orange-200 flex flex-col items-center py-20 justify-center gap-10">
            <NavItem icon={<LuStore size={36}/>} path="/dashboard"/>
            <NavItem icon={<LuTruck size={36}/>} path="/dashboard/providers"/>
            <NavItem icon={<LuWheat size={36}/>} path="/dashboard/products"/>
            <NavItem icon={<LuUser size={36}/>} path="/dashboard/managers"/>
            <NavItem icon={<LuUsers size={36}/>} path="/dashboard/employees"/>
        </nav>
    );
}