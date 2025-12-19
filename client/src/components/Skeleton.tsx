import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="shrink-0 w-[300px] md:w-[400px] mx-5">
      <Skeleton className="aspect-[3/4] w-full mb-6" />
      <div className="flex justify-between items-start border-b border-border pb-2">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="border border-border p-8 text-center hover:bg-secondary/20 transition-colors">
      <Skeleton className="h-6 w-24 mx-auto mb-2" />
      <Skeleton className="h-3 w-16 mx-auto" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Skeleton className="absolute inset-0" />
    </div>
  );
}
