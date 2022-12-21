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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const auth_1 = __importDefault(require("../routes/auth"));
const index_1 = __importDefault(require("../routes/index"));
const connection_1 = __importDefault(require("../db/connection"));
const path_1 = require("path");
const express_handlebars_1 = require("express-handlebars");
const socket_io_1 = require("socket.io");
const socketController_1 = require("../sockets/socketController");
class Servidor {
    constructor() {
        this.apiPaths = {
            usuarios: '/usuarios',
            auth: '/auth',
            index: '/'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server);
        this.middlewares();
        this.routes();
        this.dbConnection();
        this.sockets();
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.index, index_1.default);
    }
    sockets() {
        this.io.on('connection', socketController_1.socketController);
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
        this.app.use((0, cookie_parser_1.default)());
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
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
exports.default = Servidor;
//# sourceMappingURL=server.js.map