import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegistrationDto } from 'src/dto/registration.dto';
import { UsersAuthService } from './users.service';
import { LoginDto } from 'src/dto/login.dto';
import { jwtAuthGuard } from 'src/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RefreshTokenDto } from 'src/dto/refreshToken.dto';

@Controller('auth')
export class UsersController {
    constructor(
        private usersAuthService: UsersAuthService
    ){}
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    registerUser(@Body() registerUserDto: RegistrationDto){
        return this.usersAuthService.registerUser(registerUserDto)
    }
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'User already exist' })
    Login(@Body() loginDto:LoginDto){
        return this.usersAuthService.login(loginDto)
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Access token refreshed successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    resetToken(@Body() refresh_token:RefreshTokenDto){
        return this.usersAuthService.refresh(refresh_token)
    }

    @UseGuards(jwtAuthGuard)
    @Get('profile')
    profile(@Body( )user:any){
        console.log('your good to go');
    }
}
