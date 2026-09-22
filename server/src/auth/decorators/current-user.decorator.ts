import { SessionUser } from "./../interfaces/session-user.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const CurrentUser = createParamDecorator(
    (data: keyof SessionUser, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request;

        const user = request.user;

        if (!user) return null;

        return data ? user[data] : user;
    },
);
