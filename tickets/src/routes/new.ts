import { requireAuth } from '@sgticket/common';
import express, { Request, Response, NextFunction } from "express";
import { validateRequest } from "@sgticket/common";
import { Ticket } from "../models/ticket";
import { currentUser } from '@sgticket/common';
import {body}  from 'express-validator';

const router = express.Router()

router.post('/api/tickets',requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    })
    await ticket.save()

    res.send(ticket).status(201)
})

export {router as createTicketRouter  }