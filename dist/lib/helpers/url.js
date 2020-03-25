"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function encode(val) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']');
}
function buildUrl(url, params) {
    if (!params)
        return url;
    var parts = [];
    Object.keys(params).forEach(function (key) {
        var val = params[key];
        // 特殊值不处理
        if (val === null || typeof val === 'undefined') {
            return;
        }
        var values = [];
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        }
        else {
            values = [key];
        }
        values.forEach(function (val) {
            if (util_1.isDate(val)) {
                val = val.toISOString();
            }
            else if (util_1.isPlainObject(val)) {
                // 普通对象 不包含formData类型
                val = JSON.stringify(val);
            }
            parts.push(encode(key) + "=" + encode(val));
        });
    });
    var serialzedParams = parts.join('&');
    if (serialzedParams) {
        var markIndex = url.indexOf('#');
        // 丢弃url中的哈希标记
        if (markIndex !== -1) {
            url = url.slice(markIndex, 1);
        }
        // 保留url中已存在参数
        url += url.indexOf('?') === -1 ? '?' : '&';
    }
    return url;
}
exports.buildUrl = buildUrl;
//# sourceMappingURL=url.js.map