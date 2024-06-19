import LandingContent from "@/components/LandingContent"
import { LandingHero } from "@/components/LandingHero"
import { LandingNavbar } from "@/components/LandingNavbar"



function LandingPage() {
 
  return (
    <div>
      <LandingNavbar />
      <LandingHero/>
      <LandingContent/>
    </div>
  )
}

export default LandingPage