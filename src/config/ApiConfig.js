// 配置 axios
import axios from 'react-native-axios';
import {APPLICATION_FORM_URLENCODE} from '@/constant/Const';
import {APPLICATION_FORM_DATA, APPLICATION_JSON} from '../constant/Const';
import {navigate, navigationRef} from '../util/Route';
import axiosRetry from 'axios-retry';

export const baseURL = 'http://47.98.209.134:8080';
const configedAxios = axios.create({
  baseURL: baseURL,
});


axiosRetry(configedAxios, { retries: 3 });

axios.defaults.baseURL = baseURL;
// 添加请求拦截器
configedAxios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.debug('请求拦截器 config: ', config);
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

configedAxios.interceptors.response.use(
  response => {
    let {data} = response;
    console.debug('响应拦截器 response: ', response);
    if ('success' in data) {
      if (data.success) {
        // 解包
        return Promise.resolve(data.content);
      } else {
        // 报告错误数据
        console.error(data);
        return Promise.reject(data);
      }
    }
    return response;
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const response = error.response;
    const {status, data, headers} = response;
    if (status == 401) {
      // Unauthorized , help:去登录
      navigationRef.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
    return Promise.reject(error);
  },
);

function safeConfig(config) {
  if (!config) {
    config = {};
  }
  config.headers = config.headers || {};
  return config;
}

function post0({axios, url, config}) {
  config['url'] = url;
  config['method'] = 'post';
  return request({axios: axios, config: config});
}

// export functions
export function get({axios, url, params}, config) {
  config = safeConfig(config);
  config['url'] = url;
  config['method'] = 'get';
  config.headers['Content-Type'] = APPLICATION_FORM_URLENCODE;
  config['params'] = params;
  return request({
    axios: axios,
    config: config,
  });
}

export function postJSON({axios, url, data}, config) {
  config = safeConfig(config);
  config.headers['Content-Type'] = APPLICATION_JSON;
  config['data'] = JSON.stringify(data);
  return post0({axios, url, config});
}

export function postKV({axios, url, params}, config) {
  config = safeConfig(config);
  config.headers['Content-Type'] = APPLICATION_FORM_URLENCODE;
  config['params'] = params;
  return post0({axios, url, config});
}

export function postFormData({axios, url, formData}, config) {
  config = safeConfig(config);
  config.headers['Content-Type'] = APPLICATION_FORM_DATA;
  config['data'] = formData;
  return post0({axios, url, config});
}

export function request({axios, config}) {
  let excetor = axios || configedAxios;
  return excetor.request(config);
}
