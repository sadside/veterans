import type { CategoryType } from './categoryTypes'

export type LinkType = {
    name: string
    description: string
    path: string
}

export type GroupType = {
    id: number
    name: string
    title: string
    description: string
    image: string
    categories: CategoryType[]
    links?: LinkType[]
}
