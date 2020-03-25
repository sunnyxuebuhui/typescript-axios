"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isDate(val) {
    return toString.call(val) === '[object Date]';
}
exports.isDate = isDate;
function isObject(val) {
    return val !== null && typeof val === 'object';
}
exports.isObject = isObject;
function isPlainObject(val) {
    return toString.call(val) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
//# sourceMappingURL=util.js.map