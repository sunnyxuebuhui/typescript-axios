"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
var url_1 = require("./helpers/url");
var data_1 = require("./helpers/data");
var headers_1 = require("./helpers/headers");
function axios(config) {
    processConfig(config);
    return xhr_1.default(config).then(function (res) {
        return transformResponseData(res);
    });
}
function processConfig(config) {
    // attention by order
    config.url = transformUrl(config);
    config.headers = transformHeaders(config);
    config.data = tranformRequestData(config); // data if isPlainObject has transformed string
}
// 处理url
function transformUrl(config) {
    var url = config.url, params = config.params;
    return url_1.buildUrl(url, params);
}
// 处理data
function tranformRequestData(config) {
    return data_1.transformRequest(config.data);
}
// 处理headers
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, data = config.data;
    return headers_1.processHeadres(headers, data);
}
// 处理responseData
function transformResponseData(res) {
    res.data = data_1.transformResponse(res.data);
    return res;
}
exports.default = axios;
//# sourceMappingURL=index.js.map