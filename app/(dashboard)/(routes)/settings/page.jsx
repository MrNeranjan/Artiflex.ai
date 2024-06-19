
import {Settings} from 'lucide-react';
import Heading from "@/components/Heading";
import { Button } from '@/components/ui/button';


const SettingsPage = () => {
    return ( 
        <div>
            <Heading 
                title="Settings" 
                icon={Settings} 
                description="Manage your account settings and preferences."
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
                />
            <div className='px-4 lg:px-8 space-y-4'>
                <div className='text muted-foreground text-sm'>
                    You are currently use free plan. Upgrade to premium plan to unlock more features.
                </div>
                <Button variant="premium">
                    Upgrade to Premium
                </Button>
            </div>
        </div>

     );
}
 
export default SettingsPage;