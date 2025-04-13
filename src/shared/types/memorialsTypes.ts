export type Photo = {
    id: number
    image: string
    memorial: number
}

export type MemorialTypes = {
    id: number
    name: string
    description: string
    address: string
    latitude: number
    longitude: number
    yandex_link: string
    two_gis_link: string
    created_at: string
    updated_at: string
    photos: Photo[]
}
