import {Pagination} from "../interfaces/Pagination.ts";

export function getPaginationData(headers: Headers): Pagination {
    const total = Number(headers.get('X-Pagination-Pages')) ?? undefined
    const currentPage = Number(headers.get('X-Pagination-Page')) ?? undefined

    return {
        currentPage,
        total
    }
}
