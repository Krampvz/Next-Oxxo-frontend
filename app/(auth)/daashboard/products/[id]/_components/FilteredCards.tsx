'use client';

import { useState, useEffect } from "react";
import { Product } from "@/entities";
import { Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import ProductCard from "./ProductCard";

interface Provider {
  providerId: string;
  providerName: string;
}

interface FilteredCardsProps {
  products: Product[];
  providers: Provider[];
}

export default function FilteredCards({ products, providers }: FilteredCardsProps) {
    const [productsList, setProductsList] = useState<Product[]>(products);
    const [filtered, setFiltered] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("");

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            const matchesName = product.productName.toLowerCase().includes(filtered.toLowerCase());
            const matchesProvider = selectedProvider === "" || product.provider.providerId === selectedProvider;
            
            return matchesName && matchesProvider;
        });

        setProductsList(filteredProducts);
    }, [filtered, selectedProvider, products]);

    return (
        <div className="max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-8 border-r-orange-400 border-r-2 pt-10 px-10">
            <div className="flex gap-4">
                <Input
                    autoFocus={true}
                    onChange={(e) => {
                        setFiltered(e.target.value);
                    }}
                    label="Nombre del producto"
                    className="flex-1"
                />
                
                <Select
                    label="Proveedor"
                    selectedKeys={selectedProvider ? new Set([selectedProvider]) : new Set()}
                    onSelectionChange={(keys) => {
                        const first = Array.from(keys as Set<string>)[0];
                        setSelectedProvider(first ?? "");
                    }}
                    className="flex-1"
                >
                    <SelectItem key="">
                        Todos los proveedores
                    </SelectItem>
                    {(providers.map((p) => (
                        <SelectItem key={p.providerId}>
                            {p.providerName}
                        </SelectItem>
                    )) as unknown as any)}
                </Select>
            </div>
            
            {productsList.map((product) => {
                return (
                    <Link
                        className="hover:scale-110 transition-transform"
                        key={product.productId}
                        href={`/dashboard/products/${product.productId}`}
                    >
                        <ProductCard product={product} />
                    </Link>
                );
            })}
        </div>
    );
}