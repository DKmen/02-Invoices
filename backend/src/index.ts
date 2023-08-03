import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import { redBright, blue, yellowBright } from "colorette"
import express, { Express, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bodyParser from 'body-parser';

import UserRoute from './router/user.route';
import { BASE } from './constant/router.path';


config();
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/Invoices').then((_) => {
    console.log(blue('Database is connected successfully'));

    const app: Express = express();

    const userRouter: UserRoute = new UserRoute();

    app.use(bodyParser.json());

    app.use(BASE, userRouter.getRoute());

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: err.message
        })
    })

    const port: number = parseInt(process.env.PORT || '4000');
    app.listen(port, () => {
        console.log(yellowBright(`Application is running on port ${port}`))
    })

}).catch((e) => {
    console.log(redBright('Some error is occure'));
})