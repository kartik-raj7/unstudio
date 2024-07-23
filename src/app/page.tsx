"use client"
import Hero from "@/components/Hero/Hero";
import { axiosPost } from "@/services/Api/axios";
import { apiRouter } from "@/services/apiRouter";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { toast, ToastContainer } from "react-toastify";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const authUser = async () => {
    const authenticate = apiRouter.AUTH;
    const data={
      name:session?.user?.name,
      email:session?.user?.email,
    }
    const type = 'auth'
    try {
      const AuthResponse:any = await axiosPost(
        authenticate,
        data,
        "application/json",
        null,
        type,
      );
      if (AuthResponse.token) {
        const data = {
          token:AuthResponse.token,
          userId:AuthResponse.userId,
        }
        Cookies.set('user', JSON.stringify(data));
          router.replace('/homepage');
          toast.success("Logged in successfully");
      } else {
        signOut();
        Cookies.remove('user');
      }
    } catch (error) {
      signOut();
      Cookies.remove('user');
    }
  };
  useEffect(() => {
    if (session&&session.user) {
      authUser()
    }
    else{
      router.replace('/')
    }
  }, [session]);
  return (
<div className="bg-hero-pattern bg-cover bg-center h-screen">
    <ToastContainer/>
     <Hero/>
     </div>
  );
}
