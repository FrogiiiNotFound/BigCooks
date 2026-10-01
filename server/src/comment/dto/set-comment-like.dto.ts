import { IsBoolean, IsNotEmpty } from "class-validator";

export class SetCommentLikeDto {
    @IsNotEmpty()
    @IsBoolean()
    like: boolean;
}
