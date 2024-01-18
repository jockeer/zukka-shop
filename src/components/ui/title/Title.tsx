import { titleFont } from '@/config/fonts';
import React from 'react'

interface Props {
    title: string;
    spanTitle?: string;
    subtitle?: string;
    className?: string;
}
export const Title = ({ title, spanTitle, subtitle, className }: Props ) => {
  return (
    <div className={`mt-3 ${className}`}>
        <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-7 capitalize `}>
          {title} {spanTitle && <span className='text-amber-900'>{spanTitle}</span>} 
        </h1>

        {subtitle && (
            <h3 className='text-xl mb-5'>{subtitle}</h3>
        )}
    </div>
  )
}
