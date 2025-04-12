export type NewsItem = {
    id: number
    title: string
    content: string
    image: string
}

export interface NewsTypes {
    categoryId: number | null
    groupId: number | null
    page?: number
    pageSize?: number
    results: NewsItem[] // массив новостей
    total_pages: number // общее количество страниц
}
