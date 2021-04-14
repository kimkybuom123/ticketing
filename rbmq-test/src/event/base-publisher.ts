import  { Connection } from "amqplib/callback_api";
import { Subjects } from "./subject";

interface Event {
    subjects: Subjects;
    data:any
}

export abstract class Publisher<T extends Event>{
    abstract subjects: T['subjects'];
    private client: Connection
    constructor(client: Connection) {
        this.client = client
    }
    publish(data: T['data']): Promise<void>{
        return new Promise((resolve, reject) => {
            this.client.createChannel((err, channel) => {
                const routingKey = "agreements.eu.berlin"
                if (err) {
                    return reject(err)
                }
                channel.assertExchange(this.subjects, 'topic', {
                    durable: false,
                    autoDelete: false,
                    internal: false
                })
                channel.publish(this.subjects, routingKey,Buffer.from(JSON.stringify(data)))
                console.log(`publish message ${Buffer.from(JSON.stringify(data))}`)
                resolve()
            })
        })
    }
}