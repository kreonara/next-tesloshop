import { montserratAlt } from "@/src/config/fonts"
import Image from "next/image"
import Link from "next/link"

const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${montserratAlt.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Página no encontrada</p>
        <p>
          <span>Puedes regresar al </span>
          <Link
            href={"/"}
            className="font-bold hover:underline transition-all"
          >
            inicio
          </Link>
        </p>
      </div>

      <div>
        <Image 
          src={"/imgs/starman_750x750.png"}
          alt="Starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  )
}

export default PageNotFound