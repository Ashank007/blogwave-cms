"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@/utils/animations"
import { ReactNode, useEffect, useState } from "react"
import { Tooltip } from "@chakra-ui/react"

interface Props {
  href: string
  children: ReactNode
  label:string
  open:boolean
}

const TransitionLink = ({ href, children,label, open }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    setisOpen(false)
    if (pathname !== href) {
      animatePageOut(href, router)
    }
  }
  const [isOpen, setisOpen] = useState(false)
  useEffect(()=>{
    setisOpen(open);
  },[open])
  return (
    <Tooltip zIndex={10} aria-label="a tooltip" padding={3} label={label} bg='red.300' rounded={'full'} placement="top" isOpen={isOpen} hasArrow arrowSize={10}>

    <button className="p-0"
      onClick={handleClick}
      >
      {children}
    </button>
    </ Tooltip>
  )
}

export default TransitionLink