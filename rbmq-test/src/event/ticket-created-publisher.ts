import amqp from "amqplib/callback_api";
import { Subjects } from "./subject";
import { Publisher } from './base-publisher';
import { TicketCreatedEvent } from "./ticket-created-event";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subjects: Subjects.TicketCreated = Subjects.TicketCreated
}