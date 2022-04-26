import { get } from "../config/ApiConfig";

export function queryAllCoins(){
    return get({url:"/public/coins"});
}