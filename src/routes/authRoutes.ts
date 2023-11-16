import express from 'express';
import authController from '../controllers/authController';

import logger from '../logger'; 

const router = express.Router();


const logRequest = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.info(`Received request for ${req.originalUrl}`);
  next();
};

router.use(logRequest);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
