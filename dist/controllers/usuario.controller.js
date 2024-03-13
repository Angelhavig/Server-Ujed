"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getUsuario = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM usuario WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).json({ msg: 'Error al obtener el usuario' });
        }
        else {
            if (data && data.length > 0) {
                res.json(data[0]); // Responder con el primer registro encontrado (debería ser único por ID)
            }
            else {
                res.status(404).json({ msg: 'Usuario no encontrado' }); // Si no se encontraron resultados
            }
        }
    });
};
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO usuario SET ?', [body], (err, data) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            res.status(500).json({ msg: 'Error al insertar el usuario' });
        }
        else {
            res.json({
                msg: 'Usuario registrado'
            });
        }
    });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM usuario WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            res.status(500).json({ msg: 'Error al buscar el usuario' });
        }
        else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Usuario no encontrado' });
            }
            else {
                // El blog existe, procedemos con la actualización
                connection_1.default.query('UPDATE usuario SET ? WHERE id = ?', [body, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar el usuario:', err);
                        res.status(500).json({ msg: 'Error al actualizar el usuario' });
                    }
                    else {
                        res.json({
                            msg: 'Usuario actualizado'
                        });
                    }
                });
            }
        }
    });
};
exports.putUsuario = putUsuario;
const patchUsuario = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM usuario WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            res.status(500).json({ msg: 'Error al buscar el usuario' });
        }
        else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Usuario no encontrado' });
            }
            else {
                // El blog existe, procedemos con la actualización parcial
                connection_1.default.query('UPDATE usuario SET ? WHERE id = ?', [body, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar el usuario:', err);
                        res.status(500).json({ msg: 'Error al actualizar el usuario' });
                    }
                    else {
                        res.json({
                            msg: 'Usuario actualizado parcialmente'
                        });
                    }
                });
            }
        }
    });
};
exports.patchUsuario = patchUsuario;
