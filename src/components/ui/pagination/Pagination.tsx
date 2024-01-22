'use client'
import { generatePagination } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"


interface Props {
    totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN( +pageString) ? 1 : + pageString;

    const allPages = generatePagination(currentPage, totalPages);

    if (currentPage < 1) {
        redirect(pathName)
    }

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams );

        if (pageNumber === '...') return `${ pathName }?${ params.toString() }`
        if (+pageNumber <= 0) return `${ pathName }`;
        if (+pageNumber > totalPages) return `${ pathName }?${ params.toString() }`
        params.set('page', pageNumber.toString());
        return `${ pathName }?${params.toString()}`;
    }

    return (
        <div className="flex text-center justify-center mb-32 mt-10">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none items-center">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl( currentPage - 1)} aria-disabled="true">
                            <IoChevronBackOutline />
                        </Link>
                    </li>

                    {allPages.map( (page, i) => (
                        <li key={page + '-' + i} className="page-item">
                            <Link className={
                                clsx("page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",{
                                    'bg-amber-900 shadow-md text-white font-bold hover:bg-amber-700 hover:text-white': page === currentPage
                                })
                            }
                            href={createPageUrl(page)}>
                                {page}
                            </Link>
                        </li>

                    ))}


                   

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl( currentPage + 1)}>
                            <IoChevronForwardOutline />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
