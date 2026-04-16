import request from '@/utils/requestAxios.ts';
import type {BookCardItem} from '@/types/book.ts';

// 获取书籍列表
export function getBookListApi() {
    return request.get<any, BookCardItem[]>('/api/books/getAllBooks');
}

// 根据 ID 获取详情
export function getBookDetailApi(id: number) {
    return request.get<any, BookCardItem>(`/api/books/${id}`);
}