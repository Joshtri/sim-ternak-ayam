import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
  debounceMs?: number;
}

const SearchBar = ({
  placeholder = "Cari...",
  onSearch,
  defaultValue = "",
  debounceMs = 300,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout for debounced search
    const newTimeoutId = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    setTimeoutId(newTimeoutId);
  };

  return (
    <Input
      isClearable
      classNames={{
        input: "text-sm",
        inputWrapper: "h-10",
      }}
      placeholder={placeholder}
      startContent={<Search className="w-4 h-4 text-gray-400" />}
      type="search"
      value={searchValue}
      onValueChange={handleSearchChange}
    />
  );
};

export default SearchBar;
