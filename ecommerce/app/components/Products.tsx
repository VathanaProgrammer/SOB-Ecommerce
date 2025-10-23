import React from "react";
import Product from './cards/ProductCard'

const products = [
  {
    id: 1,
    title: "T-Shirt",
    price: 19.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 2,
    title: "Jeans",
    price: 39.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 3,
    title: "Sneakers",
    price: 59.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 4,
    title: "Jacket",
    price: 79.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 5,
    title: "Watch",
    price: 120.0,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 6,
    title: "Backpack",
    price: 49.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 7,
    title: "Sunglasses",
    price: 25.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
  {
    id: 8,
    title: "Cap",
    price: 15.99,
    discount: 0.99,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
];

const Products = () => {
  return (
    <div className="grid grid-cols-2 mt-4 w-full gap-4 hide-scrollbar overflow-auto">
      {products.map((item) => (
        <Product
          key={item.id}
          title={item.title}
          price={item.price}
          discount={item.discount}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Products;
