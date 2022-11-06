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
exports.TouristicPoint = void 0;
var mongoose_1 = require("mongoose");
var imagesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});
var touristicPointSchema = new mongoose_1.Schema({
    category_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    whatsappNumber: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    petFriendly: {
        type: Boolean,
        required: true
    },
    sponsored: {
        type: Boolean,
        required: true
    },
    pointStatus: {
        type: Boolean,
        required: true
    },
    openOnWeekends: {
        type: Boolean,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    pictures: {
        type: [imagesSchema],
        required: true,
        "default": undefined
    },
    geolocation: {
        latitude: String,
        longitude: String
    }
});
touristicPointSchema.method('toJSON', function () {
    var _a = this.toObject(), __v = _a.__v, _id = _a._id, object = __rest(_a, ["__v", "_id"]);
    object.id = _id;
    return object;
});
var TouristicPoint = (0, mongoose_1.model)('touristicPoint', touristicPointSchema, 'touristicPoints');
exports.TouristicPoint = TouristicPoint;
