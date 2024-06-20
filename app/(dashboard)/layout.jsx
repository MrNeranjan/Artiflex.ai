
import { Navbar } from "@/components/navbar";
import  SideBar  from "./../../components/SideBar";
import {getAppLimitCount} from "@/lib/api-limit";




const DashboardLayout = async({children})=>{
  
  const count = await getAppLimitCount();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-gray-900">
        <SideBar applimitcount={count}/>
      </div>
      <main className="md:pl-72">
        <Navbar applimitcount={count}/>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
