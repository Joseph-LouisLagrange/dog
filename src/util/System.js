import { Platform } from "react-native";
export const PLATFORM_OS = {
    IOS:"ios",
    ANDROID:"android",
    MACOS:"macos",
    WEB:"web",
    WINDOWS:"windows"
}
// 检测平台
export function test(os){
    return Platform.OS === os;
}

export function getRunTimeOS(){
    return Platform.OS;
}