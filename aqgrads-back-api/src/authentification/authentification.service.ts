import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { registerDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthentificationService {

  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    else {
      throw new UnauthorizedException('Invalid creditinals')
    }
  }

  async login(user: User, @Res() res: Response) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.send({ message: 'Login successful' });
  }

  async register(userData: registerDto, @Res() res: Response): Promise<Response> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userService.create({
      ...userData,
      password: hashedPassword,
      address: userData.address ?? null,
      profession: userData.profession ?? null,
    });
    const createdUser = await user
    const payload = { sub: createdUser.id, email: createdUser.email }
    const token = this.jwtService.sign(payload)

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.send({ message: 'Registration successful' })
  }
}
