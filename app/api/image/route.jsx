
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

// Ensure your RapidAPI key is set in your environment variables
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
    throw new Error("RapidAPI Key not found in environment variables");
}

const RAPIDAPI_URL = 'https://chatgpt-42.p.rapidapi.com/texttoimage';
const RAPIDAPI_HOST = 'chatgpt-42.p.rapidapi.com';

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const body = await req.json();
        const { amount,prompt,resolution } = body;

        

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!amount) {
            return new NextResponse("amount not found", { status: 400 });
        }
        if (!prompt) {
            return new NextResponse("prompt not found", { status: 400 });
        }
        if (!resolution) {
            return new NextResponse("resolution not found", { status: 400 });
        }

        let dimensions = resolution.split('x');
        
        
        const options = {
            method: 'POST',
            url: RAPIDAPI_URL,
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST,
                'Content-Type': 'application/json'
            },
            data: {
                text: prompt,
                width: dimensions[0],
                height: dimensions[1],
            }
        };

        const response = await axios.request(options);
        return NextResponse.json(response.data);

    } catch (error) {
        console.log("Error in image route: ", error);
        return new NextResponse("error", { status: 500 });
    }
}
