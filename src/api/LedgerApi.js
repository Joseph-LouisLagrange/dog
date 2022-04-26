import {get, http, postJSON, postKV} from '../config/ApiConfig';

export function createLedger(ledger) {
  return postJSON({url: '/ledger/create', data: ledger});
}

export function deleteLedger(ID) {
  return get({
    url: '/ledger/delete',
    params: {
      ID: ID,
    },
  });
}

export function queryAllLedgers() {
  return get({url: '/ledger/readAll'});
}

export function queryUsingLedger() {
  return get({url: '/ledger/readUsingLedger'});
}

export function queryLedgerByID(ID) {
  return get({
    url: '/ledger/readByID',
    params: {
      ID: ID,
    },
  });
}

export function updateLedger(ledger) {
  return postJSON({url: '/ledger/update', data: ledger});
}
