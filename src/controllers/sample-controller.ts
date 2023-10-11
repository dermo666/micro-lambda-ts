import express, { Request, Response } from 'express';
import LogService from '../services/log-service';
import HttpError from '../errors/http-error';

export default class SampleController {
  constructor(private log: LogService) {}

  static middleware(controller?: SampleController): express.Router {
    return express
      .Router()
      .use((req: Request, res: Response, next) => {
        // istanbul ignore next
        if (!req.controller) {
          req.controller = controller || new SampleController(req.log);
        }
        next();
      })
      .get('/:id', (req: Request, res: Response) => req.controller.reply(req, res));
  }

  async reply(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { message } = req.query;

    try {
      if (!message) {
        throw new HttpError('Message is required', 400);
      }

      res.json({
        data: {
          id,
          type: 'response',
          attributes: { message },
        },
      });
    } catch (error) {
      req.log.error('Error', error, { id, message });
      res.jsonError(res, error);
    }
  }
}
