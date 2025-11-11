// app/components/ui/ProductSkeleton.tsx
import React from "react";
import Skeleton from "./Skeleton";

const ProductSkeleton: React.FC = () => (
  <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
    <Skeleton className="h-32 w-full rounded-md" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-8 w-full rounded-md mt-2" />
  </div>
);

export default ProductSkeleton;
