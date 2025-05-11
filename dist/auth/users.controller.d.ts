import { RegistrationDto } from 'src/dto/registration.dto';
import { UsersAuthService } from './users.service';
import { LoginDto } from 'src/dto/login.dto';
import { RefreshTokenDto } from 'src/dto/refreshToken.dto';
export declare class UsersController {
    private usersAuthService;
    constructor(usersAuthService: UsersAuthService);
    registerUser(registerUserDto: RegistrationDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
    Login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
    resetToken(refresh_token: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
    profile(user: any): void;
}
