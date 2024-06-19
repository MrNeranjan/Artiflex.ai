
import { getAuth } from "@clerk/nextjs/server";
import { useAuth } from "@clerk/nextjs";


import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from '@/constants';


export const increaseAppLimit = async(req)=>{

    const { userId } = getAuth(req);


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

export const checkAppLimit = async(req) =>{

    const { userId } = getAuth(req);

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

    
};


export const getAppLimitCount = async () =>{
    const { userId } = useAuth();
    console.log(userId);

    if(!userId){
        return 0;
    }

    const userAppLimit = await prismadb.UserLimit.findUnique({
        where:{
            userId
        }
    })

    if(!userAppLimit){
        return 0;
    }

    return userAppLimit.count;
}