import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
        <Link href={'/'}>
            <span className={`${titleFont.className} antialiased font-bold text-amber-900`}>Zukka</span>
            <span className='font-bold'> | Shop </span>
            <span>&#169; {new Date().getFullYear()}</span>
        </Link>
        <Link href={'/'} className='mx-3'>
            Privacy & legal
        </Link>
        <Link href={'/'} className='mx-3'>
            Locationsa
        </Link>
    </div>
  )
}
