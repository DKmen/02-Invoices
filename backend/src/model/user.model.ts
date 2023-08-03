import mongoose, { Model } from "mongoose";
import { Hashing } from "../util/hashing";
import { INVALID_GST_NUMBER } from "../constant/error.message";

export enum Business {
    RETAILER = "RETAILER",
    WHOLESALER = "WHOLESALER",
    MANUFACTURING = "MANUFACTURING",
    DISTRIBUTER = "DISTRIBUTER",
    SERVICES = "SERVICES",
    OTHERS = "OTHERS"
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    mobile: string;
    businessType: Business;
    gstNumber: string;
    businessName: string;
}

interface UserDocument extends IUser, Document {

}

interface UserModel extends Model<UserDocument> {
    generateToken(payload: any): string;
    comparePassword(hash: string, txt: string): boolean
}


const userSchema = new mongoose.Schema<UserDocument, UserModel>({
    name: {
        type: String,
        require: [true, 'User name is required']
    },
    email: {
        type: String,
        require: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'password is requires'],
        select: false
    },
    mobile: {
        type: String,
        require: [true, 'mobile is requires']
    },
    businessType: {
        type: String,
        enum: Business
    },
    gstNumber: {
        type: String,
        validate: {
            validator: function (value: string) {
                const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}$/;
                return gstPattern.test(value);
            },
            message: INVALID_GST_NUMBER,
        },
    },
    businessName: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    if (user.password) user.password = Hashing.encrypt(user.password);
});

userSchema.statics.generateToken = function (payload: any): string {
    return Hashing.generateToken(payload)
};

userSchema.statics.comparePassword = function (hash: string, password: string): boolean {
    return Hashing.compare(hash, password);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
export default User;