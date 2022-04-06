import {http} from '../config/ApiConfig';

export function createLedger(ledger) {
  console.info(ledger);
}

export function getAllLedgers() {
  return new Promise((resolve, reject) => {
    let ledgers = [{name: '默认账本', ID: 0, using: true}];
    for (let i = 1; i <= 20; i++) {
      ledgers.push({name: '账本' + i, ID: i});
    }
    resolve(ledgers);
  });
}

export function getUsingLedger() {
  return new Promise((resolve, reject) => {
    resolve({
      name: '默认账本',
      ID: 0,
      using: true,
      coin: {
        url: 'http://www.baidu.com',
      },
    });
  });
}
