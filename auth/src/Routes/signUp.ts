import { validateRequest } from './../middleware/validate_request';
import { RequestValidationError } from './../errors/request-error-validator';
import {Request,Response} from 'express';
import { body,validationResult } from "express-validator";
import { connectionDatabaseError } from '../errors/connect-database-error';
import express from "express"
import jwt from "jsonwebtoken";
import { User } from '../models/user.model';
import { badRequestErrors } from '../errors/bad_request_errors';

const router = express.Router()


router.post("/api/signup/",
    [body("email")
        .isEmail()
        .withMessage("email must be valid"),
    body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("password must be beetween 4 and 20 characters ")]
    ,validateRequest ,async (req: Request, res: Response) => {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            throw new badRequestErrors('Email in using')
        }
        const user = User.build({ email, password })
        await user.save()

        //Generate JWT
        const userJwt = jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            process.env.JWT_KEY!
          );
              // Store it on session object
    req.session = {
        jwt: userJwt
      };
  
      res.status(201).send(user);
    }
  );
  
export { router as signUp }
