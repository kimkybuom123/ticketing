import { ErrorHandle } from './middleware/handle-errors';
import { NotFound } from './errors/not-found-error';
import  cookiesession  from 'cookie-session';
import { json } from 'body-parser';
import  express  from 'express';
import 'express-async-errors'
import { signIn } from './Routes/signin';
import { signOut } from './Routes/signOut';
import { signUp } from './Routes/signUp';
import { currentUserRouter } from "./Routes/current-user";

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookiesession({
    signed: false,
    secure:process.env.NODE_ENV !== 'test'
}))

app.use(currentUserRouter)
app.use(signIn)
app.use(signOut)
app.use(signUp)

app.all('*', async (req, res) => {
    throw new NotFound()
})

app.use(ErrorHandle)
export {app}