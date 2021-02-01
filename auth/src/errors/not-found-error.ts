import { CustomErrors } from './custom-error';
export class NotFound extends CustomErrors {
    statusCode = 404
    constructor() {
        super("Request is not valid")
        Object.setPrototypeOf(this,NotFound.prototype)
    }
    serilizedError() {
        return [{message:"not Found "}]
    }
}