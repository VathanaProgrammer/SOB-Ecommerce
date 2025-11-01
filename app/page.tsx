import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Icon from "./components/Icon";

export default function page() {
  return (
    <div>
      <SearchBar />
      <Categories />
      <Products />
    </div>
  );
}
