import  request  from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import meta from "mocha";
import {} from "../../test/setup";
import Response from 'express';

it('return  a 404 if the provided if does not exist ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'sadasd',
            price: 45
        })
        .expect(404)
})


it('return a 401 if not authenticated', async () => {
    const  id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: '',
            price:1
        })
        .expect(401)
})

it('return a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .put('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'dad',
            price: 66
        })
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'sdad',
            price : 45
        })
        .expect(401)
    }
)

it('return 400 if the user provide valid title or price ', async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post('api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'asdasd',
            price:20
        })
    await request(app)
        .put(`/api/tickets/${response.body.id}`) 
        .set('Cookie', cookie)
        .send({
            title: 'asdasd',
            price:-10
        })
        .expect(400)
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price : 40            
        })
        .expect(400)
})

it('update the ticket provided valid input ', async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie',cookie)
        .send({
            title: 'asd',
            price:40
        })
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'sda',
            price:40
        })
        .expect(400)
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asdada',
            price:5
        })
        .expect(200)
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send({})
        
    
    
})