export interface MeatInterface {
    id: number
    name: string
    description: string
    is_part_of_diet: boolean
    dt_snack: string
    created_at: string | null
    updated_at: string | null
    deleted_at: string | null
}

export interface MeatStoreRequestInterface {
    name: string
    description: string
    isPartOfDiet: boolean
    date: string
    time: string
}
