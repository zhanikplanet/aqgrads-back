import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { registerDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthentificationService {
  
  constructor(private userService:UserService, private jwtService:JwtService){
  }

  async validateUser(email:string, password:string){
    const user=await this.userService.findUserByEmail(email)
    if(user && (await bcrypt.compare(password, user.password))){
      return user
    }
    else{
      throw new UnauthorizedException('Invalid creditinals')
    }
  }

  async login(user: User){
    const payload= {sub: user.id, email: user.email}
    return {access_token:this.jwtService.sign(payload)}
  }

  async register(userData: registerDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userService.create({
      ...userData,
      password: hashedPassword,
      address: userData.address ?? null,
      profession: userData.profession ?? null, 
    });
  }
}
