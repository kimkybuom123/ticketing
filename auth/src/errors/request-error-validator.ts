import { CustomErrors } from './custom-error';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomErrors{
    statusCode = 400
    constructor(public errors:ValidationError[]) {
        super("invalid Request")
    Object.setPrototypeOf(this,RequestValidationError.prototype)
    }
    serilizedError() {
        return this.errors.map(err => {
            return {message:err.msg,field:err.param}
        })
    }

}