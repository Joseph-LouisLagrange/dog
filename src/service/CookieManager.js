import dayjs from 'dayjs';
import storage from './Storage';
export class Cookie {
  name;
  value;
  expires;
  constructor({name, value, expires}) {
    this.name = name;
    this.value = value;
    this.expires = expires;
  }
  static parse(httpCookieString) {
    let temp = httpCookieString.split(';');
    let pari = temp[0].trim().split('=');
    let name = pari[0],
      value = pari[1],
      expires = null;
    for (let i = 1; i < temp.length; i++) {
      if (temp[i].includes('Expires') || temp[i].includes('expires')) {
        expires = new Date(temp[i].split('=')[1]);
      }
    }
    return new Cookie({name: name, value: value, expires: expires});
  }

  toString() {
    return this.name + '=' + this.value;
  }
}

class CookieManager {
  constructor(storage){
    this.storage = storage;
  }
  getCookies() {
    return storage.getAllDataForKey('Cookie');
  }

  getCookieHeader() {
    return new Promise((resolve, reject) => {
      this.getCookies().then(cookies => {
        let cookieHeader = cookies.map(cookie => cookie.toString()).join(';');
        resolve(cookieHeader);
      });
    });
  }

  saveCookieHeader(cookies) {
    return Promise.all(cookies.map(cookie => saveCookie(cookie)));
  }

  saveCookie(cookie) {
    return storage.save({
      key: 'Cookie',
      id: cookie.name,
      data: cookie,
      expires: cookie.expires ? dayjs(cookie.expires).diff(dayjs()) : null,
    });
  }
}
const cookieManager = new CookieManager(storage);

export default cookieManager;
