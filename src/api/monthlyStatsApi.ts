import request from '@/utils/requestAxios.ts';
import type {MonthlyReadingStats} from "@/types/book.ts";

// 获取月度阅读统计数据
export function getMonthlyStatsApi() {
    return request.get<any, MonthlyReadingStats>('/api/stats/getAllStats');
}