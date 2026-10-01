import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import type { Request, Response } from "express";
import { SessionUser } from "./interfaces/session-user.interface";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request) {
        return this.authService.login(req.user as SessionUser);
    }

    @Post("logout")
    @UseGuards(AuthenticatedGuard)
    logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return new Promise<{ success: boolean }>((resolve, reject) => {
            req.logOut(err => {
                if (err) return reject(err);
                req.session.destroy(destroyErr => {
                    if (destroyErr) return reject(destroyErr);
                    res.clearCookie("connect.sid");
                    resolve({ success: true });
                });
            });
        });
    }
}
