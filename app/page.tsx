import ContactForm from "@/components/home/ContactForm"
import Dashboard from "@/components/home/Dashboard"
import Features from "@/components/home/Features"
import Hero from "@/components/home/Hero"
import Intro from "@/components/home/Intro"
import JoinCommunity from "@/components/home/JoinCommunity"
import Quote from "@/components/home/Quote"
import Testimonilals from "@/components/home/Testimonilals"
import UserProfiles from "@/components/home/UserProfiles"

import WorkFlow from "@/components/home/WorkFlow"

const page = () => {
    return (
        <div className="flex flex-col">
            <Hero/>
            {/* <Dashboard/> */}
            <Intro/>
            <Quote />
            <UserProfiles />
            <WorkFlow />
            {/* <Features /> */}
            <JoinCommunity/>
            <Testimonilals/>
            <ContactForm />
        </div>

    )
}

export default page
