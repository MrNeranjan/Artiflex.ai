import * as z from 'zod';

export const formSchema =z.object({
    prompt:z.string().min(1,{
        message:"Image Prompt is required"
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
});

export const amountOptions =[
    {
        label:"1 Photo",
        value:"1"
    },
    {
        label:"2 Photos",
        value:"2"
    },
    {
        label:"3 Photos",
        value:"3"
    },
    {
        label:"4 Photos",
        value:"4"
    },
    {
        label:"5 Photos",
        value:"5"
    }
];

export const resolutionOptions =[
    {
        label:"256x256",
        value:"256x256"
    },
    {
        label:"512x512",
        value:"512x512"
    },
    {
        label:"1024x1024",
        value:"1024x1024"
    }
]

