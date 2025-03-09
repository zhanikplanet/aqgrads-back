import { IsEmail, IsNumber, IsString, MinLength } from "class-validator"

export class registerDto{
    @IsString()
    name: string

    @IsString()
    surname: string

    @IsNumber()
    graduatedYear: number

    @IsString()
    address: string

    @IsString()
    profession: string

    @IsEmail()
    email: string

    @IsNumber()
    phoneNumber: string

    @IsString()
    @MinLength(6)
    password: string
}