"use client";
import React, { useState } from "react";
import Image from "next/image";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  image?: string;
  onAdd?: (
    product: {
      id: number;
      title: string;
      price: number;
      image?: string;
    },
    qty: number
  ) => void;
};

const Product: React.FC<ProductProps> = ({ id, title, price, image, onAdd }) => {
  const [qty, setQty] = useState(0);

  // ✅ Extract only the filename (e.g. "1761268367_images-1.jpg")
  const imageFile = image ? image.split("/").pop() : undefined;

  const handleIncrement = () => {
    const newQty = qty + 1;
    setQty(newQty);
    // ✅ Pass only the filename
    onAdd?.({ id, title, price, image: imageFile }, 1);
  };

  const handleDecrement = () => {
    if (qty === 0) return;
    const newQty = qty - 1;
    setQty(newQty);
    // ✅ Pass only the filename
    onAdd?.({ id, title, price, image: imageFile }, -1);
  };

  const displayImage =
    image && image.trim() !== ""
      ? image
      : "/images/default-product.png"; // fallback image in /public/images/

  return (
    <div className="w-full rounded-xl bg-gray-50 border border-gray-200 shadow-md flex flex-col overflow-hidden transition hover:shadow-lg">
      {/* Product Image */}
      <div className="relative w-full h-44">
        <Image
          src={displayImage}
          alt={title}
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col flex-1">
        <h2 className="font-semibold text-gray-800 text-sm truncate">{title}</h2>
        <p className="text-gray-900 font-bold text-base mt-1">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between px-3 pb-3">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
        >
          -
        </button>
        <span className="text-gray-800 font-semibold">{qty}</span>
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded hover:bg-blue-700 text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
