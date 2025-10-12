/**
 * Pre-built action buttons for ListGrid
 * Makes it easy to create common CRUD actions
 */

import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { ReactNode } from "react";

import { LinkButton } from "../Button";

export interface ActionButtonConfig {
  show?: {
    href: (id: string) => string;
    label?: string;
    icon?: ReactNode;
  };
  edit?: {
    href: (id: string) => string;
    label?: string;
    icon?: ReactNode;
  };
  delete?: {
    onDelete: (id: string, item?: any) => void;
    label?: string;
    icon?: ReactNode;
    confirmMessage?: (item: any) => string;
  };
  custom?: Array<{
    key: string;
    label: string;
    icon?: ReactNode;
    color?:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
    onClick?: (id: string, item?: any) => void;
    href?: (id: string) => string;
  }>;
}

export interface AddButtonConfig {
  href: string;
  label?: string;
  icon?: ReactNode;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
}

/**
 * Create action buttons for table rows
 */
export const createActionButtons = (
  config: ActionButtonConfig,
  openDeleteDialog: (id: string, item: any) => void
) => {
  return (item: any) => {
    const buttons: ReactNode[] = [];

    // Show/View button
    if (config.show) {
      buttons.push(
        <LinkButton
          key="show"
          color="primary"
          href={config.show.href(item.id)}
          size="sm"
          startContent={
            config.show.icon || <Eye className="w-4 h-4" />
          }
          variant="light"
        >
          {config.show.label || "Detail"}
        </LinkButton>
      );
    }

    // Edit button
    if (config.edit) {
      buttons.push(
        <LinkButton
          key="edit"
          color="warning"
          href={config.edit.href(item.id)}
          size="sm"
          startContent={
            config.edit.icon || <Pencil className="w-4 h-4" />
          }
          variant="light"
        >
          {config.edit.label || "Edit"}
        </LinkButton>
      );
    }

    // Custom buttons
    if (config.custom) {
      config.custom.forEach((customBtn) => {
        if (customBtn.href) {
          buttons.push(
            <LinkButton
              key={customBtn.key}
              color={customBtn.color || "default"}
              href={customBtn.href(item.id)}
              size="sm"
              startContent={customBtn.icon}
              variant={customBtn.variant || "light"}
            >
              {customBtn.label}
            </LinkButton>
          );
        } else if (customBtn.onClick) {
          buttons.push(
            <button
              key={customBtn.key}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                customBtn.color === "danger"
                  ? "text-danger hover:bg-danger-50"
                  : customBtn.color === "warning"
                    ? "text-warning hover:bg-warning-50"
                    : customBtn.color === "success"
                      ? "text-success hover:bg-success-50"
                      : "text-default-600 hover:bg-default-100"
              }`}
              onClick={() => customBtn.onClick?.(item.id, item)}
            >
              {customBtn.icon && (
                <span className="inline-block mr-1">{customBtn.icon}</span>
              )}
              {customBtn.label}
            </button>
          );
        }
      });
    }

    // Delete button
    if (config.delete) {
      buttons.push(
        <button
          key="delete"
          className="text-danger hover:text-danger-600 transition-colors p-1.5 rounded-md hover:bg-danger-50"
          title={config.delete.label || "Hapus"}
          onClick={() => openDeleteDialog(item.id, item)}
        >
          {config.delete.icon || <Trash2 className="w-4 h-4" />}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2">{buttons}</div>
    );
  };
};

/**
 * Create add/create button for header actions
 */
export const createAddButton = (config: AddButtonConfig) => {
  return (
    <LinkButton
      color={config.color || "primary"}
      href={config.href}
      size="md"
      startContent={config.icon || <Plus className="w-4 h-4" />}
      variant={config.variant || "solid"}
    >
      {config.label || "Tambah"}
    </LinkButton>
  );
};
