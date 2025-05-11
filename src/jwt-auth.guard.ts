import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){
    handleRequest( err, user, info){
        if(err|| info){
            throw err||new UnauthorizedException();
        }
        return user
    }
}