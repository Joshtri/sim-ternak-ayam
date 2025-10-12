import { ReactNode } from "react";

import {
  BreadcrumbsNav,
  BreadcrumbItemType,
} from "@/components/ui/Breadcrumbs";

interface Breadcrumb {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  onOptionsClick?: () => void | ReactNode;
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) => {
  return (
    <div className="space-y-3">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbsNav
          items={breadcrumbs as BreadcrumbItemType[]}
          radius="md"
          showHomeIcon={true}
          size="md"
          underline="hover"
          variant="solid"
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};
