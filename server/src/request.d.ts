import { Request } from "express";
import { SessionUser } from "./auth/interfaces/session-user.interface";
declare module "express" {
    interface Request {
        user?: SessionUser;
    }
}
