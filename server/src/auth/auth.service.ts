import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "../prisma/prisma.service";
import { hash, verify } from "argon2";
import { SessionUser } from "./interfaces/session-user.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import argon2 from "argon2";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email: registerDto.email.toLowerCase() },
            select: { userId: true },
        });

        if (existingUser) {
            throw new ConflictException("User with this email already exists");
        }

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
        return { user: { userId: user.userId, nickname: user.nickname } };
    }

    async validateUser(email: string, password: string): Promise<SessionUser> {
        const user = await this.prismaService.user.findUnique({
            where: { email: email.toLowerCase() },
            select: { userId: true, email: true, nickname: true, passwordHash: true },
        });

        if (!user || !(await argon2.verify(user.passwordHash, password))) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return { userId: user.userId, email: user.email, nickname: user.nickname };
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
