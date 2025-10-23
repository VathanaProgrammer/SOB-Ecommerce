"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layouts/Header";
import ItemCard from "@/components/cards/ItemCard";
const Checkout = () => {
  const router = useRouter();

  const items = [
    {
      title: "Product 1",
      price: 25.99,
      qty: 2,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    },
    {
      title: "Product 2",
      price: 40.99,
      qty: 1,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    },
    {
      title: "Product 3",
      price: 15.99,
      qty: 3,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    },
  ];

  return (
    <section className="mt-4">
      <Header title="Checkout" />

      <main className="">
        <div className="mt-4 overflow-auto hide-scrollbar">
          <h1 className="main-text text-[22px] text-start font-semibold ">
            Summary Order
          </h1>
          <div className="flex flex-col gap-2 mt-4">
            {items.map((item, index) => (
              <ItemCard
                key={index}
                title={item.title}
                price={item.price}
                qty={item.qty}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h1 className="main-text text-[22px] text-start font-semibold ">
            Summary Order
          </h1>
          <div className="flex flex-col gap-2 mt-4">
            {items.map((item, index) => (
              <ItemCard
                key={index}
                title={item.title}
                price={item.price}
                qty={item.qty}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
