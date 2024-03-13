import { Router } from "express";
import { getAverage, getCount, getEmpresas, getMedia } from "../controllers/empresas.controller";

const router = Router();


router.get('/empresa/', getEmpresas);
router.get('/empresa-prom', getAverage);
router.get('/empresa-med', getMedia);
router.get('/empresa-count', getCount);

export default router;