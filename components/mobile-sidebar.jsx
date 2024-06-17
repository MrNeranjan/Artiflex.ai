"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet,SheetContent,SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";

export default function MobileSidebar() {
    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null
    }
    
  return (
    <Sheet>
        <SheetTrigger>
            <Button size="icon" variant="ghost" className="md:hidden">
                <Menu />
            </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SideBar/>
      </SheetContent>
    </Sheet>
  );
}
