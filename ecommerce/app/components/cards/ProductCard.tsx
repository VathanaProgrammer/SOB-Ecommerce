import React from "react";
import Image from "next/image";

type ProductProps = {
  title: string;
  price: number;
  discount: number;
  image: string;
};

const Product: React.FC<ProductProps> = ({ title, price, discount, image }) => {
  return (
    <div  className="w-[170px] rounded-[10px] flex flex-col bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="relative w-full h-[150px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-row p-2">
        <div>
          <h1 className="font-medium text-[16px] text-gray-800 truncate">
            {title}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold text-[14px] text-gray-900">${price}</p>
            <p className="text-[12px] text-gray-500 line-through">
              ${discount}
            </p>
          </div>
        </div>
        <div className="h-full w-[40px] rounded-[5px] bg-gray-500 ms-auto">
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default Product;
