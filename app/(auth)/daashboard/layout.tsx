// app/dashboard/layout.tsx
import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";

export default function LayoutDashboard({
    children,
    locations,
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
}>) {
    return (
        <div className="bg-orange-50">
            <Header />
            <div className="flex flex-row">
                <Sidebar />
                {children}
                {locations}
            </div>
        </div>
    );
}