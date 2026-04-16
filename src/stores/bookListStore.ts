import {defineStore} from 'pinia'

import whiteNightCover from '@/assets/img/byx.jpg'
import mountainCover from '@/assets/img/ning.jpg'
import wcCover from '@/assets/img/wc.png'

// 找到这一行，确保它长这样（加上 export 关键字）
export type { BookCardItem, MonthlyReadingStats } from '@/types/book'
import type {BookCardItem, MonthlyReadingStats} from '@/types/book'
import {getBookListApi} from '@/api/bookapi.ts'
import {ca} from 'element-plus/es/locale/index.mjs'

const parseReadMinutes = (value: string) => {
    const matched = value.match(/\d+/)
    // 把匹配到的数字字符串转成数字类型
    return matched ? Number(matched[0]) : 0
}
// as MonthlyReadingStats 和 as BookCardItem[] 是类型断言，
// 告诉 TypeScript 这个对象的确切类型是什么，以便在后续代码中正确地使用这些属性和方法。
export const useBookListStore = defineStore('bookList', {
    state: () => ({
        bookList: [] as BookCardItem[],
        monthlyStats: {
            books: 0,
            hours: 0,
            reviews: 0,
        } as MonthlyReadingStats,
        loading: false,
        error: null as string | null,
    }),
    getters: {
        totalBooks: (state) => state.bookList.length,
        latestReviews: (state) =>
            // 浅拷贝数组并按日期降序排序，确保原始数据不被修改
            // state.bookList 会将数组种的每个元素都取出来，放进一个新的数组
            [...state.bookList].sort(
                // 比较相邻两个元素 a 和 b 的 date 属性，转换成时间戳进行比较，实现按日期降序排序
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            ),
        featuredBooks(): BookCardItem[] {
            return this.latestReviews.slice(0, 3)
        },
        categories: (state) => {
            const counts = state.bookList.reduce<Record<string, number>>((acc, book) => {
                acc[book.category] = (acc[book.category] ?? 0) + 1
                return acc
            }, {})

            return Object.entries(counts)
                .map(([name, count]) => ({name, count}))
                .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
        },
        popularTags: (state) => {
            const counts = state.bookList.reduce<Record<string, number>>((acc, book) => {
                book.tags.forEach((tag) => {
                    acc[tag] = (acc[tag] ?? 0) + 1
                })
                return acc
            }, {})

            return Object.entries(counts)
                .map(([name, count]) => ({name, count}))
                .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
                .slice(0, 10)
        },
        totalReadMinutes: (state) =>
            state.bookList.reduce((total, book) => total + parseReadMinutes(book.readTime), 0),
        averageRating: (state) => {
            if (!state.bookList.length) {
                return 0
            }

            const total = state.bookList.reduce((sum, book) => sum + book.rating, 0)
            return Number((total / state.bookList.length).toFixed(1))
        },
        statsOverview: (state) => {
            const totalBooks = state.bookList.length
            const averageRating = totalBooks
                ? Number(
                    (
                        state.bookList.reduce((sum, book) => sum + book.rating, 0) / totalBooks
                    ).toFixed(1),
                )
                : 0

            return [
                {
                    label: '收录书籍',
                    value: `${totalBooks}`,
                    hint: '持续更新阅读样本',
                },
                {
                    label: '平均评分',
                    value: `${averageRating}`,
                    hint: '基于全部书评打分',
                },
                {
                    label: '阅读时长',
                    value: `${state.monthlyStats.hours}h`,
                    hint: '本月累计沉浸时光',
                },
                {
                    label: '书评产出',
                    value: `${state.monthlyStats.reviews}`,
                    hint: '本月完成书评篇数',
                },
            ]
        },
        categoryBreakdown: (state) => {
            const totalBooks = state.bookList.length || 1
            const counts = state.bookList.reduce<Record<string, number>>((acc, book) => {
                acc[book.category] = (acc[book.category] ?? 0) + 1
                return acc
            }, {})

            return Object.entries(counts)
                .map(([name, count]) => ({
                    name,
                    count,
                    percent: Math.round((count / totalBooks) * 100),
                }))
                .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
        },
        reviewHighlights: (state) =>
            [...state.bookList]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((book, index) => ({
                    id: book.id,
                    title: book.title,
                    summary: book.intro,
                    category: book.category,
                    date: book.date,
                    readTime: book.readTime,
                    ranking: `0${index + 1}`.slice(-2),
                })),
        bookById: (state) => (id: number) =>
            state.bookList.find((book) => book.id === id) ?? null,
    },

    actions: {
        async fetchAllData() {
            this.loading = true;
            try {
                // 因为拦截器已经帮你判断了 code === 200 并剥离了 .data
                // 所以这里直接赋值即可！
                const data = await getBookListApi();
                this.bookList = data;
            } catch (err) {
                console.error('请求失败:', err);
            } finally {
                this.loading = false;
            }
        }
    }
})

