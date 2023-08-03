import { NextFunction, Request, Response } from "express";

export default function errorHandler(fun: Function) {
    return (req: any, res: any, next: any) => {
        try {
            fun(req, res, next);
        } catch (error) {
            next(error)
        }
    };
}