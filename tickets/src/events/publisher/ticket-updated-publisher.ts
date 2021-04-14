import { Publisher,Subjects,TicketUpdatedEvent } from '@cloneticketing/common';


export class TicketUpdatedPubliser extends Publisher<TicketUpdatedEvent>{
    subjects: Subjects.TicketUpdated = Subjects.TicketUpdated
}