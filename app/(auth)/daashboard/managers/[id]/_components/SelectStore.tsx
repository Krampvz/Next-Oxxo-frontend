'use client'
import { Location } from '@/entities'
import { Select, SelectItem } from '@nextui-org/react'

export default function SelectStore({ stores, defaultStore }: { stores: Location[]; defaultStore?: number | null }) {
    // disable stores that already have a manager, but keep the current defaultStore enabled
    const disabledStores = stores
        .filter((store: Location) => store.manager !== undefined && store.locationId !== defaultStore)
        .map((store: Location) => String(store.locationId));

    return (
        <Select label="Tienda" name="location" defaultSelectedKeys={defaultStore ? [String(defaultStore)] : undefined} disabledKeys={disabledStores}>
            {
                stores.map((store: Location) => {
                    return (
                        <SelectItem key={String(store.locationId)}>
                            {store.locationName}
                        </SelectItem>
                    )
                })
            }
        </Select>
    )
}