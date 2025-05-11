import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersAuthService } from './users.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:'this-is-very-secret-key',
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersAuthService,JwtStrategy]

})
export class UsersModule {}
