"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  SelectSection,
} from "@heroui/react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { EllipsisIcon, FilterIcon } from "lucide-react";

import { SkeletonTable } from "../Skeletons";

import {
  ActionButtonConfig,
  AddButtonConfig,
  createActionButtons,
  createAddButton,
} from "./actionButtons";
import { ConfirmDialog } from "./ConfirmDialog";

import { PageHeader } from "@/components/common/PageHeader";
import SearchBar from "@/components/ui/SearchBar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label?: string;
  type: "select" | "text" | "date" | "month";
  placeholder?: string;
  options?: FilterOption[];
  className?: string;
}

interface Column {
  key: string;
  label: string;
  align?: "start" | "center" | "end";
  value?: (item: any) => ReactNode; // Optional value renderer
}

interface Row {
  key: string;
  [key: string]: any;
}

interface OptionsMenuItem {
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
  onPress?: () => void;
}

interface ListGridProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];

  // Simplified action buttons
  addButton?: AddButtonConfig;
  actionButtons?: ActionButtonConfig;

  // Or use custom actions (old way)
  actions?: ReactNode;

  searchPlaceholder?: string;
  onSearch?: (value: string) => void;

  // Filter Toolbar
  filters?: FilterConfig[];
  filterValues?: Record<string, any>;
  onFilterChange?: (values: Record<string, any>) => void;

  columns: Column[];

  // NEW! Auto-mapping: pass raw data array instead of manually mapping rows
  data?: any[];
  keyField?: string; // Field to use as React key (default: "id")
  idField?: string; // Field to use as id for actions (default: "id")
  nameField?: string; // Field to use in delete confirmation (default: "name")

  // Or manually provide rows (old way)
  rows?: Row[];

  loading?: boolean;
  empty?: ReactNode;
  onOptionsClick?: () => void | ReactNode;
  optionsMenu?: OptionsMenuItem[];
  pageSize?: number;
  showPagination?: boolean;
  isMobile?: boolean;

  // Delete confirmation
  deleteConfirmTitle?: string;
  deleteConfirmMessage?: (item: any) => string;
  layout?: "table" | "grid" | "auto";
}

