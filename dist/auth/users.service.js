"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
let UsersAuthService = class UsersAuthService {
    userRepository;
    jwtservice;
    constructor(userRepository, jwtservice) {
        this.userRepository = userRepository;
        this.jwtservice = jwtservice;
    }
    async registerUser(registerUserDto) {
        const { email, password, firstName, lastName, role, name } = registerUserDto;
        const findUser = await this.userRepository.findOne({ where: { email } });
        if (findUser) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        const hashedpass = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            email,
            name,
            password: hashedpass,
            firstName,
            lastName,
            role,
            refreshToken: (0, uuid_1.v4)()
        });
        await this.userRepository.save(newUser);
        const payload = {
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
        };
        return {
            access_token: this.jwtservice.sign(payload),
            refresh_token: this.jwtservice.sign(payload, { expiresIn: '7d' }),
            user: { ...payload }
        };
    }
    async login(logindDto) {
        const { email, password } = logindDto;
        const User = await this.userRepository.findOne({ where: { email } });
        if (!User) {
            throw new common_1.UnauthorizedException('User dosnt exist exist');
        }
        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Incorrect password');
        }
        const payload = {
            email: User.email,
            firstName: User.firstName,
            lastName: User.lastName,
            role: User.role,
        };
        return {
            access_token: this.jwtservice.sign(payload),
            refresh_token: this.jwtservice.sign(payload, { expiresIn: '7d' }),
            user: { ...payload }
        };
    }
    async refresh(refresh_tokenDto) {
        const user = await this.userRepository.findOne({ where: { refreshToken: refresh_tokenDto.refreshToken } });
        if (!user) {
            throw new Error('Invalide refresh token');
        }
        const generateToken = (0, uuid_1.v4)();
        await this.userRepository.update(user.id, { refreshToken: generateToken });
        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };
        return {
            access_token: this.jwtservice.sign(payload),
            refresh_token: this.jwtservice.sign(payload, { expiresIn: '7d' }),
            user: { ...payload }
        };
    }
};
exports.UsersAuthService = UsersAuthService;
exports.UsersAuthService = UsersAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersAuthService);
//# sourceMappingURL=users.service.js.map