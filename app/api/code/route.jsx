
// import { NextResponse } from "next/server";
// import OpenAI from 'openai';
// import { getAuth } from '@clerk/nextjs/server';


// // Ensure your OpenAI API key is set in your environment variables
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const openai = new OpenAIApi(configuration);
// export default async function POST(req){
//     try {
//         const { userId } = getAuth(req);
//         const body = await req.json();
//         const {messages} = body;


//         if(!userId){
//             return new NextResponse("Unauthorized",{status:401})
//         }

//         if(!configuration.apiKey){
//             return new NextResponse("OpenAI API Key not found",{status:500})
//         }

//         if(!messages){
//             return new NextResponse("Messages not found",{status:400})
//         }

//         const response = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: messages
//         })

//         return NextResponse.json(response.data.choices[0].message)
        
//     } catch (error) {
//         console.log("Error in conversation route: ", error)
//         return new NextResponse("error",{status:500})
//     }
// }



//---------------------------------------------------------------------------------------GPT-4-----------------------------------------

import { NextResponse } from "next/server";
import axios from 'axios';
import { getAuth } from '@clerk/nextjs/server';
import { increaseAppLimit,checkAppLimit } from "@/lib/api-limit";

// Ensure your RapidAPI key is set in your environment variables
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
    throw new Error("RapidAPI Key not found in environment variables");
}

const RAPIDAPI_URL = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
const RAPIDAPI_HOST = 'chatgpt-42.p.rapidapi.com';


export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messages) {
            return new NextResponse("Messages not found", { status: 400 });
        }

        const freeTrail = await checkAppLimit(req);

        if(!freeTrail){
            return new NextResponse("You have exceeded the free trial limit", { status: 403 });
        }

        const options = {
            method: 'POST',
            url: RAPIDAPI_URL,
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST,
                'Content-Type': 'application/json'
            },
            data: {
                messages: messages,
                system_prompt: 'You are a code generator.you must answer only in markdown code snippets.use code comments for explanations.',
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            }
        };

        await increaseAppLimit(req);
        
        const response = await axios.request(options);
        console.log("Request to RapidAPI CodeRoute: ", response);
        return NextResponse.json(response.data);

    } catch (error) {
        console.log("Error in code route: ", error);
        return new NextResponse("error", { status: 500 });
    }
}
