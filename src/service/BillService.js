import { INCOME } from "../config/Constant";

export function getBillSignoriesByType(billType){
    let name = "支出";
    if(billType==INCOME){
        name = "收入";
    }
    return new Promise((resolve,reject)=>{
        let data = new Array(50);
        for(let i=0;i<data.length;i++){
            data[i] = {ID:i+1,name:name};
        }
        resolve(data);
    })
}