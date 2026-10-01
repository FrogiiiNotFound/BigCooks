import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { S3StorageModule } from "../libs/s3-storage/s3-storage.module";
import { UserMapper } from "./mappers/user.mapper";

@Module({
    imports: [S3StorageModule],
    controllers: [UserController],
    providers: [UserService, UserMapper],
})
export class UserModule {}
