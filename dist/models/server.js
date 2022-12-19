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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const auth_1 = __importDefault(require("../routes/auth"));
const connection_1 = __importDefault(require("../db/connection"));
const path_1 = require("path");
const express_handlebars_1 = require("express-handlebars");
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/usuarios',
            auth: '/auth'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DB lista');
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.set('views', (0, path_1.join)(__dirname, '../views'));
        this.app.engine('.hbs', (0, express_handlebars_1.engine)({
            defaultLayout: 'main',
            layoutsDir: (0, path_1.join)(this.app.get('views'), 'layouts'),
            partialsDir: (0, path_1.join)(this.app.get('views'), 'partials'),
            extname: 'hbs'
        }));
        this.app.set('view engine', '.hbs');
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map