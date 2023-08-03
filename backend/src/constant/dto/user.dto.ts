import { Business } from "../../model/user.model";

export default interface UserDto{
    name: string;
    email: string;
    password: string;
    mobile: string;
    businessType: Business;
    gstNumber: string;
    businessName: string;
}