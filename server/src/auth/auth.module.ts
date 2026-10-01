import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
    imports: [
        PassportModule.register({ session: true }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("JWT_SECRET"),
                signOptions: { expiresIn: "15m" },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    exports: [AuthService],
})
export class AuthModule {}
