export interface GetProductQuery {
    search? : string,
    page: 1,
    limit: 10
}

export interface commonQuery {
    page?: number,
    limit?: number,
    search?: string,
    offset?: number,
    noPagination: boolean
}