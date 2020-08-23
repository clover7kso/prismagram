const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default{
    Mutation : {
        createAccount: async(_,args) =>{
            const {userName, email, firstName="", lastName="", bio=""}=args;
            
            const user = await prisma.user.create({
                data:{
                    userName:userName, 
                    email:email,
                    firstName:firstName ,
                    lastName:lastName,
                    bio:bio
                }
            });

            return user;
        }
    }
}