import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = '16666';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //build a jwt payload {email,password}
  const payload = {
    id: '646sda,sd',
    email:'test@test.com'
  } 

  // create the jwt
  const token = jwt.sign(payload,process.env.JWT_KEY!)

  // build session object {jwt:MY_JWT}

  const session = { jwt: token }
  
  // turn that session into json

  const sessionJson = JSON.stringify(session)
  
  //take Json and encode it as base 64

  const base64 = Buffer.from(sessionJson).toString('base64')
  
  // return a string thats the cookies with the encode  data

  return [`express:sess=${base64}`] 


}; 
