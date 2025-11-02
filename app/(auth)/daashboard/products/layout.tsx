import { API_URL } from "@/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { ReactNode } from "react";

function FilteredCards({
    products,
    providers,
}: {
    products: Product[];
    providers: { providerId: string; providerName: string }[];
}) {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Filters</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Provider</label>
                <select className="w-full border rounded p-2" defaultValue="">
                    <option value="">All providers</option>
                    {providers.map((p) => (
                        <option key={p.providerId} value={p.providerId}>
                            {p.providerName}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h3 className="text-sm font-medium mb-2">Products</h3>
                <ul className="space-y-2 max-h-[60vh] overflow-auto">
                    {products.map((prod, idx) => (
                        <li key={(prod as any).id ?? idx} className="border rounded p-2">
                            <div className="font-medium">{(prod as any).name ?? JSON.stringify(prod)}</div>
                            {(prod as any).price !== undefined && (
                                <div className="text-sm text-gray-600">${(prod as any).price}</div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

interface Provider {
    providerId: string;
    providerName: string;
}

const LayoutProducts = async ({ children }: { children: ReactNode }) => {
    const responseProducts = await fetch(`${API_URL}/products`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: ["dashboard:products"],
        },
    });

    const products: Product[] = await responseProducts.json();

    const responseProviders = await fetch(`${API_URL}/providers`, {
        headers: {
            ...authHeaders(),
        },
        next: {
            tags: ["dashboard:providers"],
        },
    });

    const providers: Provider[] = await responseProviders.json();

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r">
                <FilteredCards products={products} providers={providers} />
            </div>
            <div className="w-3/4">
                {children}
            </div>
        </div>
    );
};

export default LayoutProducts;