import { JwtPayload } from './jwtPayload.interface';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
