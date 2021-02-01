import { CustomErrors } from './custom-error';
export class connectionDatabaseError extends CustomErrors{
    statusCode = 500
    reason="ConnectDberror"
    constructor() {
        super("ConnectDberror")

    Object.setPrototypeOf(this,connectionDatabaseError.prototype)
    }
    serilizedError() {
        return [{message:this.reason}]
    }
}