import UserProfile from '@/components/UserProfile'
import React from 'react'
type PageProps={
  params:{
      name:string
  }
}
const page:React.FC<PageProps> = ({params}) => {
  const {name}= params;
  return (
    <div>
      <UserProfile name={name}/>
    </div>
  )
}

export default page