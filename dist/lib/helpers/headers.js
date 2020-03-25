"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
// 规范headers对象的key大小写
function normalizeHeaderName(headers, normalizeName) {
    if (!headers)
        return;
    Object.keys(headers).forEach(function (name) {
        if (name !== normalizeName && name.toUpperCase() !== normalizeName.toUpperCase()) {
            headers[normalizeName] = headers[name];
            delete headers[name];
        }
    });
}
function processHeadres(headers, data) {
    normalizeHeaderName(headers, 'Content-Type');
    if (util_1.isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
}
exports.processHeadres = processHeadres;
function parseHeaders(headers) {
    var parsed = Object.create(null);
    if (!headers)
        return parsed;
    headers.split('\r\n').forEach(function (line) {
        var _a = line.split(':'), key = _a[0], val = _a[1];
        key = key.trim().toLowerCase();
        if (!key)
            return;
        if (val)
            val = val.trim();
        parsed[key] = val;
    });
    return parsed;
}
exports.parseHeaders = parseHeaders;
//# sourceMappingURL=headers.js.map