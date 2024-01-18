'use client'
import { useState } from "react";
import { IoAddCircleOutline, IoAddOutline, IoRemoveCircleOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
    quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {

    const [count, setCount] = useState(quantity)
    const onQuantityChange = ( value: number ) => {
        if (count + value < 1) return
        setCount(count + value)
    }
    return (
        <div className="flex">
            <button onClick={() => onQuantityChange(-1)}>
                <IoRemoveOutline size={20}/>
            </button>
            <span className="w-20 mx-4 px-5 bg-gray-200 flex justify-center items-center rounded font-semibold">
                { count }
            </span>
            <button onClick={() => onQuantityChange(1)}>
                <IoAddOutline size={20}/>
            </button>
        </div>
    )
}
