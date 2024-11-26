import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full px-10 py-6 flex items-center justify-between border-b border-gray-600/10'>
      <div className='text-2xl font-bold uppercase'>
        Image-EDIT
      </div>
      <div className='flex items-center gap-10'>
        <Link href={"#"}>Home</Link>
        <Link href={"#"}>About</Link>
        <Link href={"#"}>Work</Link>
        <Link href={"#"}>Contact</Link>
      </div>
    </div>
  )
}

export default Header
