import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Checkout from "./checkout/page";

export default function page() {
  return (
    <div>
      <SearchBar />
      <Categories />
      <Products />
    </div>
  );
}
