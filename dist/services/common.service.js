"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeService = void 0;
/** Get time service */
const getTimeService = () => {
    const now = new Date();
    return now.toLocaleTimeString();
};
exports.getTimeService = getTimeService;
