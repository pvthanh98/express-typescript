"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
/** Health check controller */
const signupController = (req, res) => {
    return res.send({
        status: "ONLINE"
    });
};
exports.signupController = signupController;
