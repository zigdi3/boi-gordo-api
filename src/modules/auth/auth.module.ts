import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/jwt.strategy';
import { RtStrategy } from './strategies/jwtRefresh.interface';
import { ConfigService } from '@nestjs/config';
import { ClientDataModule } from 'src/data/client/modules';

@Module({
  imports: [JwtModule.register({}), ClientDataModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, ConfigService],
})
export class AuthModule {}
