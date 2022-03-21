"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeController = exports.healthCheckController = void 0;
const common_service_1 = require("../services/common.service");
/** Health check controller */
const healthCheckController = (req, res) => {
    return res.send({
        status: "ONLINE"
    });
};
exports.healthCheckController = healthCheckController;
/** Get time controller */
const getTimeController = (req, res) => {
    return res.send({
        now: (0, common_service_1.getTimeService)()
    });
};
exports.getTimeController = getTimeController;
