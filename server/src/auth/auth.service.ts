import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "../prisma/prisma.service";
import { hash, verify } from "argon2";
import { SessionUser } from "./interfaces/session-user.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async register(registerDto: RegisterDto) {
        const passwordHash = await hash(registerDto.password);

        const user = await this.prismaService.user.create({
            data: {
                email: registerDto.email,
                passwordHash: passwordHash,
                nickname: registerDto.nickname,
            },
        });

        return await this.toAuthResponse(user);
    }

    async login(user: SessionUser) {
        return await this.toAuthResponse(user);
    }

    async validateUser(email: string, password: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        const isValid = await verify(user.passwordHash, password);
        if (!isValid) return null;

        return user;
    }

    private async toAuthResponse(user: SessionUser) {
        const payload = { sub: user.userId, email: user.email };

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
            expiresIn: "12d",
        });

        return { accessToken, refreshToken };
    }
}
