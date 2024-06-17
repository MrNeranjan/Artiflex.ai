"use client";

import {useState} from "react";
import axios from "axios";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

export default function ConversationPage() {

  const router = useRouter();
  const [messages, setMessages] = useState([]); // [ {role: "user", content: "Hello"}, {role: "ai", content: "Hi"}

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
      const response = await axios.post("/api/conversation", {
        messages: [...messages, userMessage]

      });

      //formatting  the response message
      const responseMessage = {
        role: "ai", 
        content: response.data.result
      };


      console.log("Response from RapidAPI ConversationPage: ", responseMessage);
      setMessages((current)=>[...current,userMessage,responseMessage])
      form.reset();

    } catch (error) {

      // TODO HANDLE PRO
      console.log("Error in conversation page: ", error);
    }finally{
      router.refresh();
    }



  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="This is Advanced AI Conversation Modal."
        icon={MessageSquare}
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
                        placeholder="How do I calculate the radius of a circle?"
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
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message)=>(
              <div key={message.content}>
                  {message.content}
              </div>
           ))}

          </div>
      </div>
    </div>
  );
}
