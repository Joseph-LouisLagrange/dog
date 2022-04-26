import {get } from '@/config/ApiConfig'
export function getAllLedgerCovers(){
    return get({url:"/public/ledgerCovers"});
}

