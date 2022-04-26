import {get} from '@/config/ApiConfig';
import axiosRetry from 'axios-retry';
import {postJSON} from '../config/ApiConfig';

export function ping() {
  return get(
    {url: '/public/ping'},
    {
      'axios-retry': {
        retries: 128,
        retryDelay: axiosRetry.exponentialDelay,
      },
    },
  );
}

export function currencyExchangeRate({baseCoinID, amount, exchangeCoinIDs}) {
  return postJSON({
    url: '/public/currencyExchangeRate',
    data: {
      baseCoinID,
      amount,
      exchangeCoinIDs,
    },
  });
}
