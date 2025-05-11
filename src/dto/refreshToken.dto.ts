import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'your-refresh-token', description: 'The refresh token to be validated' })
    refreshToken: string;
}