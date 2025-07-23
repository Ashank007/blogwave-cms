"use client"

import { animatePageIn } from "@/utils/animations"
import { Image } from "@chakra-ui/react";
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    if(pathname!='/'){
      animatePageIn(true)
    }
    else{
      animatePageIn(false)
    }
  }, [pathname])
  return (
    <div className="w-screen">
      <div
        id="banner-1"
        className="w-screen bg-neutral-950 z-50 fixed top-0 left-0 h-1/4"
      />
      <div
        id="banner-2"
        className="w-screen bg-neutral-950 z-50 fixed top-1/4 left-0 h-1/4 flex justify-center items-end"
      >
        <Image src='/brand1.png' alt='brand' width={['70%','40%']} height={'80%'} />
      </div>
      <div
        id="banner-3"
        className="w-screen bg-neutral-950 z-50 fixed top-1/2 left-0 h-1/4 flex justify-center items-start"
      >
        <Image src='/brand2.png' alt='brand' width={['70%','40%']} height={'80%'}/>
      </div>
      <div
        id="banner-4"
        className="w-screen bg-neutral-950 z-50 fixed top-3/4 left-0 h-1/4"
      />
      {children}
    </div>
  )
}