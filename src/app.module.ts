import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './auth/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '(P)999biGblue##!##!',
      database: 'HW_DB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }),
    UsersModule
  ],
})
export class AppModule {}
