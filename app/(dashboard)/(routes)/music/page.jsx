"use client";

import {useState} from "react";
import axios from "axios";
import Heading from "@/components/Heading";
import {  LucideHeartHandshake, MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";


export default function MusicPage() {

  const router = useRouter();
  const [music, setMusic] = useState(); 
  const proModal =useProModal();

  //MAX TOKENS =256
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);
      
      form.reset();

    } catch (error) {

      if(error?.response?.status === 403){
        proModal.open();
      }
      console.log("Error in music page: ", error);
    }finally{
      router.refresh();
    }



  };
  return (
<div>
      <Heading
        title="Music Generation"
        description="This is Advanced AI Music Generation Modal."
        icon={MusicIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >

            <FormField 
              name="prompt"
              render={({field})=>(
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Violin music"
                        {...field}
                      />
                  </FormControl>
                </FormItem>
              )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader/>
          </div>
        
        )}
        {!music && !isLoading && (
          <Empty label="No Music Generated."/>
        )}
        {music && (
          <audio controls className="w-full px-4 md:px-8 mt-8 ">
            <source src={music}/>
          </audio>
        )}
      </div>
    </div>
  );
}
