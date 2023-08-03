import { IUser } from "./src/model/user.model";

declare module 'mongoose-validator';

declare module "express" {
    export interface Request {
        user: IUser
    }
}