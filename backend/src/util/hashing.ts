import { genSaltSync, hashSync, compareSync } from "bcryptjs"
import { sign, verify } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import CustomError from "./custom.error";
import { TOKEN_EXPIRE } from "../constant/error.message";

export class Hashing {

    static salt = genSaltSync(parseInt(process.env.SALT || '10'));

    static encrypt(txt: string): string {
        return hashSync(txt, this.salt);
    }

    static compare(has: string, txt: string): boolean {
        return compareSync(txt, has)
    }

    static generateToken(payload: any): string {
        const token = sign(payload, process.env.SECRATE || 'secrate');
        return token;
    }

    static decodeToken(token: string): any {
        try {
            const payload = verify(token, process.env.SECRATE || 'secrate');
            return payload;
        } catch (error) {
            throw new CustomError(TOKEN_EXPIRE, StatusCodes.UNAUTHORIZED)
        }
    }
}