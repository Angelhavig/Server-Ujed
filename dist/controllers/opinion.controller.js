"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOpinion = exports.getOpinion = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getOpinion = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM opinion WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al obtener el opinion:', err);
            res.status(500).json({ msg: 'Error al obtener el opinion' });
        }
        else {
            if (data && data.length > 0) {
                res.json(data[0]); // Responder con el primer registro encontrado (debería ser único por ID)
            }
            else {
                res.status(404).json({ msg: 'Opinion no encontrado' }); // Si no se encontraron resultados
            }
        }
    });
};
exports.getOpinion = getOpinion;
const postOpinion = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO opinion SET ?', [body], (err, data) => {
        if (err) {
            console.error('Error al insertar el opinion:', err);
            res.status(500).json({ msg: 'Error al insertar el opinion' });
        }
        else {
            res.json({
                msg: 'Opinion registrado'
            });
        }
    });
};
exports.postOpinion = postOpinion;
