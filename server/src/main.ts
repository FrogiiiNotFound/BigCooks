import { createClient, RedisClientType } from "redis";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { sessionConfig } from "./config/session.config";
import passport from "passport";
import { GlobalFilter } from "./common/filters/global-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    const redis: RedisClientType = createClient({ url: config.getOrThrow<string>("REDIS_URI") });
    await redis.connect();

    app.setGlobalPrefix("api/v1");
    app.use(cookieParser(config.getOrThrow<string>("COOKIE_SECRET")));

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: errors => {
                console.log(JSON.stringify(errors, null, 2));

                return new BadRequestException(errors);
            },
        }),
    );

    app.use(session(sessionConfig(config, redis)));

    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalFilters(new GlobalFilter());

    app.enableCors({
        origin: config.getOrThrow<string>("CLIENT_ORIGIN"),
        credentials: true,
        exposedHeaders: ["set-cookie"],
    });

    await app.listen(config.getOrThrow<string>("PORT"));
}
bootstrap();
