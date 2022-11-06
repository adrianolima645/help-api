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
exports.UserController = void 0;
var yup = require("yup");
var UserModel_1 = require("../models/UserModel");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, lastName, email, password, dateOfBirth, phone, city, state, userType, termsOfUse, schema, error_1, user, userAlreadyExists;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, dateOfBirth = _a.dateOfBirth, phone = _a.phone, city = _a.city, state = _a.state, userType = _a.userType, termsOfUse = _a.termsOfUse;
                        schema = yup.object().shape({
                            firstName: yup.string().required(),
                            lastName: yup.string().required(),
                            email: yup.string().email().required(),
                            password: yup.string().required(),
                            dateOfBirth: yup.date().required(),
                            phone: yup.string().required().min(10, "Número de telefone inválido!"),
                            city: yup.string().required(),
                            state: yup.string().required().max(2, "Estado deve ter somente dois caracteres!"),
                            userType: yup.string().required(),
                            userStatus: yup.boolean().required(),
                            termsOfUse: yup.boolean().required()
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_1.name, message: error_1.message, details: error_1.errors })];
                    case 4:
                        user = new UserModel_1.User({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password,
                            dateOfBirth: dateOfBirth,
                            phone: phone,
                            city: city,
                            state: state,
                            userType: userType,
                            termsOfUse: termsOfUse
                        });
                        return [4 /*yield*/, UserModel_1.User.findOne({
                                email: email
                            })];
                    case 5:
                        userAlreadyExists = _b.sent();
                        if (userAlreadyExists) {
                            return [2 /*return*/, response.status(401).json({ message: 'User already exists!' })];
                        }
                        return [4 /*yield*/, user.save()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, response.status(200).json(user)];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, schema, error_2, user, query, options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.params.userId;
                        schema = yup.object().shape({
                            userId: yup.string().required().min(24, "Id de usuário invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
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
                    case 4:
                        user = new UserModel_1.User({
                            _id: userId,
                            userStatus: false
                        });
                        query = { _id: userId };
                        options = {
                            "new": false,
                            upsert: false
                        };
                        return [4 /*yield*/, UserModel_1.User.findOneAndUpdate(query, user, options)];
                    case 5:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, response.status(400).json(result)];
                        }
                        return [2 /*return*/, response.status(200).json(result)];
                }
            });
        });
    };
    UserController.prototype.getUserByUserId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, schema, error_3, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.params.userId;
                        schema = yup.object().shape({
                            userId: yup.string().required().min(24, "Id de usuário invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
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
                    case 4: return [4 /*yield*/, UserModel_1.User.findOne({
                            _id: userId,
                            userStatus: true
                        })];
                    case 5:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(404).json({ message: "User not found" })];
                        }
                        return [2 /*return*/, response.status(200).json(user)];
                }
            });
        });
    };
    UserController.prototype.loginUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, schema, error_4, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, email = _a.email, password = _a.password;
                        schema = yup.object().shape({
                            email: yup.string().email().required(),
                            password: yup.string().required()
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.params, { abortEarly: false })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_4.name, message: error_4.message, details: error_4.errors })];
                    case 4: return [4 /*yield*/, UserModel_1.User.findOne({
                            email: email,
                            password: password
                        })];
                    case 5:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/, response.status(404).json({ message: "User not found" })];
                        }
                        return [2 /*return*/, response.status(200).json({ message: "successful operation", schema: result })];
                }
            });
        });
    };
    UserController.prototype.logoutUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, response.json({ message: "successful operation" })];
            });
        });
    };
    UserController.prototype.updateUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, firstName, lastName, email, password, dateOfBirth, phone, city, state, userType, userStatus, termsOfUse, schemaId, schema, error_5, user, query, options, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = request.params.userId;
                        _a = request.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, dateOfBirth = _a.dateOfBirth, phone = _a.phone, city = _a.city, state = _a.state, userType = _a.userType, userStatus = _a.userStatus, termsOfUse = _a.termsOfUse;
                        schemaId = yup.object().shape({
                            userId: yup.string().required().min(24, "Id de usuário invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
                        });
                        schema = yup.object().shape({
                            firstName: yup.string().required(),
                            lastName: yup.string().required(),
                            email: yup.string().email().required(),
                            password: yup.string().required(),
                            dateOfBirth: yup.date().required(),
                            phone: yup.string().required().min(10, "Número de telefone inválido!"),
                            city: yup.string().required(),
                            state: yup.string().required().max(2, "Estado deve ter somente dois caracteres!"),
                            userType: yup.string().required(),
                            userStatus: yup.boolean().required(),
                            termsOfUse: yup.boolean().required()
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, schema.validate(request.params, { abortEarly: false })];
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
                        user = new UserModel_1.User({
                            _id: userId,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password,
                            dateOfBirth: dateOfBirth,
                            phone: phone,
                            city: city,
                            state: state,
                            userType: userType,
                            userStatus: userStatus,
                            termsOfUse: termsOfUse
                        });
                        query = {
                            _id: userId,
                            userStatus: true
                        };
                        options = {
                            "new": false,
                            upsert: false
                        };
                        return [4 /*yield*/, UserModel_1.User.findOneAndUpdate(query, user, options)];
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
    return UserController;
}());
exports.UserController = UserController;
