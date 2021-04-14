import { Publisher, Subjects, TicketCreatedEvent } from "@cloneticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subjects: Subjects.TicketCreated = Subjects.TicketCreated
}