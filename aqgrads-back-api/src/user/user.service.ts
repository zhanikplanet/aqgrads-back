import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

    constructor (private prisma: PrismaService){
    }

    async findUserByEmail(email:string){
        return this.prisma.user.findUnique({where: {email} })
    }

    async create (data: Prisma.UserCreateInput){
        return this.prisma.user.create({data})
    }
}
