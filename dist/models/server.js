"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peticiones_routes_1 = __importDefault(require("../routes/peticiones.routes"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '6000';
        this.middelwares();
        this.routes();
        this.conectarDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('aplicacion en ejecucion en el puerto ', this.port);
        });
    }
    routes() {
        this.app.use('/api/peticiones', peticiones_routes_1.default);
    }
    middelwares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    conectarDB() {
        connection_1.default.connect((err) => {
            if (err)
                throw err;
            console.log('coneccion exitosa');
        });
    }
}
exports.default = Server;
