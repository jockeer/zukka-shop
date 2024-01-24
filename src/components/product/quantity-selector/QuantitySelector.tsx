'use client'
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    setQuantity: (quantity:number)=> void;
}

export const QuantitySelector = ({ quantity, setQuantity }: Props) => {

    const onValueChange = ( value: number ) => {
        if (quantity + value < 1) return
        setQuantity(quantity + value)
    }
    return (
        <div className="flex">
            <button onClick={() => onValueChange(-1)}>
                <IoRemoveOutline size={20}/>
            </button>
            <span className="w-20 mx-4 px-5 bg-gray-200 flex justify-center items-center rounded font-semibold">
                { quantity }
            </span>
            <button onClick={() => onValueChange(1)}>
                <IoAddOutline size={20}/>
            </button>
        </div>
    )
}
