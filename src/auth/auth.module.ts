import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: {
        expiresIn: '1h'
      }
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
