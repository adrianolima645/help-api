"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    userStatus: {
        type: Boolean,
        required: true,
        "default": true
    },
    termsOfUse: {
        type: Boolean,
        required: true
    }
});
userSchema.method('toJSON', function () {
    var _a = this.toObject(), __v = _a.__v, _id = _a._id, object = __rest(_a, ["__v", "_id"]);
    object.id = _id;
    return object;
});
var User = (0, mongoose_1.model)('user', userSchema, 'users');
exports.User = User;
