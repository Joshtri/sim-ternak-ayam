/**
 * DetailCardSkeleton Component
 * Loading skeleton for DetailCard
 */

import { Card as HeroCard, CardBody, Skeleton } from "@heroui/react";

interface DetailCardSkeletonProps {
  sections?: number; // Number of sections to display (default: 2)
  itemsPerSection?: number; // Number of items per section (default: 4)
  columns?: 1 | 2 | 3; // Grid columns (default: 2)
}

export function DetailCardSkeleton({
  sections = 2,
  itemsPerSection = 4,
  columns = 2,
}: DetailCardSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <HeroCard key={sectionIndex} shadow="sm">
          <CardBody className="gap-6">
            {/* Section Header Skeleton */}
            <div className="flex items-center gap-3 pb-2 border-b border-default-200">
              <Skeleton className="w-6 h-6 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/4 rounded-lg" />
                <Skeleton className="h-3 w-1/3 rounded-lg" />
              </div>
            </div>

            {/* Detail Items Grid Skeleton */}
            <div
              className={`grid gap-4 ${
                columns === 1
                  ? "grid-cols-1"
                  : columns === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {Array.from({ length: itemsPerSection }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-1/3 rounded-lg" />
                  <Skeleton className="h-4 w-2/3 rounded-lg" />
                </div>
              ))}
            </div>
          </CardBody>
        </HeroCard>
      ))}
    </div>
  );
}
