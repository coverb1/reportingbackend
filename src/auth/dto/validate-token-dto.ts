import { IsNotEmpty, IsString } from "class-validator";

export class validateToken{
    @IsNotEmpty()
    @IsString()
    toke!:string
}