import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@sgticket/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";
import amqp from "amqplib/callback_api";

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    amqp.connect("amqp://172.17.0.5:5672", async (err, conn) => {
      if (err) {
        throw err;
      }
      console.log("connected");
      const publisher = new TicketCreatedPublisher(conn);

      await publisher.publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
      });
      res.status(201).send(ticket);
    });
  }
);
export { router as createTicketRouter };