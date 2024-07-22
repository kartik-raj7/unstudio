"use client"
import Hero from "@/components/Hero/Hero";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log('here session')
    if (session&&session.user) {
      //if local storage doesnt have the jwt token we need save token in the local storage
      //otherwise simply redirect to homepage 
      localStorage.setItem('userSession', JSON.stringify(session));
      router.replace('/homepage');
    }
  }, [session]);
  return (
<div className="bg-hero-pattern bg-cover bg-center h-screen">
     <Hero/>
     </div>
  );
}
