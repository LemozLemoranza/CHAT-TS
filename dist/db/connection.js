"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('u789404015_php_mysql_crud', 'u789404015_lemoz2', '0S^uA@#>^@', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = db;
//# sourceMappingURL=connection.js.map