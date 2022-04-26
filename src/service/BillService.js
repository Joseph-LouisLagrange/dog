import { get } from "../config/ApiConfig";


export function getBillSignoriesByType(billType){
    return get({url:"/public/signories",params:{
        billType:billType
    }})
}