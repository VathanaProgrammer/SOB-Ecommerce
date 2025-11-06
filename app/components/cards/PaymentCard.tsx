"use client";
import React, { useState } from "react";
import Image from "next/image";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  image?: string;
  onAdd?: (product: { id: number; title: string; price: number }, qty: number) => void;
};

const Product: React.FC<ProductProps> = ({ id, title, price, image, onAdd }) => {
  const [qty, setQty] = useState(0);

  const handleIncrement = () => {
    const newQty = qty + 1;
    setQty(newQty);
    onAdd?.({ id, title, price }, 1);
  };

  const handleDecrement = () => {
    if (qty === 0) return;
    const newQty = qty - 1;
    setQty(newQty);
    onAdd?.({ id, title, price }, -1);
  };

  return (
    <div className="w-full rounded-lg bg-white shadow p-2 flex flex-col">
      <div className="relative w-full h-40">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover rounded-lg" unoptimized />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <h2 className="mt-2 font-medium text-gray-800">{title}</h2>
      <p className="text-gray-900 font-semibold">${price.toFixed(2)}</p>

      <div className="flex items-center gap-2 mt-2">
        <button onClick={handleDecrement} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
          -
        </button>
        <span>{qty}</span>
        <button onClick={handleIncrement} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
