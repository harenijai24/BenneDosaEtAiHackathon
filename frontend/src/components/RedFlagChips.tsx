import { formatRedFlag } from '../api/mockApi';

interface RedFlagChipsProps {
  flags: string[];
}

export default function RedFlagChips({ flags }: RedFlagChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {flags.map((flag) => (
        <span
          key={flag}
          className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200"
        >
          {formatRedFlag(flag)}
        </span>
      ))}
    </div>
  );
}
