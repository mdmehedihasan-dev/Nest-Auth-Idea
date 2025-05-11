import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:'fazla@gmail.com', description:'User email address'})
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example:'123456', description:'User password with minimum 6 characters'})
    password: string;   
}