import { registerDto } from "src/authentification/dto/register.dto";
import { IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class updateUserDto extends PartialType(registerDto) {
        @IsString()
        address:string
        @IsString()
        profession:string
}
