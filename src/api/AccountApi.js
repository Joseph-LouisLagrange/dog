import { get, postJSON } from "../config/ApiConfig";

export function queryAllAccountType(){
    return get({url:"/public/getAccountTypes"});
}

export function createAccount(account){
    return postJSON({url:"/account/create",data:account})
}

export function getAccountStatisticsInfo(){
    return get({url:"/account/getAccountStatistics"});
}

export function queryAllAccount(){
    return get({url:"/account/readAll"});
}