// ����������� url
import {
    baseUrl
} from './env'

// ���岢����һ������ �첽 ����
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    //�� http ����ʽת���ɴ�д
    type = type.toUpperCase();
    //ƴ�������ַ
    url = baseUrl + url;
    //��� ����ʽΪ GET 
    if (type == 'GET') {
        let dataStr = ''; //����ƴ���ַ���
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    // ������󷽷�Ϊ fetch �������֧�� fetch ��������ʹ�� fetch ������������
    if (window.fetch && method == 'fetch') {
        let requestConfig = { //������������
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "force-cache"
        }
        //��� http ����ʽΪPOST 
        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try {
            // ʹ�� fetch ����
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {
        // ����������֧�� fetch ����ʹ�� XMLHttpRequest �������� ajax ���󣬲���ʹ�� Promise ���з�װ
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