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
    return {
      startDateTime: range.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: range.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };
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

export function deleteBill(billID) {
  return get({url: '/bill/delete', params: {ID: billID}});
}

export function updateBill(bill) {
  return postJSON({url: '/bill/update', data: bill});
}

export function searchByKeyword(keyword) {
  return postKV({
    url: '/bill/search',
    params: {
      keyword: keyword,
    },
  });
}

export function setUsingLedger(ledgerID) {
  return get({
    url: '/ledger/setUsingLedger',
    params: {
      ledgerID: ledgerID,
    },
  });
}

export function countAmount(ranges) {
  let loves = ranges.map(range => {
    return {
      startDateTime: range.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: range.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  return postJSON({url: '/statistics/countAmount', data: {ranges: loves}});
}

export function countMoneyTrend({ranges, billType, mode}) {
  let loves = ranges.map(range => {
    return {
      startDateTime: range.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: range.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  return postJSON({
    url: '/statistics/countMoneyTrend',
    data: {ranges: loves, billType, mode},
  });
}

export function countMoneySignoryPart({ranges, billType, mode}) {
  let loves = ranges.map(range => {
    return {
      startDateTime: range.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: range.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  return postJSON({
    url: '/statistics/countMoneySignoryPart',
    data: {ranges: loves, billType, mode},
  });
}

export function countCategoryRanking({ranges, billType, mode}) {
  let loves = ranges.map(range => {
    return {
      startDateTime: range.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: range.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  return postJSON({
    url: '/statistics/countCategoryRanking',
    data: {ranges: loves, billType, mode},
  });
}

export function countBillRanking({ranges, billType, mode}) {
  let loves = ranges.map(range => {
    return {
      startDateTime: range.startDateTime.format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: range.endDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };
  });
  return postJSON({
    url: '/statistics/countBillRanking',
    data: {ranges: loves, billType, mode},
  });
}
