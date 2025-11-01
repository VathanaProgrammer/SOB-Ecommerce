import React from "react";
import Image from "next/image";

type ProductProps = {
  title?: string;
  price?: number;
  discount?: number;
  image?: string;
};

const Product: React.FC<ProductProps> = ({ title, price, discount, image }) => {
  const formatPrice = (value?: number | string) => {
    if (value === undefined || value === null) return "";

    // Convert to number first
    const num = Number(value);

    if (isNaN(num)) return ""; // fallback if conversion fails

    const formatted = num.toFixed(2);
    return formatted.endsWith(".00") ? formatted.slice(0, -3) : formatted;
  };

  return (
    <div className="w-full rounded-[10px] flex flex-col bg-white shadow-md hover:shadow-md transition overflow-hidden">
      <div className="relative w-full h-[150px] bg-blue-900">
        <Image
          src={image || ""}
          alt={title || ""}
          fill
          unoptimized={true}
          className="object-cover bg"
        />
      </div>

      <div className="flex flex-row p-2">
        <div>
          <h1 className="font-medium text-[16px] text-gray-800 truncate">
            {title}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold text-[14px] text-gray-900">
              ${formatPrice(price)}
            </p>
            {discount && (
              <p className="text-[12px] text-gray-500 line-through">
                ${discount}
              </p>
            )}
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
