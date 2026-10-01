import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString({ message: "Content must be a string" })
    @MinLength(2, { message: "Content must be at least 2 characters" })
    @MaxLength(1000, { message: "Content must not exceed 1000 characters" })
    content: string;
}
