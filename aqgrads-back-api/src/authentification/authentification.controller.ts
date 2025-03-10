import { Body, Controller,Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthentificationService } from './authentification.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { LocalAuthGuard } from './localAuth.guard';

@Controller('auth')
export class AuthentificationController {
  constructor(private readonly authentificationService: AuthentificationService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: loginDto,@Res() res: Response){
      const user = await this.authentificationService.validateUser(loginDto.email, loginDto.password)  
      return this.authentificationService.login(user, res)
    }
  @Post('register')
  async register(@Body() registerDto: registerDto, @Res() res: Response){
    return this.authentificationService.register(registerDto,res)
  }
}
