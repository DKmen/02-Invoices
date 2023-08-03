import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User, { IUser } from "../model/user.model";
import errorHandler from "../util/errorController";
import CustomError from "../util/custom.error";
import UserService from "../service/user.service";
import UserDto from "../constant/dto/user.dto";


export default class UserController {

    private userServices: UserService;

    constructor() {
        this.userServices = new UserService();
    }

    fetchUser = errorHandler((req: Request, res: Response, next: NextFunction) => {
        res.status(StatusCodes.OK).json({
            error: false,
            data: {
                user: req.user
            },
        })
    })

    createUser = errorHandler(async (req: Request<any, UserDto>, res: Response, next: NextFunction) => {
        const { user, token } = await this.userServices.createUser(req.body);

        res.cookie('token', token);
        res.status(StatusCodes.OK).json({
            error: false,
            data: {
                user
            },
            token
        })
    })

    loginUser = errorHandler(async (req: Request<any, { email: string, password: string }>, res: Response, next: NextFunction) => {
        const { user, token } = await this.userServices.loginUser(req.body.email, req.body.password);

        res.cookie('token', token);
        res.status(StatusCodes.OK).json({
            error: false,
            data: {
                user
            },
            token
        })
    })

    updateUser = errorHandler(async (req: Request<{ id: string }, UserDto>, res: Response, next: NextFunction) => {
        const { user, token } = await this.userServices.updateUser(req.params.id, req.body);

        res.cookie('token', token);
        res.status(StatusCodes.OK).json({
            error: false,
            data: {
                user
            },
            token
        })
    })

    logoutUser = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie('token');
        res.status(200).json({
            error: false
        })
    })
}