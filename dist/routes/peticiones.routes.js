"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresas_controller_1 = require("../controllers/empresas.controller");
const router = (0, express_1.Router)();
router.get('/empresa/', empresas_controller_1.getEmpresas);
router.get('/empresa-prom', empresas_controller_1.getAverage);
router.get('/empresa-med', empresas_controller_1.getMedia);
router.get('/empresa-count', empresas_controller_1.getCount);
exports.default = router;