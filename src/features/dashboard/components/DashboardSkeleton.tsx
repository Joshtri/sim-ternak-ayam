import { Card } from "@/components/ui/Card";

interface DashboardSkeletonProps {
  variant?: "operator" | "petugas" | "pemilik";
}

/**
 * Loading skeleton for dashboard pages
 * Provides visual feedback while dashboard data is loading
 */
export function DashboardSkeleton({
  variant = "operator",
}: DashboardSkeletonProps) {
  // Skeleton shimmer animation
  const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

  if (variant === "petugas") {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <div className={`h-8 w-64 bg-default-200 rounded ${shimmer}`} />
          <div
            className={`h-4 w-96 bg-default-100 rounded mt-2 ${shimmer}`}
          />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div
                    className={`h-4 w-24 bg-default-200 rounded ${shimmer}`}
                  />
                  <div
                    className={`h-8 w-16 bg-default-200 rounded mt-2 ${shimmer}`}
                  />
                </div>
                <div
                  className={`w-8 h-8 bg-default-200 rounded-full ${shimmer}`}
                />
              </div>
              {i === 3 && (
                <div
                  className={`h-2 w-full bg-default-200 rounded-full mt-2 ${shimmer}`}
                />
              )}
            </Card>
          ))}
        </div>

        {/* My Kandangs Skeleton */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-6 h-6 bg-default-200 rounded ${shimmer}`} />
            <div className={`h-6 w-32 bg-default-200 rounded ${shimmer}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4 border">
                <div className={`h-6 w-32 bg-default-200 rounded ${shimmer}`} />
                <div className="mt-3 space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <div
                        className={`h-4 w-24 bg-default-100 rounded ${shimmer}`}
                      />
                      <div
                        className={`h-4 w-16 bg-default-100 rounded ${shimmer}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Performance Skeleton */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-6 h-6 bg-default-200 rounded ${shimmer}`} />
            <div className={`h-6 w-32 bg-default-200 rounded ${shimmer}`} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-center p-4 bg-default-50 rounded-lg">
                <div
                  className={`h-8 w-16 bg-default-200 rounded mx-auto ${shimmer}`}
                />
                <div
                  className={`h-3 w-full bg-default-100 rounded mt-2 ${shimmer}`}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (variant === "pemilik") {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div>
          <div className={`h-8 w-64 bg-default-200 rounded ${shimmer}`} />
          <div
            className={`h-4 w-96 bg-default-100 rounded mt-2 ${shimmer}`}
          />
        </div>

        {/* Business KPI Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[...Array(7)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="text-center">
                <div
                  className={`w-6 h-6 bg-default-200 rounded mx-auto ${shimmer}`}
                />
                <div
                  className={`h-6 w-16 bg-default-200 rounded mx-auto mt-2 ${shimmer}`}
                />
                <div
                  className={`h-3 w-full bg-default-100 rounded mt-2 ${shimmer}`}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Profitability Skeleton */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-6 h-6 bg-default-200 rounded ${shimmer}`} />
            <div className={`h-6 w-48 bg-default-200 rounded ${shimmer}`} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center p-4 bg-default-50 rounded-lg">
                <div
                  className={`h-4 w-24 bg-default-100 rounded mx-auto ${shimmer}`}
                />
                <div
                  className={`h-6 w-32 bg-default-200 rounded mx-auto mt-2 ${shimmer}`}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Comparison Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className={`h-5 w-48 bg-default-200 rounded mb-4 ${shimmer}`} />
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <div
                      className={`h-4 w-24 bg-default-100 rounded ${shimmer}`}
                    />
                    <div
                      className={`h-4 w-16 bg-default-100 rounded ${shimmer}`}
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Default: Operator variant
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <div className={`h-8 w-64 bg-default-200 rounded ${shimmer}`} />
        <div className={`h-4 w-96 bg-default-100 rounded mt-2 ${shimmer}`} />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`h-4 w-24 bg-default-200 rounded ${shimmer}`} />
                <div
                  className={`h-8 w-16 bg-default-200 rounded mt-2 ${shimmer}`}
                />
              </div>
              <div
                className={`w-8 h-8 bg-default-200 rounded-full ${shimmer}`}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Productivity Stats Skeleton */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-6 h-6 bg-default-200 rounded ${shimmer}`} />
              <div className={`h-6 w-48 bg-default-200 rounded ${shimmer}`} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-default-50 rounded-lg"
                >
                  <div
                    className={`h-8 w-16 bg-default-200 rounded mx-auto ${shimmer}`}
                  />
                  <div
                    className={`h-3 w-full bg-default-100 rounded mt-2 ${shimmer}`}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Table Skeleton */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-6 h-6 bg-default-200 rounded ${shimmer}`} />
              <div className={`h-6 w-32 bg-default-200 rounded ${shimmer}`} />
            </div>
            <div className="space-y-3">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-2 pb-3 border-b">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 bg-default-200 rounded ${shimmer}`}
                  />
                ))}
              </div>
              {/* Table Rows */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-6 gap-2">
                  {[...Array(6)].map((_, j) => (
                    <div
                      key={j}
                      className={`h-4 bg-default-100 rounded ${shimmer}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Notifications Skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 bg-default-200 rounded ${shimmer}`} />
                <div className={`h-6 w-24 bg-default-200 rounded ${shimmer}`} />
              </div>
              <div
                className={`w-6 h-6 bg-default-200 rounded-full ${shimmer}`}
              />
            </div>

            {/* Notification Items Skeleton */}
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-default-50 border border-default-200"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className={`w-5 h-5 bg-default-200 rounded-full ${shimmer}`}
                    />
                    <div className="flex-1">
                      <div
                        className={`h-4 w-3/4 bg-default-200 rounded ${shimmer}`}
                      />
                    </div>
                  </div>
                  <div
                    className={`h-3 w-full bg-default-100 rounded mb-1 ${shimmer}`}
                  />
                  <div
                    className={`h-3 w-2/3 bg-default-100 rounded mb-2 ${shimmer}`}
                  />
                  <div className="flex gap-1">
                    <div
                      className={`h-6 w-20 bg-default-200 rounded ${shimmer}`}
                    />
                    <div
                      className={`h-6 w-16 bg-default-200 rounded ${shimmer}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
