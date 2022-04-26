import {get} from '../config/ApiConfig';

export function getAllCoins() {
  return get({url: '/public/coins'});
}
