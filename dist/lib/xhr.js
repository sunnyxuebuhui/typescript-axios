"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var headers_1 = require("./helpers/headers");
function xhr(config) {
    return new Promise(function (resolve) {
        var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType;
        var request = new XMLHttpRequest();
        if (responseType) {
            request.responseType = responseType;
        }
        request.open(method.toUpperCase(), url, true);
        request.onreadystatechange = function handleLoad() {
            // 0 代理被创建，但是尚未调用open()方法
            // 1 open()方法已经被调用
            // 2 send()方法已经被调用，并且头部和状态已经可获得
            // 3 下载中，responseText属性已经包含部分数据
            // 4 下载操作已经完成
            if (request.readyState !== 4) {
                return;
            }
            var responseHeaders = headers_1.parseHeaders(request.getAllResponseHeaders());
            var responseData = responseType !== 'text' ? request.response : request.responseText;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            resolve(response);
        };
        Object.keys(headers).forEach(function (name) {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            }
            else {
                request.setRequestHeader(name, headers[name]);
            }
        });
        request.send(data);
    });
}
exports.default = xhr;
//# sourceMappingURL=xhr.js.map