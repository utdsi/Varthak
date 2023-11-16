import { Request, Response } from 'express';
import Book from '../models/Book';

const bookController = {
  createBook: async (req: Request, res: Response) => {
    try {
      const { title, author } = req.body;
      const book = new Book({ title, author, createdBy: req.user.userId });
      console.log(book)
      await book.save();

      return res.status(201).json(book);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
  viewBooks: async (req: Request, res: Response) => {
    try {
      const { username, userId } = req.user;

      const isOld = req.query.old === '1';
      const isNew = req.query.new === '1';

      let timeFilter = {};

      if (isOld) {
        timeFilter = {
          createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) },
        };
      } else if (isNew) {
        timeFilter = {
          createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
        };
      }

      const books = await Book.find({ createdBy: userId, ...timeFilter });

      return res.status(200).json(books);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  viewAllBooks: async (req: Request, res: Response) => {
    try {

      const isOld = req.query.old === '1';
      const isNew = req.query.new === '1';

      let timeFilter = {};

      if (isOld) {
        timeFilter = {
          createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) },
        };
      } else if (isNew) {
        timeFilter = {
          createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
        };
      }

      const books = await Book.find({ ...timeFilter });

      return res.status(200).json(books);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};

export default bookController;
