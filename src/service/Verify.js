const verifyMapping = {
    "username":{
        regExp:new RegExp("^\d{11}$",'g'),
        errorMsg:"账号格式错误",
        explanation:"账号为 11 位数字"
    },
    "password":{
        
    }
}

export function getVerify(key){
    return verifyMapping[key];
}