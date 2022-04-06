
import axios from "axios";
import { http } from "../config/ApiConfig";
import { sleep } from "../util/Time";

export function loadBootData(){
    return http.get('/dujitang');
}