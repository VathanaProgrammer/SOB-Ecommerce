"use client";
import React, { useEffect, useState } from "react";
import Product from "./cards/ProductCard";
import { useCheckout } from "@/context/CheckOutContext";
import api from "@/api/api";
import toast from "react-hot-toast";
import { useLoading } from "@/context/LoadingContext";

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
  const { addToCart } = useCheckout();
  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await api.get<{ status: string; data: ProductData[] }>("/product/all");
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [setLoading]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {products.map((item) => (
        <Product
          key={item.product.id}
          id={item.product.id}
          title={item.product.name}
          price={Number(item.product.price)}
          image={item.product.image_url}
          onAdd={addToCart}
        />
      ))}
    </div>
  );
};

export default Products;
