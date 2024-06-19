
import { NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import Replicate from "replicate";
import { increaseAppLimit,checkAppLimit } from "@/lib/api-limit";


const replicate = new Replicate({
    auth:process.env.REPLICATE_API_KEY,
})

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const body = await req.json();
        const { prompt } = body;

        

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Messages not found", { status: 400 });
        }

        const freeTrail = await checkAppLimit(req);

        if(!freeTrail){
            return new NextResponse("You have exceeded the free trial limit", { status: 403 });
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                fps: 24,
                model: "xl",
                width: 1024,
                height: 576,
                prompt: prompt,
                batch_size: 1,
                num_frames: 24,
                init_weight: 0.5,
                guidance_scale: 17.5,
                negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken",
                remove_watermark: false,
                num_inference_steps: 50
              }
            }
          );
         

          await increaseAppLimit(req);
        
        return NextResponse.json(response);

    } catch (error) {
        console.log("Error in music route: ", error);
        return new NextResponse("error", { status: 500 });
    }
}
