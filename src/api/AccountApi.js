import {get, postJSON, postKV} from '../config/ApiConfig';

export function queryDeletedAccountCount() {
  return get({url: '/account/queryDeletedCount'});
}

export function queryAllAccountType() {
  return get({url: '/public/getAccountTypes'});
}

export function createAccount(account) {
  return postJSON({url: '/account/create', data: account});
}

export function removeAccountCompletely(ID) {
  return postKV({url: '/account/removeCompletely', params: {ID: ID}});
}

export function recoverAccount(ID) {
  return get({url: '/account/recover', params: {ID: ID}});
}

export function updateAccount({ID, name, remark}) {
  return postKV({
    url: '/account/update',
    params: {
      ID: ID,
      name: name,
      remark: remark,
    },
  });
}

export function deleteAccount(ID) {
  return get({url: '/account/delete', params: {ID: ID}});
}

export function getAccountStatisticsInfo() {
  return get({url: '/account/getAccountStatistics'});
}

export function queryAllAccount() {
  return get({url: '/account/readAll'});
}
