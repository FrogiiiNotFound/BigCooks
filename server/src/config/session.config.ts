import { RedisStore } from "connect-redis";
import type { RedisClientType } from "redis";
import { ConfigService } from "@nestjs/config";
import { SessionOptions } from "express-session";

export const sessionConfig = (
    configService: ConfigService,
    redis: RedisClientType,
): SessionOptions => ({
    secret: configService.getOrThrow<string>("SESSION_SECRET"),
    name: configService.getOrThrow<string>("SESSION_NAME"),
    resave: true,
    saveUninitialized: false,
    cookie: {
        domain: configService.getOrThrow<string>("SESSION_DOMAIN"),
        maxAge: Number(configService.getOrThrow<string | number>("SESSION_MAX_AGE")),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    },
    store: new RedisStore({
        client: redis,
        prefix: configService.getOrThrow<string>("SESSION_FOLDER"),
    }),
});
