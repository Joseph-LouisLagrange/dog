export function getAllCoins(){
    return new Promise((resolve,reject)=>{
        resolve([{
            ID:1,
            name:"加拿大元",
            shortName:"CAD"
        },{
            ID:2,
            name:"人民币",
            shortName:"CNY"
        }
    ]);
    })
}