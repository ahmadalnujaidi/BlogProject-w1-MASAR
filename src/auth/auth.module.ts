// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Import AuthController
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use env variable
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // Add AuthController here
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
