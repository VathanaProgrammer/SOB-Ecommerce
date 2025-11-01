import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

type PaymentCardProps = {
  name: string;
  image: string;
  selected?: boolean;
  onSelect?: () => void;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  name,
  image,
  selected = false,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between w-full p-3 rounded-xl border cursor-pointer transition
        ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain rounded-md"
          />
        </div>
        <p className="font-medium text-[15px] text-gray-800">{name}</p>
      </div>

      {selected ? (
        <Icon icon="mdi:check-circle" className="text-blue-600" width={26} />
      ) : (
        <Icon icon="mdi:checkbox-blank-circle-outline" className="text-gray-400" width={26} />
      )}
    </div>
  );
};

export default PaymentCard;
