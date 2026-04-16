export interface BookCardItem {
    id: number
    title: string
    author: string
    category: string
    intro: string
    tags: string[]
    date: string
    readTime: string
    cover: string
    rating: number
    href: string
    content: string[]
}

export interface MonthlyReadingStats {
    books: number
    hours: number
    reviews: number
}

// API 统一响应结构
export interface ApiResponse<T> {
    code: number
    msg: string
    data: T
}
