import amqp from "amqplib/callback_api";
import { TicketCreatedListener } from "./event/ticket-created-listener";
amqp.connect("amqp://localhost:5672", (err, conn) => {
  if (err) {
    throw err
  }
  new TicketCreatedListener(conn).listen();
})