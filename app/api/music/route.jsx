
import { NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import Replicate from "replicate";


const replicate = new Replicate({
    auth:process.env.REPLICATE_API_KEY,
})

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const body = await req.json();
        const { prompt } = body;

        console.log("request body in route: ", body)

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Messages not found", { status: 400 });
        }

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                alpha: 0.5,
                prompt_a: prompt,
                prompt_b: "90's rap",
                denoising: 0.75,
                seed_image_id: "vibes",
                num_inference_steps: 50
              }
            }
          ); 

        console.log("response from replicate: ", response);
        
        return NextResponse.json(response);

    } catch (error) {
        console.log("Error in music route: ", error);
        return new NextResponse("error", { status: 500 });
    }
}