export function ListGrid({
  title,
  description,
  breadcrumbs,
  addButton,
  actionButtons,
  actions: customActions,
  searchPlaceholder = "Cari...",
  onSearch,
  filters,
  filterValues = {},
  onFilterChange,
  columns,
  data,
  keyField = "id",
  idField = "id",
  nameField = "name",
  rows: manualRows,
  loading = false,
  empty,
  onOptionsClick,
  optionsMenu = [],
  pageSize = 10,
  showPagination = true,
  isMobile: isMobileProp,
  deleteConfirmTitle = "Konfirmasi Hapus",
  deleteConfirmMessage = item =>
    `Apakah Anda yakin ingin menghapus "${item.name || "item ini"}"?`,
  layout = "auto",
}: ListGridProps) {
  // Use 1024px to include tablets in "mobile" view by default
  const isMobileDevice = useMediaQuery("(max-width: 1024px)");

  // Determine actual layout mode
  const isGridView =
    layout === "grid" ||
    (layout === "auto" && (isMobileProp ?? isMobileDevice));

  // Auto-transform data to rows if data prop is provided
  const rows = useMemo(() => {
    if (data) {
      // Automatically map data array to rows
      return data.map(item => ({
        key: item[keyField],
        id: item[idField],
        name: item[nameField],
        ...item, // Spread all data for column value functions
      }));
    }

    // Use manually provided rows
    return manualRows ?? [];
  }, [data, manualRows, keyField, idField, nameField]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Internal state for filters if not fully controlled (though we prefer controlled via props for URL params)
  // If onFilterChange is used, we assume parent might manage state, but we can also trigger it directly.

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filterValues, [key]: value };

    // If empty string or "all", set to undefined to remove parameter.
    if (value === "" || value === null || value === undefined) {
      newFilters[key] = undefined;
    }

    onFilterChange?.(newFilters);
  };

  // Delete confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    item: any;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (id: string, item: any) => {
    setItemToDelete({ id, item });
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!itemToDelete || !actionButtons?.delete) return;

    setIsDeleting(true);

    try {
      await actionButtons.delete.onDelete(itemToDelete.id, itemToDelete.item);
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Create action buttons renderer
  const renderActions = useMemo(() => {
    if (actionButtons) {
      return createActionButtons(actionButtons, openDeleteDialog);
    }

    return null;
  }, [actionButtons]);

  // Create add button
  const renderAddButton = useMemo(() => {
    if (addButton) {
      return createAddButton(addButton);
    }

    return null;
  }, [addButton]);

  // Transform rows to include column values and actions
  const transformedRows = useMemo(() => {
    return rows.map(row => {
      const transformedRow: any = { ...row };

      // Apply column value functions if defined
      columns.forEach(column => {
        if (column.value && column.key !== "actions") {
          transformedRow[column.key] = column.value(row);
        }
      });

      // Add action buttons if configured
      if (renderActions) {
        transformedRow.actions = renderActions(row);
      }

      return transformedRow;
    });
  }, [rows, columns, renderActions]);

  const filteredRows = useMemo(() => {
    let filtered = [...transformedRows];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      filtered = filtered.filter(row =>
        Object.values(row).some(
          val => typeof val === "string" && val.toLowerCase().includes(q)
        )
      );
    }

    if (sortKey) {
      filtered.sort((a, b) => {
        const valA = a[sortKey]?.toString().toLowerCase() ?? "";
        const valB = b[sortKey]?.toString().toLowerCase() ?? "";

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;

        return 0;
      });
    }

    return filtered;
  }, [transformedRows, searchQuery, sortKey, sortDirection]);

  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, rows]);

  const renderMobileCard = (item: Row, _index: number) => {
    return (
      <div
        key={item.key}
        className="relative bg-white dark:bg-content1 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
      >
        {/* Blue top border */}
        <div className="h-1 bg-blue-500" />

        <div className="p-4 space-y-3">
          {columns
            .filter(col => col.key !== "actions")
            .map((column, columnIndex) => (
              <div
                key={`${item.key}-${column.key}`}
                className={`flex flex-col ${
                  columnIndex !== columns.length - 2
                    ? "pb-3 border-b border-gray-100 dark:border-gray-700"
                    : ""
                }`}
              >
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  {column.label}
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                  {typeof item[column.key] === "object" &&
                  item[column.key] !== null
                    ? item[column.key]
                    : getKeyValue(item, column.key) || "-"}
                </div>
              </div>
            ))}

          {item["actions"] && (
            <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-700">
              {item["actions"]}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMobileSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: pageSize }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-content1 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="h-1 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="p-4 space-y-3">
            {columns.map((_, columnIndex) => (
              <div
                key={columnIndex}
                className={`${
                  columnIndex !== columns.length - 1
                    ? "pb-3 border-b border-gray-100 dark:border-gray-700"
                    : ""
                }`}
              >
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderOptionsMenu = () => {
    if (optionsMenu.length === 0) return null;

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <EllipsisIcon className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Options menu"
          onAction={key => {
            const menuItem = optionsMenu.find(item => item.key === key);

            if (menuItem && menuItem.onPress) {
              menuItem.onPress();
            }
          }}
        >
          {optionsMenu.map(item => (
            <DropdownItem
              key={item.key}
              color={item.color}
              startContent={item.icon}
              variant={item.variant}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <PageHeader
          actions={
            <div className="flex items-center gap-2">
              {!isGridView && renderOptionsMenu()}
              {renderAddButton || customActions}
            </div>
          }
          breadcrumbs={breadcrumbs}
          description={description}
          title={title}
          onOptionsClick={onOptionsClick}
        />

        {/* Filters and Search Toolbar */}
        {/* Filters and Search Toolbar */}
        {(onSearch || filters) && (
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Search Bar */}
            {onSearch && (
              <div className="w-full md:flex-1">
                <SearchBar
                  placeholder={searchPlaceholder}
                  onSearch={val => {
                    setSearchQuery(val);
                    onSearch?.(val);
                  }}
                />
              </div>
            )}

            {/* Filter Button & Popover */}
            {filters && filters.length > 0 && (
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <Button
                    className="font-medium"
                    color="primary"
                    startContent={<FilterIcon className="w-4 h-4" />}
                    variant="flat"
                  >
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-4">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="text-small font-bold text-default-600">
                      Filter Data
                    </div>
                    {filters.map(filter => (
                      <div key={filter.key} className="w-full">
                        {filter.type === "select" ? (
                          <Select
                            label={filter.label}
                            labelPlacement="outside"
                            placeholder={filter.placeholder}
                            selectedKeys={
                              filterValues[filter.key]
                                ? [filterValues[filter.key]]
                                : []
                            }
                            size="sm"
                            onChange={e =>
                              handleFilterChange(filter.key, e.target.value)
                            }
                          >
                            {filter.options &&
                            filter.options.some(opt => opt.value === "all") ? (
                              <>
                                <SelectItem key="all">Semua</SelectItem>
                                <SelectSection showDivider title="Bulan">
                                  {filter.options
                                    .filter(opt => opt.value !== "all")
                                    .map(opt => (
                                      <SelectItem key={opt.value}>
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                </SelectSection>
                              </>
                            ) : (
                              (filter.options || []).map(opt => (
                                <SelectItem key={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))
                            )}
                          </Select>
                        ) : (
                          <Input
                            label={filter.label}
                            labelPlacement="outside"
                            placeholder={filter.placeholder}
                            size="sm"
                            type={filter.type}
                            value={filterValues[filter.key] || ""}
                            onValueChange={val =>
                              handleFilterChange(filter.key, val)
                            }
                          />
                        )}
                      </div>
                    ))}
                    {Object.keys(filterValues).length > 0 && (
                      <Button
                        className="self-end"
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => {
                          // Create an object with all filter keys set to undefined to clear them
                          const clearState = filters?.reduce(
                            (acc, filter) => {
                              acc[filter.key] = undefined;

                              return acc;
                            },
                            {} as Record<string, any>
                          );

                          onFilterChange?.(clearState || {});
                        }}
                      >
                        Clear Filter
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}

        {loading ? (
          isGridView ? (
            renderMobileSkeleton()
          ) : (
            <SkeletonTable columns={columns.length} rows={pageSize} />
          )
        ) : filteredRows.length === 0 ? (
          (empty ?? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-sm">Data kosong.</div>
            </div>
          ))
        ) : isGridView ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paginatedRows.map((item, index) =>
                renderMobileCard(item, index)
              )}
            </div>

            {showPagination && totalPages > 1 && (
              <div className="flex justify-center pt-4">
                <Pagination
                  showControls
                  showShadow
                  classNames={{
                    wrapper: "gap-1",
                    item: "w-8 h-8 text-small",
                    cursor: "font-bold",
                  }}
                  color="primary"
                  page={currentPage}
                  total={totalPages}
                  onChange={onPageChange}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Table aria-label="Tabel">
              <TableHeader columns={columns}>
                {column => (
                  <TableColumn
                    key={column.key}
                    align={column.align ?? "start"}
                    className="cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                    {sortKey === column.key &&
                      (sortDirection === "asc" ? " ▲" : " ▼")}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={paginatedRows}>
                {item => (
                  <TableRow
                    key={item.key}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {columnKey => (
                      <TableCell>
                        {typeof item[columnKey] === "object" &&
                        item[columnKey] !== null
                          ? item[columnKey]
                          : getKeyValue(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {showPagination && totalPages > 1 && (
              <div className="flex justify-center pt-4">
                <Pagination
                  showControls
                  showShadow
                  classNames={{
                    wrapper: "gap-2",
                    item: "w-8 h-8 text-small",
                    cursor: "font-bold",
                  }}
                  color="primary"
                  page={currentPage}
                  total={totalPages}
                  onChange={onPageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        backdrop="opaque"
        confirmLabel="Hapus"
        isLoading={isDeleting}
        isOpen={isDeleteDialogOpen}
        message={
          itemToDelete
            ? deleteConfirmMessage(itemToDelete.item)
            : "Apakah Anda yakin?"
        }
        title={deleteConfirmTitle}
        onClose={() => {
          if (!isDeleting) {
            setIsDeleteDialogOpen(false);
            setItemToDelete(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
