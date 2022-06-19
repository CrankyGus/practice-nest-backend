import { Body, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthSignUp } from "./dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prismaService:PrismaService,
        private config:ConfigService
    ){}
    hashData(data:string){
        return bcrypt.hash(data,10)
    }

    async signup(dto:AuthSignUp){
        
        const hash = await this.hashData(dto.password)
       
            const users = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash,
                   
                }
            })
        
    }
    signin(){
        return {msg: "Hello world"}
    }
}