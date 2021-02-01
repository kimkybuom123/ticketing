import { CustomErrors } from './custom-error';
export class badRequestErrors extends CustomErrors {
    statusCode = 400
    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this,badRequestErrors.prototype)
    }
    serilizedError() {
        return [{message:this.message}]
    }
}







