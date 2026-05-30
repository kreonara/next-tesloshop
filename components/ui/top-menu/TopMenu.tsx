'use client'

import { montserratAlt } from "@/src/config/fonts"
import { useUIStore } from "@/src/store/ui/ui-store"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

const TopMenu = () => {
    const openMenu = useUIStore(state => state.openSideMenu)
  
  return (
    <nav className="flex px-5 justify-between items-center w-full">

      {/* LOGO */}
      <div>
        <Link
          href={"/"}
        >
          <span className={`${montserratAlt.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/men"}
        >
          Hombres
        </Link>
        
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/women"}
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/kid"}
        >
          Niños
        
        </Link>
      </div>

      {/* SEARCH, CART, MENU */}
      <div className="flex items-center">
        <Link href={"/search"} className="mx-2" >
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={"/cart"} className="mx-2" >
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  )
}

export default TopMenu