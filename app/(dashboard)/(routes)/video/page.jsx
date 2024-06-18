"use client";

import {useState} from "react";
import axios from "axios";
import Heading from "@/components/Heading";
import {  VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";


export default function VideoPage() {

  const router = useRouter();
  const [video, setVideo] = useState(); 

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

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);

      form.reset();

    } catch (error) {

      // TODO HANDLE PRO
      console.log("Error in music page: ", error);
    }finally{
      router.refresh();
    }



  };
  return (
<div>
      <Heading
        title="Video Generation"
        description="This is Advanced AI Video Generation Modal."
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        placeholder="A horse running in the field"
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
        {!video && !isLoading && (
          <Empty label="No Video Generated."/>
        )}
        {video && (
          <video controls  className="w-full px-4 md:px-8 mt-8 aspect-video rounded-lg border bg-black">
            <source src={video}/>
          </video>
        )}
      </div>
    </div>
  );
}
