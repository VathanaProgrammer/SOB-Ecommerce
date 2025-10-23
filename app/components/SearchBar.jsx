import Icon from "@/components/Icon";
import { ICONS } from "@/constants/icons";

const SearchBar = () => {
  return (
    <div className="relative w-full mt-4 rounded-[5px] bg-gray-500 h-[45px] flex items-center">
      <div className="absolute left-3">
        <Icon icon={ICONS.SEARCH} width={20} height={20} className="text-gray-200" />
      </div>
      <input
        type="search"
        placeholder="Search..."
        className="w-full h-full pl-10 pr-3 bg-gray-500 text-white rounded-[5px] focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
