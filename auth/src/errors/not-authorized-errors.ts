import { CustomErrors } from "./custom-error";

export class NotAuthorizedError extends CustomErrors{
    statusCode = 401
    constructor() {
        super('Not Authorized')
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
        
    }
    serilizedError() {
        return [{message:'Not authorized'}]
    }
}