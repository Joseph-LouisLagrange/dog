export function getAllAccounts(){
    return new Promise((resolve,reject)=>{
        let data = [];
        for(let ID=1;ID<10;ID++){
            data.push({ID:ID,name:"fff"+ID});
        }
        resolve(data);
    })
}