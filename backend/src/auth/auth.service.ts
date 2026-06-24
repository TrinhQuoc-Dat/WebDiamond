import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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
    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        role: user.role,
      },
    };
  }

  async register(dto: RegisterDto) {
    const emailLower = dto.email.toLowerCase();
    const exists = await this.userModel.findOne({ email: emailLower });
    if (exists) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      email: emailLower,
      passwordHash,
      name: dto.name || '',
      phone: dto.phone || '',
      role: 'user',
    });

    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        role: user.role,
      },
    };
  }

  async getProfile(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      role: user.role,
      createdAt: (user as any).createdAt,
      updatedAt: (user as any).updatedAt,
    };
  }

  async updateProfile(id: string, dto: UpdateProfileDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    if (dto.name !== undefined) {
      user.name = dto.name;
    }
    if (dto.phone !== undefined) {
      user.phone = dto.phone;
    }
    if (dto.password !== undefined) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }

    await user.save();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      role: user.role,
      createdAt: (user as any).createdAt,
      updatedAt: (user as any).updatedAt,
    };
  }
}
