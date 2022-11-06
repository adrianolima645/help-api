"use strict";
exports.__esModule = true;
var multer_1 = require("multer");
var path_1 = require("path");
exports["default"] = {
    storage: multer_1["default"].diskStorage({
        destination: path_1["default"].join(__dirname, '..', '..', 'uploads'),
        filename: function (request, file, cb) {
            var filename = "".concat(Date.now(), "-").concat(file.originalname);
            cb(null, filename);
        }
    })
};
