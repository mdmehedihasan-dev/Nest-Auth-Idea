import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class RegistrationDto {
    @ApiProperty({example:'mehedi hasan', description:'uniq user name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example:'mehedi@gmail.com', description:'User email address'})
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({example:'123456', description:'User and password must be minimum 6 characters'})
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'Fazla', description: 'First name of the user' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'rabbi', description: 'Last name of the user' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    
    @IsString()
    @IsNotEmpty()
    role: string;
}