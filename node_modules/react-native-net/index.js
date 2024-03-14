/*
method - 支持GET, POST, PUT, DELETE, HEAD
url - 请求的url
headers - 对应的Headers对象
reference - 请求的referrer 信息
mode - 可以设置 cors, no-cors, same-origin
credentials - 设置cookies是否随请求一起发送。可以设置：omit, same-origin
integrity - subresource完整性值（integrity value）
cache - 设置cache模式（default, reload, no-cache）
*/


import { AsyncStorage } from 'react-native';

const defaultConfig = {
    baseUrl: '',
    Dbug: true,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
    },
    credentials: 'include',
    expiry: 5 * 60,
};

let config = defaultConfig;

export function initConfig(_config) {
    config = Object.assign({}, defaultConfig, _config);
}

export function getUri(uri, params = {}, expiry) {
    return get(config.baseUrl + uri, params, expiry);
}

export function get(reqUrl, params = {}, expiry) {
    var paramsStr = '';
    for (var key in params) {
        var value = params[key];
        if (value && value.length > 0) {
            value = value.replace(/^\s+|\s+$/g, "");
        }
        paramsStr += key + '=' + value + '&';
    }
    var url = '';
    if (reqUrl.indexOf('?') === -1) {
        url = reqUrl + '?' + paramsStr;
    } else {
        url = reqUrl + '&' + paramsStr;
    }
    return fetchJSON(url, { method: 'GET', credentials: config.credentials, expiry: expiry });
}


export function postUri(uri, params = {}) {
    return post(config.baseUrl + uri, params);
}

export function post(reqUrl, params = {}) {
    let headers = Object.assign({}, config.headers, { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    return fetchJSON(reqUrl, { method: 'POST', headers: headers, body: toQueryString(params), credentials: config.credentials });
}

export function upload(reqUrl, filename, params = {}) {
    let formData = new FormData();
    let file = { uri: uri, type: 'multipart/form-data', name: filename };
    for (var key in params) {
        if (typeof (params[key]) == "function")
            continue;
        formData.append(key, params[key]);
    }
    let headers = Object.assign({}, config.headers, { 'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d' });
    return fetchJSON(reqUrl, { method: 'POST', headers: headers, body: formData, credentials: config.credentials });
}


//带本地缓存的请求
export function fetchJSON(url, options) {
    let expiry = options.expiry || config.expiry // 5 min default
    // Use the URL as the cache key to sessionStorage
    let cacheKey = url
    L('fetchJSON-->'+url, JSON.stringify(options));
    if ('GET' === options.method) {
        return Promise.resolve(getItem(cacheKey + ':ts')).then((whenCached) => {
            if (whenCached) {
                let age = (Date.now() - parseInt(whenCached)) / 1000
                if (age < expiry) {
                    return Promise.resolve(getItem(cacheKey)).then((cached) => {
                        if (cached) {
                            L('cached Data', cached);
                            return JSON.parse(cached);
                        } else {
                            return fetchAction(url, options, cacheKey);
                        }
                    });
                } else {
                    removeItem(cacheKey)
                    removeItem(cacheKey + ':ts')
                }
            }
            return fetchAction(url, options, cacheKey);
        });
    } else {
        return fetchAction(url, options);
    }
}

//http 请求
function fetchAction(url, options, cacheKey) {
    let ok
    return new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(
            (response) => {
                L('response', JSON.stringify(response));
                if (response.ok) {
                    isOK = true;
                } else {
                    isOK = false;
                }
                return response.text();
            })
            .then((responseData) => {
                L('responseData', responseData);
                let jsonData = responseData;
                try {
                    jsonData = JSON.parse(responseData);
                    if (cacheKey) {
                        setItem(cacheKey, responseData);
                        setItem(cacheKey + ':ts', Date.now() + '');
                    }
                    isOk = true;
                } catch (e) {
                    isOk = false;
                }
                if (isOk) {
                    resolve(jsonData)
                } else {
                    L('fetchAction', '服务器数据格式错误！');
                    reject('服务器数据格式错误！')
                }
            }).catch(
            (error) => {
                L('fetchAction', error);
                return reject('网络错误！');
            });
    });
}
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
//设置缓存
function setItem(key, value) {
    AsyncStorage.setItem(key, value, () => {
        L('setItem', 'setItem [' + key + '] success');
    });
}
//获取缓存
function getItem(key, callBack) {
    return AsyncStorage.getItem(key);
}
//从缓存中移除
function removeItem(key) {
    AsyncStorage.removeItem(key, () => {
        L('removeItem', 'remove [' + key + '] success');
    });
}

function L(tag, message) {
    if (config.Dbug) {
        console.log(getNowFormatDate() + '-->' + tag);
        console.log('         '+message);
    }
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}