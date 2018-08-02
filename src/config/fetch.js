import { baseUrl } from './env'
function formDataFormatter(param) {
    let _res = parse(param);
    function parse(param, prefix) {
        let res = res || '';
        prefix = prefix || '';
        for (let key in param) {
            let d = param[key];
            switch (typeof d) {
                // 字符串
                case 'string': {
                    if (prefix) {
                        res += prefix + '[' + key + ']' + '=' + d + '&';
                    } else {
                        res += key + '=' + d + '&';
                    }
                } break;
                // 数组、字典
                case 'object': {
                    // isArray
                    if (Array.isArray(d)) {
                        for (let i = 0; i < d.length; i++) {
                            let _d = d[i];
                            if (prefix) {
                                res += prefix + '[' + key + ']' + '[]=' + _d + '&';
                            } else {
                                res += key + '[]=' + _d + '&';
                            }
                        }
                    } else {
                        res += parse(d, key);
                    }
                } break;
                default: {
                    if (prefix) {
                        res += prefix + '[' + key + ']' + '=' + d + '&';
                    } else {
                        res += key + '=' + d + '&';
                    }
                } break;
            }
        }
        return res;
    }
    return _res ? _res.substr(0, _res.length - 1) : '';
}

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

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

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept':'application/json',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST' || type == 'PUT') {
            let a = formDataFormatter(data);
            requestConfig.body = a;
            // Object.defineProperty(requestConfig, 'body', {
				// value:JSON.stringify(data)
            // })
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
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