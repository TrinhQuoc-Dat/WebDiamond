import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }

  async login(dto: LoginDto) {
    const user = await this.validate(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return { accessToken: token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }
}
