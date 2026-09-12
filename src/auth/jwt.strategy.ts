import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authaconstants } from "./auth.constants.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authaconstants.secrete
    });
  }

async validate(palyload:any){
  const namePart=palyload.email.split('@')[0]
  const lettersOnly=namePart.match(/^[a-zA-Z]+/)
  const firstName = lettersOnly ? lettersOnly[0] : namePart;
  const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    return{
      userId: palyload.sub,
      email: palyload.email,
      name: capitalized
    }
}
}
// Main job of JwtStrategy

// reads token
// verifies token
// checks secret
// allows or denies access


// User sends JWT token
//    ↓
// JwtGuard checks token
//    ↓
// JwtStrategy validates token
//    ↓
// validate() returns user data
//    ↓
// NestJS attaches it to request.user
//    ↓
// Controller reads request.user 


//  mainly this chekcks what inside the token