import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import express,{Request,Response} from 'express';
import { validateRequest } from '../middleware/validate_request';
import { User } from '../models/user.model';
import { badRequestErrors } from '../errors/bad_request_errors';


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
            throw new badRequestErrors('Invalid credentials')
        }
        const passwordMatch =await  password.compare(existingUser.password, password)
        if (!passwordMatch) {
            throw new badRequestErrors('Invalid credentials')
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


export { router as signIn }
