import { defineStore } from 'pinia'

import whiteNightCover from '@/assets/img/byx.jpg'
import mountainCover from '@/assets/img/ning.jpg'

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

const parseReadMinutes = (value: string) => {
  const matched = value.match(/\d+/)
  return matched ? Number(matched[0]) : 0
}

export const useBookListStore = defineStore('bookList', {
  state: () => ({
    bookList: [
      {
        id: 1,
        title: '《白夜行》：极致守护背后的沉重真相',
        author: '东野圭吾',
        category: '文学小说',
        intro:
          '东野圭吾用层层递进的叙事，把爱、罪与救赎编织成一段漫长又压抑的命运交缠。',
        tags: ['推理小说', '社会派', '人性'],
        date: '2026-04-17',
        readTime: '8 分钟',
        cover: whiteNightCover,
        rating: 5,
        href: '/reviews/1',
        content: [
          '《白夜行》最动人的地方，不在于案件本身有多复杂，而在于它把两个孩子被命运裹挟之后的漫长余生，一点点摊开在读者面前。所有表面的冷静与高效，都像是为了掩住更深的创伤。',
          '桐原亮司与唐泽雪穗之间那种近乎共生的关系，让小说始终带着危险的吸引力。你会在阅读中反复犹豫：这究竟是守护、利用，还是一种已经无法被正常语言定义的依赖。',
          '东野圭吾用极其克制的方式处理情绪，没有直接替角色辩白，却通过旁人的命运轨迹不断提醒我们，灾难从来不会只击中一个人。那些没有说出口的部分，反而构成了这本书最沉重的回声。',
        ],
      },
      {
        id: 2,
        title: '《活着》：苦难之中依然顽强生长',
        author: '余华',
        category: '文学小说',
        intro:
          '余华用极其克制的文字，写出普通人在时代裹挟下的失去、忍耐与生命韧性。',
        tags: ['经典', '中国文学', '现实主义'],
        date: '2026-04-05',
        readTime: '12 分钟',
        cover: mountainCover,
        rating: 4,
        href: '/reviews/2',
        content: [
          '《活着》并不是一部刻意煽情的小说，它的力量来自一种近乎平视的讲述。余华让福贵把自己的一生娓娓道来，读者没有被强迫悲伤，却几乎无法避免地被击中。',
          '这本书最可贵的是，它始终没有离开普通人的经验。时代、制度、家庭与命运以极其日常的方式压在一个人身上，于是“活着”本身就成了一种值得被反复确认的能力。',
          '读完之后留下的并不是宏大的结论，而是一种长久的安静。你会更理解那些沉默的人，也更理解为什么有些人并不需要赢，他们只是想把日子一天天过下去。',
        ],
      },
      {
        id: 3,
        title: '《百年孤独》：魔幻现实主义的巅峰之作',
        author: '加西亚·马尔克斯',
        category: '文学小说',
        intro:
          '马尔克斯用一个家族的百年兴衰，讲述拉丁美洲的历史变迁，孤独是贯穿全书的主题。',
        tags: ['魔幻现实', '经典', '拉美文学'],
        date: '2026-03-28',
        readTime: '8 分钟',
        cover: whiteNightCover,
        rating: 5,
        href: '/reviews/3',
        content: [
          '第一次读《百年孤独》时，很容易被人物与名字的重复弄得迷失方向，但恰恰是这种轮回感，让布恩迪亚家族像一个不断复制自身命运的寓言。',
          '马尔克斯把荒诞、神话、政治暴力和日常生活揉在一起，让“孤独”不再只是一个情绪词，而成了家族性格、历史结构，甚至整个大陆经验的一部分。',
          '当你读到最后，会明白这本书并不只是关于某一个家族的衰落，而是在追问：一个人、一座城、一个时代，究竟怎样才会被记住，又怎样被遗忘。',
        ],
      },
      {
        id: 4,
        title: '《人类简史》：从动物到上帝的旅程',
        author: '尤瓦尔·赫拉利',
        category: '历史哲学',
        intro:
          '尤瓦尔·赫拉利用独特视角，讲述了智人如何从非洲的一个不起眼物种，逐步成为地球主宰。',
        tags: ['历史', '人类学', '哲学思考'],
        date: '2026-03-25',
        readTime: '12 分钟',
        cover: mountainCover,
        rating: 5,
        href: '/reviews/4',
        content: [
          '《人类简史》最吸引人的地方，是它总能把我们习以为常的制度重新变得陌生。金钱、宗教、国家、公司，这些看似牢固的存在，在赫拉利笔下都被还原成“共同想象”的产物。',
          '这种讲法的冲击力很强，因为它迫使读者跳出日常经验，从更长的时间尺度重新理解人类文明的形成过程。你会意识到，许多让社会得以运转的东西，本质上依赖的是群体共识。',
          '当然，这本书也不是无可争议的，它的概括常常足够大胆，甚至带着作者鲜明的判断。但正因为如此，它很适合成为一本打开视野的书，而不是一本终极答案之书。',
        ],
      },
      {
        id: 5,
        title: '《挪威的森林》：青春与成长的迷失',
        author: '村上春树',
        category: '文学小说',
        intro:
          '村上春树用细腻的笔触描绘了青春期的迷茫与孤独，渡边与直子、绿子之间的情感纠葛让人唏嘘不已。',
        tags: ['青春', '爱情', '日本文学'],
        date: '2026-03-20',
        readTime: '10 分钟',
        cover: whiteNightCover,
        rating: 4,
        href: '/reviews/5',
        content: [
          '《挪威的森林》有一种很特别的阅读质感，它不急着提供结论，只是让人物在孤独、失落、欲望和爱之间慢慢穿行。青春在这里不是明亮的，而是带着长时间的潮湿和晃动。',
          '村上的文字总有一种轻微悬浮感，看似平静，却能把情绪拖得很长。渡边、直子、绿子的关系因此显得格外真实，因为很多时候，人并不是在做对或错的选择，而是在勉强维持某种平衡。',
          '如果说这本书最重要的主题是什么，我会说是“如何与失去共处”。它写爱情，也写死亡，更写人在成长过程中不得不学会承受的空白。',
        ],
      },
      {
        id: 6,
        title: '《小王子》：写给成年人看的温柔寓言',
        author: '圣埃克苏佩里',
        category: '童话寓言',
        intro:
          '它表面轻盈，内里却始终在追问爱、孤独、责任与人与人之间真正的连接，像一封写给所有大人的温柔信件。',
        tags: ['童话', '治愈', '成长'],
        date: '2026-03-16',
        readTime: '6 分钟',
        cover: mountainCover,
        rating: 5,
        href: '/reviews/6',
        content: [
          '很多人把《小王子》当作一本温柔的小书，但真正打动人的，其实是它用极其轻盈的形式，说出了成年人常常不愿承认的事实：我们会遗忘，会变得功利，也会失去看见本质的能力。',
          '狐狸那段关于驯养的解释，几乎可以视作整本书的核心。关系之所以重要，不是因为它让人占有了什么，而是因为在投入时间与情感之后，彼此才真正变得不可替代。',
          '每次重读《小王子》，读到的重点都不太一样。小时候读它，会记住那颗小星球和玫瑰；长大后再读，会更明白“责任”与“孤独”为什么总是一起出现。',
        ],
      },
    ] as BookCardItem[],
    monthlyStats: {
      books: 12,
      hours: 48,
      reviews: 6,
    } as MonthlyReadingStats,
  }),
  getters: {
    totalBooks: (state) => state.bookList.length,
    latestReviews: (state) =>
      [...state.bookList].sort(
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
        .map(([name, count]) => ({ name, count }))
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
        .map(([name, count]) => ({ name, count }))
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
})
