import { montserratAlt } from "@/src/config/fonts"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

const Title = ({ title, className, subtitle } : Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${montserratAlt.className} antialiased text-4xl font-semibold my-7`}>
        {title}
      </h1>

      {
        subtitle && (
          <h3 className="text-xl mb-5">{subtitle}</h3>
        )
      }
    </div>
  )
}

export default Title