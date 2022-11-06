"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var routes_1 = require("./routes");
var cors_1 = require("cors");
var swagger_ui_express_1 = require("swagger-ui-express");
var index_1 = require("./models/index");
require("express-async-errors");
var swagger_json_1 = require("./swagger.json");
var AppError_1 = require("./errors/AppError");
var app = (0, express_1["default"])();
var corsOptions = {
    methods: "GET,POST,OPTIONS,PUT,DELETE",
    origin: "*"
};
app.use((0, cors_1["default"])(corsOptions));
if (index_1.connection) {
    console.log("DB IS CONNECTED");
}
app.use(express_1["default"].json());
app.use('/api-doc', swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_json_1["default"]));
app.use(routes_1.router);
app.use('/uploads', express_1["default"].static(path_1["default"].join(__dirname, '..', 'uploads')));
app.use(function (err, request, response, _next) {
    console.log("midle");
    if (err instanceof AppError_1.AppError) {
        console.log("midle if");
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    console.log(err);
    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error ${err.message}'
    });
});
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("SERVER IS RUNNING"); });
