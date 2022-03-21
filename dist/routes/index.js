"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const common_controller_1 = require("../controllers/common.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/health-check', common_controller_1.healthCheckController);
router.get('/get-time', common_controller_1.getTimeController);
