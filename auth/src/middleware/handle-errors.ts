import { connectionDatabaseError } from './../errors/connect-database-error';
import { Request,Response,NextFunction } from "express";
import { CustomErrors } from '../errors/custom-error';
import { RequestValidationError } from '../errors/request-error-validator';

export const ErrorHandle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof connectionDatabaseError) {
        return res.status(err.statusCode).send({ errors: err.serilizedError() })
    }
    if (err instanceof RequestValidationError) {
        return res.status(err.statusCode).send({ errors: err.serilizedError() })
    }
}
