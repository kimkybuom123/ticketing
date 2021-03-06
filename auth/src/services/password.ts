import { randomBytes, scrypt } from 'crypto';
import { promisify } from "util";

const scryptAsync = promisify(scrypt)

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex')
        const buf = (await scryptAsync(password, salt, 64)) as Buffer
        return `${buf.toString('hex')}.${salt}`
    }
    static async compare(storedpassword: string, supplipassword:string) {
        const [hashedPassword, salt] = storedpassword.split('.')
        const buf = (await scryptAsync(supplipassword, salt, 64)) as Buffer
        return buf.toString('hex') === hashedPassword
    }
}