import express, { Express } from "express";
import { USER_ROUTE_PATH } from "../constant/router.path";
import UserController from "../controller/user.controller";

export default class UserRoute {
    constructor() {

    }

    getRoute() {
        const userRouter = express.Router();
        const userController: UserController = new UserController();

        userRouter.get(USER_ROUTE_PATH.fetch, userController.fetchUser);
        userRouter.post(USER_ROUTE_PATH.login, userController.loginUser);
        userRouter.post(USER_ROUTE_PATH.signup, userController.createUser);
        userRouter.patch(USER_ROUTE_PATH.update, userController.updateUser);

        return userRouter;
    }
}