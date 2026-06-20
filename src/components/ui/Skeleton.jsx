// Premium shimmer effect using Tailwind tokens
export const ProductSkeleton = () => (
  <div className="w-full aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden p-6 flex flex-col justify-between animate-pulse">
    <div className="w-2/3 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
    <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800 rounded-xl my-4" />
    <div className="flex justify-between items-center">
      <div className="w-1/3 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
      <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
    </div>
  </div>
);