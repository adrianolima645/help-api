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
exports.Assessment = void 0;
var mongoose_1 = require("mongoose");
var assessmentSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    touristicPointId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    assessmentDate: {
        type: Date,
        required: true
    }
});
assessmentSchema.method('toJSON', function () {
    var _a = this.toObject(), __v = _a.__v, _id = _a._id, object = __rest(_a, ["__v", "_id"]);
    object.id = _id;
    return object;
});
var Assessment = (0, mongoose_1.model)('assessment', assessmentSchema, 'assessments');
exports.Assessment = Assessment;
