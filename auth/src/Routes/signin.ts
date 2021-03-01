import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import express,{Request,Response} from 'express';
import { validateRequest } from '@sgticket/common';
import { User } from '../models/user';
import { BadRequestError } from '@sgticket/common';


const router = express.Router()
router.post('api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password must be suppled ')
], validateRequest,async (req: Request, res: Response) => {
        const { email, password } = req.body
        const existingUser = await  User.findOne({ email })
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }
        const passwordMatch = await  password.compare(existingUser.password, password)
        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials')
        }
        //jwt
        const userJWT = jwt.sign(
            {
                id: existingUser.id,
                email:existingUser.email
            },process.env.JWT_KEY!
        )
        req.session = {
            jwt:userJWT
        }

        res.status(200).send(existingUser)
})


export { router as signinRouter }
