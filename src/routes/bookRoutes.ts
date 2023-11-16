import express from 'express';
import bookController from '../controllers/bookController';
import authMiddleware from '../middleware/authMiddleware';

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

router.use(authMiddleware.authenticate);
router.use(logRequest);

router.post('/books', authMiddleware.hasRole('creator'), bookController.createBook);
router.get('/books', authMiddleware.hasRole('viewer'), bookController.viewBooks);
router.get('/books/all', authMiddleware.hasRole('view_all'), bookController.viewAllBooks);

export default router;
