"use client";
// D:\Works\internship_at_SOB\SOB-Ecommerce\app\components\Products.tsx
import React, { useState, useEffect } from "react";
import Product from "./cards/ProductCard";
import axios from "axios";
import api from "@/api/api";

interface ProductData {
  id: number;
  product_id: number;
  is_active: number;
  product: {
    id: number;
    name: string;
    price?: number;
    image_url?: string;
  } & Record<string, unknown>; // ✅ flexible and ESLint-friendly
}


const Products = () => {
  const [products, setProducts] = useState<ProductData["product"][]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get<{ status: string; data: ProductData[] }>("/api/product");
      // Extract the nested product objects/
      const productList = res.data.data.map(item => item.product);
      setProducts(productList);
    }
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 mt-4 w-full gap-4 hide-scrollbar overflow-auto">
      {products.map((item) => (
        <Product
          key={item.id}
          title={item.name}
          price={item.price || 0} // fallback
          image={item.image_url || ""}
        />
      ))}
    </div>
  );
};

export default Products;
