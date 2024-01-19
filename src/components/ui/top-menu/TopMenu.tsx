'use client'
import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store";
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
    const openMenu = useUIStore( state => state.openSideMenu );
    return (
        <nav className="flex px-10 py-2 justify-between items-center w-full">
            <div >
                <Link href={'/'}>
                    <span className={`${titleFont.className} antialiased text-amber-900 font-bold text-2xl`}>ZUKKA</span>
                    <span className="font-bold text-xl"> | Shop</span>
                </Link>
            </div>
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all font-semibold hover:bg-gray-100" href={'/category/men'}>Men</Link>
                <Link className="m-2 p-2 rounded-md transition-all font-semibold hover:bg-gray-100" href={'/category/women'}>Women</Link>
                <Link className="m-2 p-2 rounded-md transition-all font-semibold hover:bg-gray-100" href={'/category/kid'}>Kids</Link>
                
            </div>
            <div className="flex items-center">
                <Link href={'/search'} className="mx-2">
                    <IoSearchOutline className="w-5 h-5"/>
                </Link>
                <Link href={'/cart'} className="mx-2">
                    <div className="relative">
                        <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-amber-900 text-white">3</span>
                        <IoCartOutline className="w-5 h-5"/>
                    </div>
                </Link>
                <button onClick={openMenu} className="m-2 p-2 rounded-md transition-all font-semibold hover:bg-gray-100">
                    Menu
                </button>
            </div>
        </nav>
    )
}
