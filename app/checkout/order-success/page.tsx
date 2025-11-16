"use client";
import { useSearchParams } from "next/navigation";
import Icon from '@/components/Icon';

const page = () => {
  const params = useSearchParams();
  const telegramLink = params.get("telegram"); // <-- this is your unique link

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="mb-4">
        <Icon
          icon="icon-park-solid:success"
          width={48}
          height={48}
          style={{ color: "#22ea00" }}
        />
      </div>
      <h3 className="text-2xl font-bold mb-2">
        Your order is made!
      </h3>
      <p className="text-center text-sm font-medium text-gray-600 max-w-sm mb-6">
        Thank you for your purchase! Your online order has been successfully placed,
        and we will process it as quickly as possible to get it delivered to you.
      </p>

      <div className="flex gap-4">
        {/* Go Home Button */}
        <a href="/" className="px-6 py-2 bg-gray-200 rounded-lg">Home</a>

        {/* Track Order via Telegram Button */}
        {telegramLink && (
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Track on Telegram
          </a>
        )}
      </div>
    </div>
  );
};

export default page;
