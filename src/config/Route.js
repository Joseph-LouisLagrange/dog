import BootPage from "../page/Boot";
import Home from "../page/Home";
import { Login } from "../page/Login";

const ROUTES = [
    {
        name: "login",
        component: Login
    },{
        name: "home",
        component: Home
    },{
        name: "boot-page",
        component: BootPage
    }
]

export {ROUTES};
