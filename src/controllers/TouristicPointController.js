"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TouristicPointController = void 0;
var yup = require("yup");
var CategoryModel_1 = require("../models/CategoryModel");
var TouristicPointModel_1 = require("../models/TouristicPointModel");
var UserModel_1 = require("../models/UserModel");
var TouristicPointController = /** @class */ (function () {
    function TouristicPointController() {
    }
    TouristicPointController.prototype.createTouristicPoint = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, category_id, user_id, name, about, website, facebook, instagram, youtube, whatsappNumber, phoneNumber, petFriendly, sponsored, pointStatus, openOnWeekends, openingHours, geolocation, requestImages, pictures, data, schema, error_1, touristicPoint, category, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, category_id = _a.category_id, user_id = _a.user_id, name = _a.name, about = _a.about, website = _a.website, facebook = _a.facebook, instagram = _a.instagram, youtube = _a.youtube, whatsappNumber = _a.whatsappNumber, phoneNumber = _a.phoneNumber, petFriendly = _a.petFriendly, sponsored = _a.sponsored, pointStatus = _a.pointStatus, openOnWeekends = _a.openOnWeekends, openingHours = _a.openingHours, geolocation = _a.geolocation;
                        requestImages = request.files;
                        console.log(requestImages);
                        pictures = requestImages.map(function (image) {
                            return { name: image.filename, url: image.path };
                        });
                        console.log(pictures);
                        data = {
                            category_id: category_id,
                            user_id: user_id,
                            name: name,
                            about: about,
                            openingHours: openingHours,
                            pictures: pictures,
                            geolocation: geolocation,
                            whatsappNumber: whatsappNumber,
                            phoneNumber: phoneNumber,
                            petFriendly: petFriendly,
                            pointStatus: pointStatus,
                            sponsored: sponsored,
                            openOnWeekends: openOnWeekends
                        };
                        schema = yup.object().shape({
                            category_id: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
                            user_id: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
                            name: yup.string().required(),
                            about: yup.string().required(),
                            openingHours: yup.string().required(),
                            pictures: yup.array(yup.object().shape({
                                name: yup.string().required(),
                                url: yup.string().required()
                            })),
                            geolocation: yup.object().shape({
                                latitude: yup.string().required(),
                                longitude: yup.string().required()
                            }),
                            whatsappNumber: yup.string().min(10, "Invalid whatsappNumber supplied!"),
                            phoneNumber: yup.string().min(10, "Invalid phoneNumber supplied!"),
                            petFriendly: yup.boolean(),
                            pointStatus: yup.boolean(),
                            sponsored: yup.boolean(),
                            openOnWeekends: yup.boolean()
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(data, { abortEarly: false })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_1.name, message: error_1.message, details: error_1.errors })];
                    case 4:
                        touristicPoint = new TouristicPointModel_1.TouristicPoint({
                            category_id: category_id,
                            user_id: user_id,
                            name: name,
                            about: about,
                            website: website,
                            facebook: facebook,
                            instagram: instagram,
                            youtube: youtube,
                            whatsappNumber: whatsappNumber,
                            phoneNumber: phoneNumber,
                            petFriendly: petFriendly,
                            sponsored: sponsored,
                            pointStatus: pointStatus,
                            openOnWeekends: openOnWeekends,
                            openingHours: openingHours,
                            pictures: pictures,
                            geolocation: geolocation
                        });
                        return [4 /*yield*/, CategoryModel_1.Category.findOne({
                                _id: category_id
                            })];
                    case 5:
                        category = _b.sent();
                        return [4 /*yield*/, UserModel_1.User.findOne({
                                _id: user_id
                            })];
                    case 6:
                        user = _b.sent();
                        if (!category) {
                            return [2 /*return*/, response.status(404).json({ message: 'Category not found!' })];
                        }
                        if (!user) {
                            return [2 /*return*/, response.status(404).json({ message: 'User not found!' })];
                        }
                        return [4 /*yield*/, touristicPoint.save()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, response.status(200).json(touristicPoint)];
                }
            });
        });
    };
    TouristicPointController.prototype.findByStatus = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var status, schema, error_2, touristicPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = request.params.status;
                        schema = yup.object().shape({
                            status: yup.boolean().required()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.params, { abortEarly: false })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_2.name, message: error_2.message, details: error_2.errors })];
                    case 4: return [4 /*yield*/, TouristicPointModel_1.TouristicPoint.find({
                            pointStatus: status
                        })];
                    case 5:
                        touristicPoint = _a.sent();
                        return [2 /*return*/, response.status(200).json(touristicPoint)];
                }
            });
        });
    };
    TouristicPointController.prototype.findByCategory = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryId, schema, error_3, category, touristicPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryId = request.params.categoryId;
                        schema = yup.object().shape({
                            categoryId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.params, { abortEarly: false })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_3.name, message: error_3.message, details: error_3.errors })];
                    case 4: return [4 /*yield*/, CategoryModel_1.Category.findOne({
                            _id: categoryId
                        })];
                    case 5:
                        category = _a.sent();
                        if (!category) {
                            return [2 /*return*/, response.status(404).json({ message: 'Category not found!' })];
                        }
                        return [4 /*yield*/, TouristicPointModel_1.TouristicPoint.find({
                                category_id: categoryId,
                                pointStatus: true
                            })];
                    case 6:
                        touristicPoint = _a.sent();
                        if (!touristicPoint) {
                            return [2 /*return*/, response.status(404).json({ message: "Touristic Point not found" })];
                        }
                        return [2 /*return*/, response.status(200).json(touristicPoint)];
                }
            });
        });
    };
    TouristicPointController.prototype.getTouristicPointById = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var touristicPointId, schema, error_4, touristicPoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        touristicPointId = request.params.touristicPointId;
                        schema = yup.object().shape({
                            touristicPointId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.params, { abortEarly: false })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_4.name, message: error_4.message, details: error_4.errors })];
                    case 4: return [4 /*yield*/, TouristicPointModel_1.TouristicPoint.findOne({
                            _id: touristicPointId
                        })];
                    case 5:
                        touristicPoint = _a.sent();
                        if (!touristicPoint) {
                            return [2 /*return*/, response.status(404).json({ message: "Touristic Point not found" })];
                        }
                        return [2 /*return*/, response.status(200).json(touristicPoint)];
                }
            });
        });
    };
    TouristicPointController.prototype.updateTouristicPoint = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var touristicPointId, _a, category_id, user_id, name, about, website, facebook, instagram, youtube, whatsappNumber, phoneNumber, petFriendly, sponsored, pointStatus, openOnWeekends, openingHours, pictures, geolocation, schemaId, schema, error_5, touristicPoint, query, options, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        touristicPointId = request.params.touristicPointId;
                        _a = request.body, category_id = _a.category_id, user_id = _a.user_id, name = _a.name, about = _a.about, website = _a.website, facebook = _a.facebook, instagram = _a.instagram, youtube = _a.youtube, whatsappNumber = _a.whatsappNumber, phoneNumber = _a.phoneNumber, petFriendly = _a.petFriendly, sponsored = _a.sponsored, pointStatus = _a.pointStatus, openOnWeekends = _a.openOnWeekends, openingHours = _a.openingHours, pictures = _a.pictures, geolocation = _a.geolocation;
                        schemaId = yup.object().shape({
                            touristicPointId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
                        });
                        schema = yup.object().shape({
                            category_id: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
                            user_id: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!'),
                            name: yup.string().required(),
                            about: yup.string().required(),
                            openingHours: yup.string().required(),
                            pictures: yup.array().required(),
                            geolocation: yup.object().required(),
                            whatsappNumber: yup.string().min(10, "Invalid whatsappNumber supplied!"),
                            phoneNumber: yup.string().min(10, "Invalid phoneNumber supplied!"),
                            petFriendly: yup.boolean(),
                            pointStatus: yup.boolean(),
                            sponsored: yup.boolean(),
                            openOnWeekends: yup.boolean()
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, schemaId.validate(request.params, { abortEarly: false })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_5 = _b.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_5.name, message: error_5.message, details: error_5.errors })];
                    case 5:
                        touristicPoint = new TouristicPointModel_1.TouristicPoint({
                            _id: touristicPointId,
                            category_id: category_id,
                            user_id: user_id,
                            name: name,
                            about: about,
                            website: website,
                            facebook: facebook,
                            instagram: instagram,
                            youtube: youtube,
                            whatsappNumber: whatsappNumber,
                            phoneNumber: phoneNumber,
                            petFriendly: petFriendly,
                            sponsored: sponsored,
                            pointStatus: pointStatus,
                            openOnWeekends: openOnWeekends,
                            openingHours: openingHours,
                            pictures: pictures,
                            geolocation: geolocation
                        });
                        query = {
                            _id: touristicPointId,
                            pointStatus: true
                        };
                        options = {
                            "new": false,
                            upsert: false
                        };
                        return [4 /*yield*/, UserModel_1.User.findOneAndUpdate(query, touristicPoint, options)];
                    case 6:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/, response.status(400).json(result)];
                        }
                        return [2 /*return*/, response.status(200).json(result)];
                }
            });
        });
    };
    TouristicPointController.prototype.deleteTouristicPoint = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var touristicPointId, schemaId, error_6, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        touristicPointId = request.params.touristicPointId;
                        schemaId = yup.object().shape({
                            touristicPointId: yup.string().required().min(24, "Invalid ID supplied!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schemaId.validate(request.params, { abortEarly: false })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_6.name, message: error_6.message, details: error_6.errors })];
                    case 4:
                        query = { _id: touristicPointId };
                        return [4 /*yield*/, UserModel_1.User.findOneAndDelete(query)];
                    case 5:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, response.status(400).json(result)];
                        }
                        return [2 /*return*/, response.status(200).json({ description: "successful operation", schema: result })];
                }
            });
        });
    };
    TouristicPointController.prototype.uploadImage = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var requestImage, filename, path, result;
            return __generator(this, function (_a) {
                requestImage = request.file;
                filename = requestImage.filename, path = requestImage.path;
                result = {
                    'id': "tre98REF",
                    'name': filename,
                    'url': path
                };
                return [2 /*return*/, response.status(200).json({ description: "successful operation", schema: result })];
            });
        });
    };
    return TouristicPointController;
}());
exports.TouristicPointController = TouristicPointController;
