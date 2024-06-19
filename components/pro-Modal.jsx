'use client'

import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { ArrowRight, MessageSquare,ImageIcon,VideoIcon,Music,Code, Check, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools =[
    {
      label: 'Conversation',
      icon: MessageSquare,
      color:"text-violet-500",
      bgColor:"bg-violet-500/10",
      href: '/conversation',
    },
    {
      label: 'Image Generation',
      href: '/image',
      icon: ImageIcon,
      color: 'text-pink-700',
      bgColor:"bg-pink-700/10",
    },
    {
      label: 'Video Generation',
      href: '/video',
      icon: VideoIcon,
      color: 'text-orange-700',
      bgColor:"bg-orange-700/10",
    },
  
    {
      label: 'Music Generation',
      href: '/music',
      icon: Music,
      color: 'text-emerald-700',
      bgColor:"bg-emerald-700/10",
    },
    {
      label: 'Code Generation',
      href: '/code',
      icon: Code,
      color: 'text-green-700',
      bgColor:"bg-green-700/10",
    },
    
  ]

export default function ProModal() {
    const proModal = useProModal();

    return(
        
            <Dialog open={proModal.isOpen} onOpenChange={proModal.close}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <div className="flex items-center gap-x-2 font-bold py-1">
                                Upgrade to ArtiflexAI 
                                <Badge className="uppercase text-sm py-1" variant="premium">
                                    Premium
                                </Badge>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                            {tools.map((tool) => (
                                <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                                    <div className="flex items-center gap-x-4 ">
                                        <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6",tool.color)}/>
                                        </div>
                                        <div className="font-semibold text-sm">
                                            {tool.label}
                                        </div>
                                        
                                    </div>
                                    <Check className="text-primary w-5 h-5"/>
                                </Card>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="premium" className= "focus:border-offset-0 w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white"/>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
       
    )
}