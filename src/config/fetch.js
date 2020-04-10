// 引入基础请求 url
import {
    baseUrl
} from './env'

// 定义并导出一个请求 异步 函数
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    //将 http 请求方式转换成大写
    type = type.toUpperCase();
    //拼接请求地址
    url = baseUrl + url;
    //如果 请求方式为 GET 
    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    // 如果请求方法为 fetch 和浏览器支持 fetch 方法，就使用 fetch 进行数据请求
    if (window.fetch && method == 'fetch') {
        let requestConfig = { //构造请求配置
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "force-cache"
        }
        //如果 http 请求方式为POST 
        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            // 使用 fetch 请求
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        // 如果浏览器不支持 fetch ，就使用 XMLHttpRequest 方法进行 ajax 请求，并且使用 Promise 进行封装
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}