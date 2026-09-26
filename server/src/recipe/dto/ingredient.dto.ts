import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength
} from "class-validator";

export class IngredientDto {
    @IsNotEmpty()
    @IsString({ message: "Name must be a string" })
    @MinLength(2, { message: "Name must be at least 2 characters" })
    @MaxLength(100, { message: "Name must not exceed 100 characters" })
    name: string;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: "Order must be a number with up to 2 decimal places" },
    )
    @Min(1, { message: "Amount must be at least 1" })
    @Max(10000, { message: "Amount must not exceed 10000" })
    amount: number;

    @IsNotEmpty()
    @IsString({ message: "Unit must be a string" })
    @MinLength(1, { message: "Unit must be at least 1 character" })
    @MaxLength(50, { message: "Unit must not exceed 50 characters" })
    unit: string;
}
