import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search leagues...",
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <div className="icon-container icon-left">
        <Search className="h-5 w-5 icon-muted" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base input-focus input-with-icon"
      />
    </div>
  );
};

