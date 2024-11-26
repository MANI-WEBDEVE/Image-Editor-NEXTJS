"use client"
import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import axios, { AxiosError } from 'axios'
import { Eye, EyeClosed , Loader } from 'lucide-react'
// import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface FormDataSignIn {
    
    email: string | undefined;
    password: string | undefined;
  }
  
  interface ApiErrorResponse {
    message?: string;
    error?: string;
  }
  


const page = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<FormDataSignIn | null>();
    const [togglePassword, setTogglePassword] = useState<boolean>(false);
    const [loadingSubmitForm, setLoadingSubmitForm] = useState<boolean>(false);


    
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    } as FormDataSignIn);
  };

  const handleSubmitForm = async () => {
    try {
      setLoadingSubmitForm(true);
      const response = await axios.post("/api/login", formData);
      if (response.status === 200) {
        toast.success(response.data.message, {position: "top-right"});
        router.push("/dashboard")
      }
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      toast.error(errorMessage, {position: "top-right"})
      console.log("error", errorMessage);
    } finally {
      setLoadingSubmitForm(false);
    }
  };


  return (
    <>
     <section className="w-full h-screen bg-black grid md:grid-cols-2 relative overflow-hidden">
        <div className="w-full h-screen hidden md:block">
          <Image
            src={
              "https://images.unsplash.com/photo-1595364397663-fca4f075d796?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"sign-in-image"}
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute top-10 right-[20rem] w-[200px] h-[200px] bg-blue-700  rounded-full blur-[184px] animate-pulse"></div>
        <div className="absolute bottom-10 -right-2 w-[200px] h-[200px] bg-blue-700  rounded-full blur-[184px] animate-pulse overflow-hidden"></div>
        <div className="flex flex-col  gap-6 items-center justify-center w-full h-full">
          <h1 className="text-4xl font-bold uppercase text-white">
            <span className="text-blue-500 font-thin">Log</span> In
          </h1>
          <div className=" w-1/2 flex  flex-col items-center justify-center gap-4 ">
            
            <Input
              className="py-5 pr-10 pl-3 border-[1px] border-blue-600 z-[20]"
              placeholder="Enter email"
              type="email"
              name="email"
              onChange={handleChangeInput}
            />
            <div className="relative w-full">
              <Input
                className="py-5 pr-20 md:pr-28 pl-3 border-[1px] border-blue-600 z-[20]"
                placeholder="Enter password"
                type={togglePassword ? "text" : "password"}
                name="password"
                onChange={handleChangeInput}
              />
              <div className="z-[20] cursor-pointer" onClick={() => setTogglePassword(!togglePassword)}>
                {togglePassword ? (
                  <>
                    <Eye className="absolute right-2 top-1/2 -translate-y-1/2" />
                  </>
                ) : (
                  <EyeClosed className="absolute right-2 top-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>
          </div>
          {loadingSubmitForm ? (
            <>
              <Button className="bg-blue-700 font-bold uppercase text-black py-5 px-7 text-md flex items-center gap-2" disabled>
                Sign In <Loader className="animate-spin" style={{ width: '24px', height: '24px' }} strokeWidth={2} />
              </Button>
            </>
          ) : (
            <>
              <div className=" z-[10]">
                <Button
                  className="bg-blue-600  hover:bg-blue-500 font-bold uppercase text-black py-5 px-7 text-md"
                  onClick={handleSubmitForm}
                >
                  Sign In
                </Button>
              </div>
            </>
          )}
            <div>
              <Link href={'/sign-in'}>
                <p className="text-xs text-blue-700">Don't have an account? Sign up</p>
              </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
