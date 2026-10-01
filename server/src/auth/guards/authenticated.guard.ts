import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        if (!req.isAuthenticated()) throw new UnauthorizedException();
        return true;
    }
}
