import { StatusCodes } from "http-status-codes";
import UserDto from "../constant/dto/user.dto";
import { PASSWORD_NOT_MATCH, USER_NOT_FIND } from "../constant/error.message";
import User from "../model/user.model";
import CustomError from "../util/custom.error";
import { Hashing } from "../util/hashing";

export default class UserService {
    constructor() {

    }

    createUser = async (userDto: UserDto) => {
        const validFields: (keyof UserDto)[] = ["name", "email", "password", "mobile", "businessType", "gstNumber", "businessName"];

        const validUser: any = {}

        validFields.forEach((key) => {
            if (userDto[key]) {
                validUser[key] = userDto[key];
            }
        })

        const user = await User.create(validUser);
        const token = User.generateToken(user.toObject());

        return {
            user: user,
            token: token
        }
    }

    loginUser = async (email: string, password: string) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new CustomError(USER_NOT_FIND, StatusCodes.NOT_FOUND);
        }

        const isPasswordMatch = Hashing.compare(user.password, password);

        if (!isPasswordMatch) {
            throw new CustomError(PASSWORD_NOT_MATCH, StatusCodes.NOT_FOUND);
        }

        const token = User.generateToken(user.toObject());
        return {
            user: user,
            token: token
        }
    }

    updateUser = async (id: string, userDto: UserDto) => {

        const validFields: (keyof UserDto)[] = ["name", "email", "password", "mobile", "businessType", "gstNumber", "businessName"];

        const validUser: any = {}

        validFields.forEach((key) => {
            if (userDto[key]) {
                validUser[key] = userDto[key];
            }
        })

        const user = await User.findByIdAndUpdate(id, validUser);
        if (!user) {
            throw new CustomError(USER_NOT_FIND, StatusCodes.NOT_FOUND);
        }
        const token = User.generateToken(user.toObject());

        return {
            user: user,
            token: token
        }
    }
}