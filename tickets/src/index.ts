import { errorHandler } from '@sgticket/common';
import express from "express";  
import { json } from "body-parser";
import { NotFoundError } from '@sgticket/common';
import cookiesession  from "cookie-session";
import "express-async-errors";
import mongoose from 'mongoose';

const app = express()
app.use(json())


app.use(errorHandler)

app.all('*', async () => {
    throw new NotFoundError()
})
app.set('trust proxy', true)
app.use(cookiesession({
    signed:false
}))

const start = async () => {
    console.log('starting up')
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        }
    )
    console.log('Connected Mongoose')
    } catch (error) {
        throw new error
    }
}
