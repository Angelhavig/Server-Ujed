"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.getMedia = exports.getAverage = exports.getEmpresas = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getEmpresas = (req, res) => {
    connection_1.default.query('SELECT * FROM indicadores', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getEmpresas = getEmpresas;
const getAverage = (req, res) => {
    connection_1.default.query('SELECT AVG(valor) AS promedio_valor FROM indicadores', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getAverage = getAverage;
const getMedia = (req, res) => {
    connection_1.default.query('SELECT AVG(valor) AS mediana_valor FROM ( SELECT valor, @rownum := @rownum + 1 AS row_number, @total_rows := @rownum FROM indicadores, (SELECT @rownum := 0) r ORDER BY valor ) as subquery WHERE row_number IN (FLOOR((@total_rows + 1) / 2), FLOOR((@total_rows + 2) / 2))', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getMedia = getMedia;
const getCount = (req, res) => {
    connection_1.default.query('SELECT year, COUNT(year) AS cantidad FROM indicadores GROUP BY year HAVING COUNT(year) > 1', (err, data) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            res.status(500).json({ error: 'Error al obtener datos' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getCount = getCount;
