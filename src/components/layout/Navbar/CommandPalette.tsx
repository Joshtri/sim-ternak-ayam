import { useMemo, useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  Kbd,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@heroui/react";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { getNavigationByRole } from "@/config/navigation";
import { UserRole, NavigationItem } from "@/types/navigation";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  userRole,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Reset query when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const castedRole = (userRole?.toLowerCase() as UserRole) || "operator";

  const sections = useMemo(() => {
    return getNavigationByRole(castedRole);
  }, [castedRole]);

  // Flattened and Filtered list for the Command Layout
  const flatItems = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    const result: { section: string; items: NavigationItem[] }[] = [];

    sections.forEach(section => {
      const matchingItems: NavigationItem[] = [];

      section.items.forEach(item => {
        // Check item itself
        const itemMatches = item.label.toLowerCase().includes(lowerQuery);

        // Check children
        const matchingChildren =
          item.children?.filter(child => {
            const hasAccess =
              !child.allowedRoles || child.allowedRoles.includes(castedRole);

            return hasAccess && child.label.toLowerCase().includes(lowerQuery);
          }) || [];

        if (itemMatches) {
          // Include item. If it has matching children, good. If not, just item.
          // But we want to flatten.
          matchingItems.push(item);

          // Should we add children too?
          // If item matches, user might want to go to item href.
          // If item has children, usually item href redirects or is a list.
          // Let's add matching children as separate entries even if parent matched?
          // Yes, to be safe.
        }

        // Add matching children (avoid duplicates if we decide to handle that, but simplistic approach is fine)
        if (matchingChildren.length > 0) {
          matchingChildren.forEach(child => {
            // Clone to add context to label if needed, or just push
            // Add "Parent > Child" label
            matchingItems.push({
              ...child,
              label: `${item.label} > ${child.label}`,
              id: `${child.id}_flattened`,
            });
          });
        } else if (!itemMatches && item.children) {
          // Parent didn't match, children didn't match (already handled by matchingChildren check above).
          // But if parent didn't match, we might have skipped it.
          // We also want to check if children match even if parent didn't.
          // Above logic: matchingChildren computed regardless of parent match.
        }
      });

      if (matchingItems.length > 0) {
        result.push({
          section: section.title || "Menu",
          items: matchingItems,
        });
      }
    });

    return result;
  }, [query, sections, castedRole]);

  const handleAction = (key: React.Key) => {
    const href = key as string;

    // Special handling if href is empty or special?
    if (href) {
      navigate({ to: href });
      onClose();
    }
  };

  return (
    <Modal
      hideCloseButton
      backdrop="opaque"
      classNames={{
        base: "w-[calc(100%-1.5rem)] max-w-xl mt-8 md:mt-24 bg-background/80 backdrop-blur-md border border-default-200 shadow-2xl max-h-[85vh]",
        body: "p-0 min-h-[300px] max-h-[75vh] overflow-hidden",
      }}
      isOpen={isOpen}
      placement="top-center"
      scrollBehavior="inside"
      onOpenChange={open => !open && onClose()}
    >
      <ModalContent>
        <div className="flex flex-col w-full h-full max-h-[75vh] min-h-0">
          <div className="flex items-center px-4 py-3 border-b border-default-200">
            <Search className="text-default-400 mr-2" size={20} />
            <input
              autoFocus
              className="flex-1 bg-transparent outline-none text-base placeholder:text-default-400"
              placeholder="Type to command or search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Kbd keys={["command"]}>K</Kbd>
          </div>

          <div className="p-2 flex-1 overflow-y-auto min-h-0">
            {flatItems.length === 0 ? (
              <div className="py-8 text-center text-default-400 text-sm">
                No matching results found.
              </div>
            ) : (
              <Listbox
                aria-label="Navigation"
                className="p-0 gap-0 bg-transparent"
                classNames={{
                  list: "gap-1",
                }}
                variant="flat"
                onAction={handleAction}
              >
                {flatItems.map((group, idx) => (
                  <ListboxSection
                    key={group.section + idx}
                    showDivider={idx < flatItems.length - 1}
                    title={group.section}
                  >
                    {group.items.map(item => (
                      <ListboxItem
                        key={item.href}
                        className="py-2.5 px-2 rounded-lg data-[hover=true]:bg-primary/10 data-[hover=true]:text-primary"
                        description={item.href}
                        startContent={
                          <span className="text-default-500 bg-default-100 p-1 rounded-md">
                            {item.icon}
                          </span>
                        }
                        textValue={item.label}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>
                      </ListboxItem>
                    ))}
                  </ListboxSection>
                ))}
              </Listbox>
            )}
          </div>

          <div className="px-4 py-2 bg-default-50 border-t border-default-100 flex items-center justify-between text-xs text-default-400">
            <div className="flex gap-4">
              <span>Arguments</span>
              <span>Select</span>
            </div>
            <span>Sistem Manajemen Ternak Ayam</span>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
