import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString({ message: "Email must be a string" })
    @IsEmail({}, { message: "Must be a valid email" })
    email: string;

    @IsNotEmpty()
    @IsString({ message: "Password must be a string" })
    @MinLength(6, { message: "Password must be at least 6 characters" })
    @MaxLength(32, { message: "Password must not exceed 32 characters" })
    password: string;

    @IsNotEmpty()
    @IsString({ message: "Nickname must be a string" })
    @MinLength(4, { message: "Nickname must be at least 4 characters" })
    @MaxLength(24, { message: "Nickname must not exceed 24 characters" })
    nickname: string;
}
