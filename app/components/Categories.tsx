import React from "react";

const Categories = () => {
  return (
    <section className="flex overflow-auto hide-scrollbar gap-4 flex-row items-cener mt-4">
      <div className="px-4 p-2 text-[16px] max-h-[50px] font-medium text-white rounded-[5px] bg-gray-500">
        All
      </div>
      <div className="px-4 p-2 text-[16px] max-h-[50px] font-medium text-white rounded-[5px] bg-gray-500">
        Food
      </div>
      <div className="px-4 p-2 text-[16px] max-h-[50px] font-medium text-white rounded-[5px] bg-gray-500">
        Clothes
      </div>
      <div className="px-4 p-2 text-[16px] max-h-[50px] font-medium text-white rounded-[5px] bg-gray-500">
        Laptop
      </div>
      <div className="px-4 p-2 text-[16px] max-h-[50px] font-medium text-white rounded-[5px] bg-gray-500">
        Monitor
      </div>
    </section>
  );
};

export default Categories;
