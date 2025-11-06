"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, total } = useCart();

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="flex flex-col gap-3">
        {items.length === 0 && <p>Your cart is empty</p>}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border p-2 rounded">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p>
                ${item.price.toFixed(2)} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</h3>
    </section>
  );
};

export default Checkout;

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Header from "@/components/layouts/Header";
// import ItemCard from "@/components/cards/ItemCard";
// import ShippingStep from "@/components/ShippingStep";

// const Checkout = () => {
//   const router = useRouter();
//   const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
//   const savedAddresses = [
//   {
//     id: 1,
//     label: "Home",
//     line1: "123 Main St",
//     line2: "Apt 4B",
//     city: "Phnom Penh",
//     postal: "12000",
//   },
//   {
//     id: 2,
//     label: "Office",
//     line1: "456 Business Rd",
//     city: "Phnom Penh",
//     postal: "12001",
//   },
//   {
//     id: 3,
//     label: "Parent's House",
//     line1: "789 Old Street",
//     line2: "House 12",
//     city: "Siem Reap",
//     postal: "17000",
//   },
// ];

//   const items = [
//     {
//       title: "Product 1",
//       price: 25.99,
//       qty: 2,
//       image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
//     },
//     {
//       title: "Product 2",
//       price: 40.99,
//       qty: 1,
//       image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
//     },
//     {
//       title: "Product 3",
//       price: 15.99,
//       qty: 3,
//       image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
//     },
//   ];

//   const paymentMethods = [
//     {
//       name: "Visa",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
//     },
//     {
//       name: "MasterCard",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
//     },
//     {
//       name: "PayPal",
//       image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
//     },
//   ];
//     const handleNext = () => {
//     if (!selectedPayment) return;

//     // You can pass selected address via query if needed
//     // router.push(`/checkout/payment?address=${selected === 'current' ? 'current' : selected.id}`);
    
//     // Or just navigate to payment page
//     router.push("/checkout/review");
//   };

//   const renderPaymentDetails = (method: string) => {
//     switch (method) {
//       case "Visa":
//       case "MasterCard":
//         return (
//           <div className="mt-3 flex flex-col gap-3">
//             {/* Card Number */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder=" "
//                 className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
//               />
//               <label className="absolute left-3 top-1.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-blue-500 peer-focus:text-xs">
//                 Card Number
//               </label>
//             </div>

//             <div className="flex gap-3">
//               {/* Expiry */}
//               <div className="relative w-1/2">
//                 <input
//                   type="text"
//                   placeholder=" "
//                   className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
//                 />
//                 <label className="absolute left-3 top-1.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-blue-500 peer-focus:text-xs">
//                   MM/YY
//                 </label>
//               </div>

//               {/* CVV */}
//               <div className="relative w-1/2">
//                 <input
//                   type="text"
//                   placeholder=" "
//                   className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 text-gray-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
//                 />
//                 <label className="absolute left-3 top-1.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-blue-500 peer-focus:text-xs">
//                   CVV
//                 </label>
//               </div>
//             </div>
//           </div>
//         );
//       case "PayPal":
//         return (
//           <div className="mt-3 text-gray-700 text-sm">
//             You will be redirected to PayPal to complete your payment.
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <section className="mb-5">
//       <Header title="Checkout" />

//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">Order Summary</h2>
//         <div className="flex flex-col gap-3 mt-4">
//           {items.map((item, index) => (
//             <ItemCard
//               key={index}
//               title={item.title}
//               price={item.price}
//               qty={item.qty}
//               image={item.image}
//             />
//           ))}
//         </div>
//       </div>
//       <ShippingStep savedAddresses={savedAddresses} />
//     </section>
//   );
// };

// export default Checkout;
