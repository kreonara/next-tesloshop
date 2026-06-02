'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  onQuantity: (value: number) => void
}

const QuantitySelector = ({ quantity, onQuantity }: Props) => {
  // const [count, setCount] = useState(quantity)
  
  const onQuantityChanged = (value: number) => {
    if(quantity + value < 1) return
    onQuantity(quantity + value)
  }

  return (
    <div className="flex items-center">
      <button 
        // onClick={() => setCount(Math.max(1, count - 1))}
        onClick={() => onQuantityChanged(-1)}
        className="cursor-pointer"
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 py-1 bg-gray-200 text-center rounded">{quantity}</span>

      <button 
        // onClick={() => setCount(count + 1)}
        onClick={() => onQuantityChanged(+1)}
        className="cursor-pointer"
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}

export default QuantitySelector