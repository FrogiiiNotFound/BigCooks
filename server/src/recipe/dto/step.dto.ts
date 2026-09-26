import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class StepDto {
    @IsInt({ message: "Order must be a number" })
    @Min(1, { message: "Order must be at least 1" })
    @Max(100, { message: "Order must not exceed 100" })
    order: number;

    @IsNotEmpty()
    @IsString({ message: "Content must be a string" })
    @MinLength(50, { message: "Content must be at least 50 characters" })
    @MaxLength(1000, { message: "Content must not exceed 1000 characters" })
    content: string;
}
