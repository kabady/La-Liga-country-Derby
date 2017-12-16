"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verificationPhone(phoneNumber) {
    if (phoneNumber === void 0) { phoneNumber = ''; }
    return /^1[34578]\d{9}$/.test(phoneNumber);
}
exports.verificationPhone = verificationPhone;
function verificationEmail(email) {
    if (email === void 0) { email = ''; }
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email);
}
exports.verificationEmail = verificationEmail;
