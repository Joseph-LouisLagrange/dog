import { http } from "../config/ApiConfig";

export function getAllLedgerCovers(){
    return new Promise((resolve,reject)=>{
        resolve([
            {
                ID: 1,
                uri: 'http://47.98.209.134:8080/file/preview?ID=2',
                name: '默认'
            }
            ,{
                ID: 2,
                uri: 'http://47.98.209.134:8080/file/preview?ID=2',
                name: '默认',
              },
              {
                ID: 3,
                uri: 'http://47.98.209.134:8080/file/preview?ID=2',
                name: '默认',
              },
              {
                ID: 4,
                uri: 'http://47.98.209.134:8080/file/preview?ID=2',
                name: '默认',
              },
              {
                ID: 5,
                uri: 'http://47.98.209.134:8080/file/preview?ID=2',
                name: '默认',
              },
              {
                ID: 6,
                uri: 'http://47.98.209.134:8080/file/preview?ID=2',
                name: '默认',
              }
        ]);
    });
}