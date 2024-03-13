import { Request, Response } from "express";
import connection from "../db/connection";

export const getEmpresas = (req: Request, res: Response) => {
    connection.query('SELECT * FROM indicadores', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        } else {
            res.json(data);
        }
    });
};


export const getAverage = (req: Request, res: Response) => {
    connection.query('SELECT AVG(valor) AS promedio_valor FROM indicadores', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        } else {
            res.json(data);
        }
    });
};
export const getMedia = (req: Request, res: Response) => {
    connection.query('SELECT AVG(valor) AS mediana_valor FROM ( SELECT valor, @rownum := @rownum + 1 AS row_number, @total_rows := @rownum FROM indicadores, (SELECT @rownum := 0) r ORDER BY valor ) as subquery WHERE row_number IN (FLOOR((@total_rows + 1) / 2), FLOOR((@total_rows + 2) / 2))', (err, data) => {
        if (err) {
            console.error('Error al obtener blogs:', err);
            res.status(500).json({ msg: 'Error al obtener blogs' });
        } else {
            res.json(data);
        }
    });
};

export const getCount = (req: Request, res: Response) => {
    connection.query(
        'SELECT year, COUNT(year) AS cantidad FROM indicadores GROUP BY year HAVING COUNT(year) > 1',
        (err, data) => {
            if (err) {
                console.error('Error al obtener datos:', err);
                res.status(500).json({ error: 'Error al obtener datos' });
            } else {
                res.json(data);
            }
        }
    );
};













