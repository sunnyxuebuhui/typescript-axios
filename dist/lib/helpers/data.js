"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function transformRequest(data) {
    if (util_1.isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}
exports.transformRequest = transformRequest;
function transformResponse(data) {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            console.error(e);
        }
    }
    return data;
}
exports.transformResponse = transformResponse;
//# sourceMappingURL=data.js.map