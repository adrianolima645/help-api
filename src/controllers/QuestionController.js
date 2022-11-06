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
exports.QuestionController = void 0;
var QuestionModel_1 = require("../models/QuestionModel");
var yup = require("yup");
var QuestionController = /** @class */ (function () {
    function QuestionController() {
    }
    QuestionController.prototype.createQuestion = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var description, schema, error_1, question;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = request.body.description;
                        schema = yup.object().shape({
                            description: yup.string().required()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_1.name, message: error_1.message, details: error_1.errors })];
                    case 4:
                        question = new QuestionModel_1.Question({
                            description: description
                        });
                        return [4 /*yield*/, question.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, response.status(200).json({ description: "successful operation", schema: question })];
                }
            });
        });
    };
    QuestionController.prototype.updateQuestion = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var questionId, description, schemaId, schema, error_2, question, query, options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionId = request.params.questionId;
                        description = request.body.description;
                        schemaId = yup.object().shape({
                            questionId: yup.string().required().min(24, "Id de questão invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
                        });
                        schema = yup.object().shape({
                            description: yup.string().required()
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, schemaId.validate(request.params, { abortEarly: false })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, schema.validate(request.body, { abortEarly: false })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ type: error_2.name, message: error_2.message, details: error_2.errors })];
                    case 5:
                        question = new QuestionModel_1.Question({
                            _id: questionId,
                            description: description
                        });
                        query = {
                            _id: questionId,
                            questionStatus: true
                        };
                        options = {
                            "new": false,
                            upsert: false
                        };
                        return [4 /*yield*/, QuestionModel_1.Question.findOneAndUpdate(query, question, options)];
                    case 6:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, response.status(400).json(result)];
                        }
                        return [2 /*return*/, response.status(200).json(result)];
                }
            });
        });
    };
    QuestionController.prototype.findByStatus = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            questionStatus: true
                        };
                        return [4 /*yield*/, QuestionModel_1.Question.find(query)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, response.status(400).json(result)];
                        }
                        return [2 /*return*/, response.status(200).json(result)];
                }
            });
        });
    };
    QuestionController.prototype.deleteQuestion = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var questionId, schema, error_3, query, options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionId = request.params.questionId;
                        schema = yup.object().shape({
                            questionId: yup.string().required().min(24, "Id de questão invalido!").matches(/^([0-9A-Fa-f]{24})/, 'Invalid ID supplied!')
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
                    case 4:
                        query = {
                            _id: questionId
                        };
                        options = {
                            "new": false,
                            upsert: false
                        };
                        return [4 /*yield*/, QuestionModel_1.Question.findOneAndDelete(query)];
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
    return QuestionController;
}());
exports.QuestionController = QuestionController;
