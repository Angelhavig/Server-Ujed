"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchComentario = exports.putComentario = exports.postComentario = exports.deleteComentario = exports.getComentario = exports.getComentarios = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getComentarios = (req, res) => {
    connection_1.default.query('SELECT * FROM comentarios', (err, data) => {
        if (err) {
            console.error('Error al obtener comentarios:', err);
            res.status(500).json({ msg: 'Error al obtener comentarios' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getComentarios = getComentarios;
const getComentario = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM comentarios WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al obtener el comentario:', err);
            res.status(500).json({ msg: 'Error al obtener el comentario' });
        }
        else {
            if (data && data.length > 0) {
                res.json(data[0]); // Responder con el primer registro encontrado (debería ser único por ID)
            }
            else {
                res.status(404).json({ msg: 'Comentario no encontrado' }); // Si no se encontraron resultados
            }
        }
    });
};
exports.getComentario = getComentario;
const deleteComentario = (req, res) => {
    const { id } = req.params;
    // Iniciar una transacción para eliminar registros de ambas tablas
    connection_1.default.beginTransaction((err) => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            res.status(500).json({ msg: 'Error al iniciar la transacción' });
            return;
        }
        // Consulta para eliminar registros de la tabla 'comentarios' relacionados con el blog
        connection_1.default.query('DELETE FROM comentarios WHERE id_blog = ?', id, (err) => {
            if (err) {
                connection_1.default.rollback(() => {
                    console.error('Error al eliminar los comentarios:', err);
                    res.status(500).json({ msg: 'Error al eliminar los comentarios' });
                });
            }
            else {
                // Consulta para eliminar el registro de la tabla 'blog'
                connection_1.default.query('DELETE FROM comentarios WHERE id = ?', id, (err) => {
                    if (err) {
                        connection_1.default.rollback(() => {
                            console.error('Error al eliminar el comentario:', err);
                            res.status(500).json({ msg: 'Error al eliminar el comentario' });
                        });
                    }
                    else {
                        // Confirmar la transacción
                        connection_1.default.commit((err) => {
                            if (err) {
                                connection_1.default.rollback(() => {
                                    console.error('Error al confirmar la transacción:', err);
                                    res.status(500).json({ msg: 'Error al confirmar la transacción' });
                                });
                            }
                            else {
                                res.json({
                                    msg: 'Eliminado con éxito'
                                });
                            }
                        });
                    }
                });
            }
        });
    });
};
exports.deleteComentario = deleteComentario;
const postComentario = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO comentarios SET ?', [body], (err, data) => {
        if (err) {
            console.error('Error al insertar el comentario:', err);
            res.status(500).json({ msg: 'Error al insertar el comentario' });
        }
        else {
            res.json({
                msg: 'Comentario registrado'
            });
        }
    });
};
exports.postComentario = postComentario;
const putComentario = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM comentarios WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al buscar el comentario:', err);
            res.status(500).json({ msg: 'Error al buscar el comentario' });
        }
        else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Comentario no encontrado' });
            }
            else {
                // El blog existe, procedemos con la actualización
                connection_1.default.query('UPDATE comentarios SET ? WHERE id = ?', [body, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar el Comentario:', err);
                        res.status(500).json({ msg: 'Error al actualizar el Comentario' });
                    }
                    else {
                        res.json({
                            msg: 'Blog actualizado'
                        });
                    }
                });
            }
        }
    });
};
exports.putComentario = putComentario;
const patchComentario = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM comentarios WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al buscar el comentario:', err);
            res.status(500).json({ msg: 'Error al buscar el comentario' });
        }
        else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Comentario no encontrado' });
            }
            else {
                // El blog existe, procedemos con la actualización parcial
                connection_1.default.query('UPDATE comentarios SET ? WHERE id = ?', [body, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar el comentario:', err);
                        res.status(500).json({ msg: 'Error al actualizar el comentario' });
                    }
                    else {
                        res.json({
                            msg: 'Comentario actualizado parcialmente'
                        });
                    }
                });
            }
        }
    });
};
exports.patchComentario = patchComentario;
