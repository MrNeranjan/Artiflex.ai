
import auth from "@clerk/nextjs"
import prismadb from "./prismadb";
import MAX_FREE_COUNTS from "./constants";

export const increaseAppLimit = async()=>{
    const {userId} = auth();


    if(!userId){
        return;
    }

    const userAppLimit = await prismadb.UserLimit.findUnique({
        where:{
            userId
        }
    })

    if(userAppLimit){
        await prismadb.UserLimit.update({
            where:{
                userId:userId
            },
            data:{
                count: userAppLimit.count + 1
            }
        })
    }else{
        await prismadb.UserLimit.create({
            data:{
                userId:userId,
                count: 1
            }
        })
    }

} ;

export const checkAppLimit = async() =>{
    const {userId} = auth();

    if(!userId){
        return false;
    }

    const userAppLimit = await prismadb.UserLimit.findUnique({
        where:{
            userId
        }
    })

    if(!userAppLimit || userAppLimit.count < MAX_FREE_COUNTS){
        return true;
    }else{
        return false;
    }

    
}