import amqp from "amqplib/callback_api";
import { Subjects } from "./subject";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Message } from "amqplib/properties";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject :  Subjects.TicketCreated = Subjects.TicketCreated
    queueGroupName = 'payment-service'

    onMessage(data: TicketCreatedEvent['data'],msg:Message) {
        console.log(msg.content)
    }
}