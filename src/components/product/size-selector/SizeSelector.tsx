import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];
    onSizeSelected: (size : Size) => void;
}
export const SizeSelector = ({ selectedSize, availableSizes, onSizeSelected }: Props ) => {
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Available sizes</h3>
        <div className="flex flex-wrap">
            {availableSizes.map( size => (
                <button key={size}
                    onClick={()=> onSizeSelected(size)}
                    className={
                        clsx(
                            "mx-2 px-2 hover:underline text-lg",
                            {
                                'bg-amber-800 text-white rounded-sm': size === selectedSize
                            }
                        )
                    }>
                    {size }
                </button>
            ))}
        </div>
    </div>
  )
}
