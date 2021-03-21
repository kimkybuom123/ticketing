import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";


it('return  a 404 if the ticket is not found ', async () => {
    const response = await request(app)
        .get('/api/tickets/igiqw')
        .send()
        .expect(404)
    console.log(response.body)
})


it('return the ticket if the ticket is found', async () => {
    const title = ' concert'
    const price = 20

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201)
    
    const ticketsReponse = await request(app)
        .get(`api/tickets'${response.body.id}`)
        .send()
        .expect(201)
    
    expect(ticketsReponse.body.title).toEqual(title)
    expect(ticketsReponse.body.price).toEqual(price)
})
