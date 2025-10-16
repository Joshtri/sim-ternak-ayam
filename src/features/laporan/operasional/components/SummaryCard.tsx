"use client";

import { Card, CardBody } from "@heroui/react";

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: "primary" | "success" | "warning" | "danger";
}

export default function SummaryCard({
  icon,
  label,
  value,
  color = "primary",
}: SummaryCardProps) {
  return (
    <Card>
      <CardBody className="flex flex-row items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <div className={`text-${color}`}>{icon}</div>
        </div>
        <div>
          <p className="text-sm text-default-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardBody>
    </Card>
  );
}
