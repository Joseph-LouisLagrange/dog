let hadLogined = false;
export function isLogin(){
    return hadLogined;
}

export function login(){
    hadLogined = true;
}

export function stayLoginState(sessionID){
    console.log("维持登录态",sessionID);
    login();
}
