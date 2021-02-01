export abstract class CustomErrors extends Error{
    abstract statusCode:number
    constructor(message:string) {
        super(message)
        Object.setPrototypeOf(this,CustomErrors.prototype)
    }
    abstract serilizedError(): { message: string;field?:string}[]
}