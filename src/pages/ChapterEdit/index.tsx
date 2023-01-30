import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

export default function ChapterEdit () {
  const [value, setValue] = useState('')
  return (
    <ReactQuill theme="bubble" value={value} onChange={setValue} />
  )
}
