import { AuthGuard } from "@nestjs/passport";
import { Injectable,ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const result = (await super.canActivate(context) as boolean)
        const request = context.switchToHttp().getRequest()
        await super.logIn(request)
        return result
    }
}