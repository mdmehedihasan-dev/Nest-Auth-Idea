import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { RegistrationDto } from 'src/dto/registration.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokenDto } from 'src/dto/refreshToken.dto';
export declare class UsersAuthService {
    private userRepository;
    private jwtservice;
    constructor(userRepository: Repository<User>, jwtservice: JwtService);
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
    login(logindDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
    refresh(refresh_tokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
}
