import amqp from "amqplib/callback_api";
import { Message } from "amqplib/properties";
import { Subjects } from "./subject";
import {Connection} from 'amqplib/callback_api';
interface Event {
    subjects: Subjects;
    data:any
}

export abstract class Listener<T extends Event>{
    abstract subject: T['subjects']
    abstract queueGroupName: string;
    private client: Connection
    abstract onMessage(data:T['data'],msg:Message):any
    constructor(client: Connection) {
        this.client = client
    }
    listen() {
        this.client.createChannel((err, channel) => {
            if (err) {
                throw err
            }
            channel.assertExchange(this.subject,'topic',{durable:false})
            channel.assertQueue('berlinQueue', { exclusive: true }, (err, queue) => {
                if (err) {
                    throw new err
                }
                channel.bindQueue(queue.queue,this.subject,"agreements.eu.berlin.#")
                channel.consume(queue.queue, (msg:amqp.Message |null ) => {
                    console.log(`Message received : ${this.subject} ,${msg?.content}`)
                })
            })
        })
    }
}