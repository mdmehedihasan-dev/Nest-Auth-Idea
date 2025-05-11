import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/login.dto';
import { RegistrationDto } from 'src/dto/registration.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcrypt'
import { RefreshTokenDto } from 'src/dto/refreshToken.dto';

@Injectable()
export class UsersAuthService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtservice: JwtService
    ) {}
    // registration part 
    async registerUser(registerUserDto: RegistrationDto){
        const {email, password, firstName,lastName, role,name} = registerUserDto
        const findUser = await this.userRepository.findOne({where:{email}})
        if(findUser){
            throw new UnauthorizedException('User already exists')
        }
        
        const hashedpass = await bcrypt.hash(password,10)
        const newUser = this.userRepository.create({
            email,
            name,
            password:hashedpass,
            firstName,
            lastName,
            role,
            refreshToken: uuidv4()
        })
        
        await this.userRepository.save(newUser)
        const payload ={
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
        }
        return{
            access_token: this.jwtservice.sign(payload),
            refresh_token: this.jwtservice.sign(payload,{expiresIn: '7d'}),
            user:{...payload}
        }
    }
    // Login part
    async login(logindDto:LoginDto){
        const {email,password} = logindDto
        const User = await this.userRepository.findOne({where:{email}})
        if(!User){
            throw new UnauthorizedException('User dosnt exist exist')
        }
        const isPasswordValid = await bcrypt.compare(password, User.password)
        if(!isPasswordValid){
            throw new UnauthorizedException('Incorrect password')
        }
        const payload = {
            email: User.email,
            firstName: User.firstName,
            lastName: User.lastName,
            role: User.role,
        }
        return{
            access_token: this.jwtservice.sign(payload),
            refresh_token:this.jwtservice.sign(payload ,{expiresIn:'7d'}),
            user:{...payload}
        }
    }

    async refresh(refresh_tokenDto:RefreshTokenDto){
        const user = await this.userRepository.findOne({ where: { refreshToken: refresh_tokenDto.refreshToken } });
        if(!user){
            throw new Error('Invalide refresh token')
        }
        const generateToken = uuidv4()
        await this.userRepository.update(user.id,{refreshToken:generateToken})
        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
        return{
            access_token: this.jwtservice.sign(payload),
            refresh_token:this.jwtservice.sign(payload ,{expiresIn:'7d'}),
            user:{...payload}
        }
    }

    // get profile 
}
