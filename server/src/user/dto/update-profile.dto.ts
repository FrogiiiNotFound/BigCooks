import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message: "Nickname can only contain letters, numbers and underscores",
    })
    nickname?: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    bio?: string;
}
