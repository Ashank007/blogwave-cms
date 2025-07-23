import React from 'react'
import 'react-quill/dist/quill.bubble.css';
import '@/components/quill.css'
type BlogProps={
    html:string
}
const Blog:React.FC<BlogProps> = ({html}) => {
  return (
    <div className="ql-container ql-bubble bg-none overflow-x-hidden">

    <div className="ql-editor w-full"
    dangerouslySetInnerHTML={{ __html:html}}
    />
    </div>
  )
}

export default Blog