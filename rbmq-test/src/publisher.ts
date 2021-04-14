import amqp from "amqplib/callback_api";
import { TicketCreatedPublisher } from "./event/ticket-created-publisher";

const rbmq = amqp.connect("amqp://localhost:5672", async (err, conn) => {
    if (err) {
        throw err
    }
    const publisher = new TicketCreatedPublisher(conn);
    try {
      const data =  {
            id: '123',
            title: 'concert',
            price: 20}
      await publisher.publish(data);
    } catch (err) {
      console.error(err);
    }
  
})