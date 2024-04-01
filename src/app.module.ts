import { ClientDataModule } from './data/client/modules/client-data.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './modules/client/client.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ClientDataModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'root1234',
      database: 'boi_gordo',
      options: { encrypt: false },
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
