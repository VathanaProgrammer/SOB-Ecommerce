"use client";

import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import { useState } from "react";

export default function ProductPage() { 
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
      <SearchBar onSearch={(value) => setSearchQuery(value)} />
      <Categories selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <Products selectedCategory={selectedCategory} searchQuery={searchQuery} />
    </div>
  );
}
