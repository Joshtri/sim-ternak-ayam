/**
 * DetailCard Component
 * Reusable component for displaying detail information in a card format
 */

import { Card as HeroCard, CardBody, CardHeader } from "@heroui/react";
import { ReactNode } from "react";

export interface DetailItem {
  key: string;
  label: string;
  value: ReactNode;
  fullWidth?: boolean; // Make this item span full width
  hidden?: boolean; // Hide this item conditionally
}

export interface DetailSection {
  title?: string;
  description?: string;
  icon?: ReactNode;
  items: DetailItem[];
  columns?: 1 | 2 | 3; // Number of columns (default: 2)
}

interface DetailCardProps {
  sections: DetailSection[];
  header?: ReactNode;
  footer?: ReactNode;
  shadow?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export function DetailCard({
  sections,
  header,
  footer,
  shadow = "sm",
  className,
}: DetailCardProps) {
  return (
    <div className={`space-y-6 ${className || ""}`}>
      {sections.map((section, sectionIndex) => (
        <HeroCard key={sectionIndex} shadow={shadow}>
          {sectionIndex === 0 && header && (
            <CardHeader className="flex flex-col gap-2">{header}</CardHeader>
          )}

          <CardBody className="gap-6">
            {/* Section Header */}
            {section.title && (
              <div className="flex items-center gap-3 pb-2 border-b border-default-200">
                {section.icon && (
                  <div className="text-primary">{section.icon}</div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-default-900">
                    {section.title}
                  </h3>
                  {section.description && (
                    <p className="text-sm text-default-500">
                      {section.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Detail Items Grid */}
            <div
              className={`grid gap-4 ${
                section.columns === 1
                  ? "grid-cols-1"
                  : section.columns === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {section.items
                .filter(item => !item.hidden)
                .map(item => (
                  <div
                    key={item.key}
                    className={`flex flex-col gap-1 ${
                      item.fullWidth
                        ? section.columns === 1
                          ? "col-span-1"
                          : section.columns === 3
                            ? "md:col-span-3"
                            : "md:col-span-2"
                        : ""
                    }`}
                  >
                    <dt className="text-xs font-semibold text-default-500 uppercase tracking-wide">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-default-900 font-medium">
                      {item.value || (
                        <span className="text-default-400">-</span>
                      )}
                    </dd>
                  </div>
                ))}
            </div>
          </CardBody>

          {sectionIndex === sections.length - 1 && footer && (
            <div className="px-6 py-4 border-t border-default-200">
              {footer}
            </div>
          )}
        </HeroCard>
      ))}
    </div>
  );
}
