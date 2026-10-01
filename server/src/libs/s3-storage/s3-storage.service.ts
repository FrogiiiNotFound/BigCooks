import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { extname } from "path";
import { randomBytes } from "crypto";

@Injectable()
export class S3StorageService {
    private readonly CLIENT: S3Client;
    private readonly BUCKET: string;
    private readonly S3_URL: string;

    constructor(private readonly configService: ConfigService) {
        this.CLIENT = new S3Client({
            endpoint: configService.getOrThrow<string>("S3_ENDPOINT"),
            region: configService.getOrThrow<string>("S3_REGION"),
            forcePathStyle: true,
            credentials: {
                accessKeyId: configService.getOrThrow<string>("S3_ACCESS_KEY"),
                secretAccessKey: configService.getOrThrow<string>("S3_SECRET_KEY"),
            },
        });

        this.BUCKET = configService.getOrThrow<string>("S3_BUCKET_NAME");
        this.S3_URL = configService.getOrThrow<string>("S3_BUCKET_URL");
    }

    async uploadFile(file: Express.Multer.File, folder: string, oldKey?: string | null) {
        const extension = extname(file.originalname).toLowerCase();
        const filename = `${folder}/${randomBytes(16).toString("hex")}${extension}`;

        const command = new PutObjectCommand({
            Bucket: this.BUCKET,
            Key: filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.CLIENT.send(command);

        if (oldKey) await this.deleteFile(oldKey);

        return {
            fileUrl: `${this.S3_URL}/${filename}`,
            fileKey: filename,
        };
    }

    async deleteFile(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.BUCKET,
            Key: key,
        });

        await this.CLIENT.send(command);
    }

    toUrl(key: string | null | undefined) {
        return key ? `${this.S3_URL}/${key}` : null;
    }
}
