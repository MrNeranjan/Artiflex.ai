 
'use client'
import React,{useEffect,useState} from "react";
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import {getAppLimitCount} from "@/lib/api-limit";


export default function DashboardLayout({ children }) {

  // const count = await getAppLimitCount();
  // console.log("count is",count);

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
        <SideBar applimitcount={4} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

