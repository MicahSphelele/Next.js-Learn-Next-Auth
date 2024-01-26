import { ObjectId } from "mongoose";
import { User , ISODateString} from "next-auth";

export interface SessionUser extends User {
    _id: ObjectId
    name: string,
    email: string,
    createdAt: ISODateString
}