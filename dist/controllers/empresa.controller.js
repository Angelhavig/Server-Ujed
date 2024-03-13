"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEmpresa = exports.getEmpresa = exports.getEmpresas = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getEmpresas = (req, res) => {
    connection_1.default.query('SELECT * FROM empresa', (err, data) => {
        if (err) {
            console.error('Error al obtener empresa:', err);
            res.status(500).json({ msg: 'Error al obtener empresa' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getEmpresas = getEmpresas;
const getEmpresa = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM empresa WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al obtener el empresa:', err);
            res.status(500).json({ msg: 'Error al obtener el empresa' });
        }
        else {
            if (data && data.length > 0) {
                res.json(data[0]); // Responder con el primer registro encontrado (debería ser único por ID)
            }
            else {
                res.status(404).json({ msg: 'empresa no encontrado' }); // Si no se encontraron resultados
            }
        }
    });
};
exports.getEmpresa = getEmpresa;
const postEmpresa = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO empresa SET ?', [body], (err, data) => {
        if (err) {
            console.error('Error al insertar el empresa:', err);
            res.status(500).json({ msg: 'Error al insertar el empresa' });
        }
        else {
            res.json({
                msg: 'Empresa registrado'
            });
        }
    });
};
exports.postEmpresa = postEmpresa;
