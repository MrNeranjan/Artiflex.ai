"use client";

import {useState} from "react";
import axios from "axios";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import toast from "react-hot-toast";

export default function CodePage() {

  const router = useRouter();
  const [messages, setMessages] = useState([]); // [ {role: "user", content: "Hello"}, {role: "ai", content: "Hi"}
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
      const userMessage = {
        role: "user", 
        content: values.prompt
      };
      const response = await axios.post("/api/code", {
        messages: [...messages, userMessage]

      });

      //formatting  the response message
      const responseMessage = {
        role: "ai", 
        content: response.data.result
      };


      setMessages((current)=>[...current,userMessage,responseMessage])
      form.reset();

    } catch (error) {

      if(error?.response?.status === 403){
        proModal.open();
      }else{
        toast.error("Failed to generate response. Please try again later.");
      }
     
    }finally{
      router.refresh();
    }



  };
  return (
    <div>
      <Heading
        title="Code Generation"
        description="This is Advanced AI Code Generation Modal."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        placeholder="Simple Python Code to Generate Fibonacci Series."
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
        {messages.length === 0 && !isLoading && (
          <Empty label="No Conversation Started."/>
        )}
          <div className="flex flex-col-reverse gap-y-4 mx-4 md:mx-8">
            {messages.map((message)=>(
              <div 
              key={message.content}
              className={cn("p-8 w-full  flex items-start gap-x-8 rounded-lg",
                message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
              )}
              >
                {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                <ReactMarkdown

                  components={{
                    pre:({node,...props})=>(
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props}/>
                      </div>
                    ),
                    code: ({node,...props})=>(
                      <code {...props} className="text-sm bg-black/10 p-1 rounded-lg"/>
                    )
                  }}

                  className="text-sm overflow-hidden leading-7"

                >
                  {message.content || " "}
                </ReactMarkdown>
              </div>
           ))}

          </div>
      </div>
    </div>
  );
}
