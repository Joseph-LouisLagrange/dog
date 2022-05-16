import RNFetchBlob from 'rn-fetch-blob';
import axios from 'react-native-axios';
import {baseURL, get} from '../config/ApiConfig';
import {APPLICATION_FORM_DATA} from '../constant/Const';

// 基于 HTTP Basic
export function loginByUsernameAndPassword({username, password}) {
  return get(
    {
      url: '/user/basicLogin',
      axios: axios,
    },
    {
      auth: {
        username: username,
        password: password,
      },
    },
  );
}

export function register({avatar, nickName, password}) {
  const {type, path} = avatar;
  return RNFetchBlob.fetch(
    'POST',
    baseURL + '/user/register',
    {
      'Content-Type': APPLICATION_FORM_DATA,
    },
    [
      {
        name: 'avatar',
        filename: 'avatar',
        type: type,
        data: RNFetchBlob.wrap(path),
      },
      {
        name: 'nickName',
        data: nickName,
      },
      {
        name: 'password',
        data: password,
      },
    ],
  );
}

export function updateUser({avatar, nickName, password}) {
  let body = [];
  if (avatar) {
    const {type, path} = avatar;
    body.push({
      name: 'avatar',
      filename: 'avatar',
      type: type,
      data: RNFetchBlob.wrap(path),
    });
  }
  if (nickName) {
    body.push({
      name: 'nickName',
      data: nickName,
    });
  }
  if (password) {
    body.push({
      name: 'password',
      data: password,
    });
  }
  return RNFetchBlob.fetch(
    'POST',
    baseURL + '/user/update',
    {
      'Content-Type': APPLICATION_FORM_DATA,
    },
    body
  );
}

export function makeUsername() {
  return get({
    url: '/user/applyUsername',
  });
}

export function isLogin() {
  return get({url: '/user/isLogin'});
}

export function getMe() {
  return get({url: '/user/getMe'});
}


export function getLiveDayCount() {
  return get({url: '/user/liveDayCount'});
}


