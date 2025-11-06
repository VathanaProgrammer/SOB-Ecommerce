"use client";
import React, { useEffect, useState } from "react";
import Product from "./cards/ProductCard";
import { useCart } from "@/context/CartContext";
import api from "@/api/api";

export interface ProductData {
  id: number;
  is_active: number;
  product_id: number;
  product: {
    id: number;
    name: string;
    price: string;
    image_url?: string;
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const { add } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const res = await api.get<{ status: string; data: ProductData[] }>("/product/all");
      setProducts(res.data.data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((item) => (
        <Product
          key={item.product.id}
          id={item.product.id}
          title={item.product.name}
          price={Number(item.product.price)}
          image={item.product.image_url}
          onAdd={add}
        />
      ))}
    </div>
  );
};

export default Products;
