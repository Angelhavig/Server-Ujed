"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceBlog = exports.linkBlog = exports.headBlog = exports.patchBlog = exports.putBlog = exports.postBlog = exports.deleteBlog = exports.getBlog = exports.getBlogs = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getBlogs = (req, res) => {
    connection_1.default.query('SELECT * FROM blog', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        }
        else {
            res.json(data);
        }
    });
};
exports.getBlogs = getBlogs;
const getBlog = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM blog WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al obtener el blog:', err);
            res.status(500).json({ msg: 'Error al obtener el blog' });
        }
        else {
            if (data && data.length > 0) {
                res.json(data[0]); // Responder con el primer registro encontrado (debería ser único por ID)
            }
            else {
                res.status(404).json({ msg: 'Blog no encontrado' }); // Si no se encontraron resultados
            }
        }
    });
};
exports.getBlog = getBlog;
const deleteBlog = (req, res) => {
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
                connection_1.default.query('DELETE FROM blog WHERE id = ?', id, (err) => {
                    if (err) {
                        connection_1.default.rollback(() => {
                            console.error('Error al eliminar el blog:', err);
                            res.status(500).json({ msg: 'Error al eliminar el blog' });
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
exports.deleteBlog = deleteBlog;
const postBlog = (req, res) => {
    const { body } = req;
    connection_1.default.query('INSERT INTO blog SET ?', [body], (err, data) => {
        if (err) {
            console.error('Error al insertar el blog:', err);
            res.status(500).json({ msg: 'Error al insertar el blog' });
        }
        else {
            res.json({
                msg: 'Blog registrado'
            });
        }
    });
};
exports.postBlog = postBlog;
const putBlog = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM blog WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al buscar el blog:', err);
            res.status(500).json({ msg: 'Error al buscar el blog' });
        }
        else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Blog no encontrado' });
            }
            else {
                // El blog existe, procedemos con la actualización
                connection_1.default.query('UPDATE blog SET ? WHERE id = ?', [body, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar el blog:', err);
                        res.status(500).json({ msg: 'Error al actualizar el blog' });
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
exports.putBlog = putBlog;
const patchBlog = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM blog WHERE id = ?', id, (err, data) => {
        if (err) {
            console.error('Error al buscar el blog:', err);
            res.status(500).json({ msg: 'Error al buscar el blog' });
        }
        else {
            if (data.length === 0) {
                res.status(404).json({ msg: 'Blog no encontrado' });
            }
            else {
                // El blog existe, procedemos con la actualización parcial
                connection_1.default.query('UPDATE blog SET ? WHERE id = ?', [body, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar el blog:', err);
                        res.status(500).json({ msg: 'Error al actualizar el blog' });
                    }
                    else {
                        res.json({
                            msg: 'Blog actualizado parcialmente'
                        });
                    }
                });
            }
        }
    });
};
exports.patchBlog = patchBlog;
const headBlog = (req, res) => {
    try {
        // Lógica de manejo para la petición HEAD en la ruta /api/peticiones/blog/
        // Establecer cabecera Access-Control-Allow-Origin para permitir solicitudes desde cualquier origen
        res.set('Access-Control-Allow-Origin', '*');
        // Respondemos con el código de estado correcto para una petición HEAD (204 No Content)
        res.status(204).end();
        // Acción exitosa
        console.log('Finalizando manejo de la petición HEAD');
    }
    catch (error) {
        // Error durante la lógica de manejo
        console.error('Error durante la lógica de manejo HEAD:', error);
        res.status(500).json({ msg: 'Error interno del servidor al manejar la petición HEAD' });
    }
};
exports.headBlog = headBlog;
const linkBlog = (req, res) => {
    const linkHeader = 'No se; rel="next"';
    res.setHeader('Link', linkHeader);
    res.status(200).send('Enlace agregado en la cabecera Link');
};
exports.linkBlog = linkBlog;
const traceBlog = (req, res) => {
    try {
        const responseData = {
            message: 'TRACE request received',
            headers: req.headers,
        };
        res.json(responseData);
        console.log('La petición TRACE fue manejada exitosamente');
    }
    catch (error) {
        console.error('Error durante la lógica de manejo TRACE:', error);
        res.status(500).json({ msg: 'Error interno del servidor al manejar la petición TRACE' });
    }
    finally {
        console.log('Finalizando manejo de la petición TRACE');
    }
};
exports.traceBlog = traceBlog;
