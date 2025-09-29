// app/dashboard/page.tsx
export default function DashboardPage() {
    return (
        <div className="flex h-full w-full">
            <div className="h-full w-1/2 bg-red-100 p-4">
                <p>Hola soy section 1</p>
            </div>
            <div className="h-full w-1/2 bg-red-100 p-4">
                <p>Hola soy section 2</p>
            </div>
        </div>
    );
}