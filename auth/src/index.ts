import { ErrorHandle } from './middleware/handle-errors';
import express from "express";  
import { json } from "body-parser";
import { signUp } from "./Routes/signUp";
import {currentUserRouter} from "./Routes/current-user";
import { signIn } from "./Routes/signin";
import { signOut } from "./Routes/signOut";
import { NotFound } from './errors/not-found-error';
import cookiesession  from "cookie-session";
import "express-async-errors";
import mongoose from 'mongoose';

const app = express()
app.use(json())

app.use(signIn)
app.use(signOut)
app.use(currentUserRouter)
app.use(signUp)

app.use(ErrorHandle)

app.all('*', async () => {
    throw new NotFound()
})
app.set('trust proxy', true)
app.use(cookiesession({
    signed:false
}))

const start = async () => {
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

const port = 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})