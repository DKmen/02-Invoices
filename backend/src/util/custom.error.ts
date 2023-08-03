import { StatusCodes } from "http-status-codes";

export default class CustomError extends Error {
    message: string;
    status: StatusCodes;

    constructor(message: string, status: StatusCodes) {
        super(message);
        this.message = message;
        this.status = status;
    }
}