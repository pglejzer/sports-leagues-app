import { Filter } from "lucide-react";

interface SportFilterProps {
  sports: string[];
  selectedSport: string;
  onChange: (sport: string) => void;
}

export const SportFilter = ({
  sports,
  selectedSport,
  onChange,
}: SportFilterProps) => {
  return (
    <div className="relative w-full">
      <div className="icon-container icon-left">
        <Filter className="h-5 w-5 icon-muted" />
      </div>
      <select
        value={selectedSport}
        onChange={(e) => onChange(e.target.value)}
        className="input-base input-focus input-with-icon input-with-chevron select-base"
      >
        <option value="">All Sports</option>
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <div className="icon-container icon-right">
        <svg
          className="h-4 w-4 icon-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

