import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('has a route handler listening to /api/ticket for post request', async () => {
    const response = await request(app).post('/api/tickets').send({})
    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
});
  
it('return a status other than 401 if the tuser is sign in ', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',global.signin())
})

it('return a errors if an ivalid price is provide ', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
    .send({title,price:20})
}) 