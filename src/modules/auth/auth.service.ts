import { JwtPayload } from './interface/jwtPayload.interface';
import { Tokens } from './interface/token.interface';
import * as argon from 'argon2';
import { ClientRepository } from '../../data/client/repositories/client.repository';
import { AuthDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeORMError } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ClientEntity } from '../../data/client/entities/client.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientRepository: ClientRepository,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.clientRepository
      .createClient({
        id: uuidv4(),
        name: dto.name,
        email: dto.email,
        password: hash,
      })
      .catch((error) => {
        if (error instanceof TypeORMError) {
          throw new ForbiddenException('Credentials incorrect');
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.clientRepository.findByEmail(dto.email);

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.clientRepository.findClient(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.refreshToken, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.clientRepository.refreshToken(userId, hash);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async logout(userId: string): Promise<boolean> {
    await this.clientRepository.logout(userId);
    return true;
  }
}
