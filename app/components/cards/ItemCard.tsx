import React from "react";
import Image from "next/image";

type itemProps = {
  title: string;
  price?: number;
  qty?: number;
  image: string;
};

const ItemCard:React.FC<itemProps>= ({ title, price, qty, image }) => {
  return (
    <div className="p-2 flex flex-row justify-between bg-gray-200 rounded-[5px]" >
      <div className="flex flex-row gap-2">
        <Image src={image} alt={title} width={100} height={100} className="h-[58px] w-[58px] object-cover" />
        <div className="flex flex-col">
            <h1 className="main-text text-[20px] font-semibold">{title}</h1>
            <h1 className="main-text text-[24px] font-semibold">${price}</h1>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="main-text text-[20px] font-medium">Quntity: {qty}</h1>
        <button className="bg-gray-500 h-[30px] w-[100px] rounded-[5px]"></button>
      </div>
    </div>
  );
};

export default ItemCard;
