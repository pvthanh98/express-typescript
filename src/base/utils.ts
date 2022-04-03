import { commonQuery } from "./interface";

const convertError = (errors: Array<any>) => {
    const { constraints } = errors[0];
    let message = '';
    for (const key in constraints) {
        message = constraints[key];
        break;
    }

    return {
        code: "PARAS_1",
        message
    }
}

const processQuery = (query: any): commonQuery => {
    let queryData = {...query};
    if (!query.page) queryData.page = 1;
        else queryData.page = parseInt(query.page);
    if (!query.limit) queryData.limit = 8;
        else queryData.limit = parseInt(query.limit);
    if (!query.noPagination) queryData.noPagination = false;
        else queryData.noPagination = queryData.noPagination === 'true';

    queryData.offset = (queryData.page - 1) * queryData.limit;

    return queryData;
}

const paginateResponse = (results: any, query: commonQuery) => {
    const {limit, page} = processQuery(query);
    if (results instanceof Array && results[0] instanceof Array && results.length === 2){
        let response: any = {};
        let totalPage: any;
        if (limit) totalPage = Math.ceil(results[1] / limit);
        response.page = page;
        response.totalPage = totalPage;
        response.count = results[1];
        response.results = results[0];
        return response
    } 

    let response: any = {};
    response.results = results
    return response;
    
}

export {
    convertError,
    processQuery,
    paginateResponse
}