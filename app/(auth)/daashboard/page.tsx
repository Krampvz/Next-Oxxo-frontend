type SearchParams = { [key: string]: string | string[] | undefined };

function EmployeeLocation({ store }: { store?: string | string[] | undefined }) {
    return (
        <div className="p-4">
            {store ? (
                Array.isArray(store) ? store.join(", ") : store
            ) : (
                <span>No store selected</span>
            )}
        </div>
    );
}

export default function DashboardPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    return (
        <div className="h-full w-4/12">
            <div className="h-[90vh] overflow-hidden overflow-y-auto first:mt-0 last:mb-0">
                {
                    searchParams.store ? (
                        <EmployeeLocation store={searchParams?.store} />
                    ) : <p className="w-full text-2x1 px-2 text-center mt-10">Selecciona una tienda para ver los empleados</p>
                }
            </div>
        </div>
    );
}