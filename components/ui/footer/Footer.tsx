import { montserratAlt } from "@/src/config/fonts"
import Link from "next/link"

const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link
        href={'/'}
      >
        <span className={`${montserratAlt.className} antialiased font-bold`}>Teslo </span>
        <span>| Shop </span>
        <span>Copyright {new Date().getFullYear()}</span>
      </Link>

      <Link href={'/'} className="mx-3">Privacidad & Legal</Link>
      
      <Link href={'/'} className="mx-3">Ubicaciones</Link>
    </div>
  )
}

export default Footer