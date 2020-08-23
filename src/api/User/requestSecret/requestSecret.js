import { generateSecret } from "../../../utils";

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default{
    Mutation:{
        requestSecret: async(_,args)=>{
            const{email} = args;
            const secret = generateSecret();
            console.log(secret)
            try{
                await prisma.user.update({
                    data:{loginSecret}, 
                    where: { email } 
                })
                return true
            }catch{
                return false
            }
        }
    }
}