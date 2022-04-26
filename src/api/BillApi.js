import dayjs from 'dayjs';
import {get, postJSON, postKV} from '../config/ApiConfig';
import {INCOME} from '../constant/Const';

// 对于时间段查询账单，并进行时间排序
export function queryBillsForPeriod({ledgerID, startDate, endDate}) {
  return postKV({
    url: '/ledger/readLedgerForDateRange',
    params: {
      start: dayjs(startDate).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(endDate).format('YYYY-MM-DD HH:mm:ss'),
      ledgerID: ledgerID,
    },
  });
}

export function queryBillsForPeriods({ledgerID, ranges}) {
  let loves = ranges.map(range => {
    return {startDateTime: range.startDate.format('YYYY-MM-DD HH:mm:ss'), endDateTime: range.endDate.format('YYYY-MM-DD HH:mm:ss')};
  });
  return postJSON({
    url: '/ledger/readLedgerForDateRanges',
    data: {
      ranges: loves,
      ledgerID: ledgerID,
    },
  });
}

export function queryTodayBills() {
  return get({url: '/bill/getTodayBills'});
}

export function createBill(bill) {
  return postJSON({url: '/bill/create', data: bill});
}

export function searchByKeyword(keyword) {
  return postKV({
    url: '/bill/search',
    params: {
      keyword: keyword,
    },
  });
}
