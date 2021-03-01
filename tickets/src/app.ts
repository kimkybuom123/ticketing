import { errorHandler } from '@sgticket/common';
import { NotFoundError } from '@sgticket/common';
import  cookiesession  from 'cookie-session';
import { json } from 'body-parser';
import  express  from 'express';
import 'express-async-errors'
import { createTicketRouter } from "./../src/routes/new";

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookiesession({
    signed: false,
    secure:process.env.NODE_ENV !== 'test'
}))

app.use(createTicketRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)
export {app}