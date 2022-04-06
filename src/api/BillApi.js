import dayjs from 'dayjs';
import {INCOME} from '../constant/Bills';

// 对于时间段查询账单，并进行时间排序
export function queryBillsForPeriod(ledgerID, startDate, endDate) {
  return new Promise((resolve, reject) => {
    let bills = [];
    for (let i = 1; i <= 10; i++) {
      bills.push({
        ID: i,
        signory: {
          icon: {
            type: 'entypo',
            name: 'cake',
          },
          name: '零食',
        },
        type: INCOME,
        amount: 265,
        coin: {
          symbol: '$',
        },
        account: {
          name: '默认账户',
        },
        remark:"这是备注",
        dateTime:dayjs().add(1,'day')
      });
    }
    resolve(bills);
  });
}
