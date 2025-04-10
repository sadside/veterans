import type { CategoryType } from './categoryTypes'

export type LinkType = {
    name: string
    description: string
    path: string
}

export type GroupType = {
    id: number
    group: CategoryType
    name: string
    title: string
    description: string
    image: string
    links?: LinkType[]
}
