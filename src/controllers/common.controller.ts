import { Request, Response } from 'express';
import { getTimeService } from '../services/common.service';

/** Health check controller */
const healthCheckController = (req: Request, res: Response): Response<any> => {
    return res.send({
        status: "ONLINE"
    });
}

/** Get time controller */
const getTimeController = (req: Request, res: Response): Response<any> => {
    return res.send({
        now: getTimeService()
    });
}

export {
    healthCheckController,
    getTimeController
}